import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Flashcard from "@/components/Flashcard";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "./ui/card";
import { navigate } from "astro:transitions/client";


interface VocabWord {
  word: string;
  translation: string;
  example: string;
}

const vocabList: VocabWord[] = [
  {
    word: "Amistad",
    translation: "Friendship",
    example:
      "La amistad es uno de los tesoros más grandes que una persona puede tener, ya que los amigos están ahí en los momentos buenos y malos.",
  },
  {
    word: "Esfuerzo",
    translation: "Effort",
    example:
      "Con mucho esfuerzo y dedicación, Juan logró terminar su carrera universitaria en menos tiempo del esperado, demostrando gran perseverancia.",
  },
  {
    word: "Sabiduría",
    translation: "Wisdom",
    example:
      "La sabiduría no solo se adquiere con los años, sino también con las experiencias y los aprendizajes que recogemos a lo largo de la vida.",
  },
];

export default function CardSwipe() {
  const [cards, setCards] = useState(vocabList);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [failedCards, setFailedCards] = useState<VocabWord[]>([]);
  const [passedCards, setPassedCards] = useState<VocabWord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const controls = useAnimation();
  const { toast } = useToast();

  const currentWord = cards[currentIndex];
  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('http://3.147.36.237:3000/api/user/rcard', {
  //         method: 'GET',
  //       });

  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }

  //       const jsonData = await response.json();
  //       setData(jsonData);
  //       console.log('Fetched data:', jsonData);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []); // Empty dependency array ensures this runs only once when the component mounts


  // Flip the card
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // Handle card swipe (left = fail, right = pass)
  const handleSwipe = async (direction: "left" | "right") => {
    await controls.start({
      x: direction === "left" ? -300 : 300,
      opacity: 0,
      transition: { duration: 0.3 },
    });

    // Track pass or fail
    if (direction === "left") {
      setFailedCards((prev) => [...prev, currentWord]);
    } else {
      setPassedCards((prev) => [...prev, currentWord]);
    }

    if (currentIndex === cards.length - 1) {
      if (failedCards.length > 0) {
        // If we have failed cards, start again with the failed ones
        setCards([...failedCards, cards[currentIndex]]);
        console.log("Failed cards:", failedCards);
        setCurrentIndex(0);
        setFailedCards([]); // Reset failed cards array
        toast({
          title: "Starting again with failed cards!",
          description: "You'll retry the words you missed.",
          duration: 3000,
        });
      } else {
        // If no failed cards, we're done
        setCompleted(true);
        toast({
          title: "Congratulations!",
          description: "You have completed all the vocabulary cards for today!",
          duration: 3000,
        });
        // Log the results
        console.log("Passed cards:", passedCards);
        console.log("Failed cards:", failedCards);
        return;
      }
    } else {
      // Move to the next card
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }

    // Reset card flip state
    setIsFlipped(false);

    // Reset position for the new card and animate it in
    controls.set({ x: direction === "left" ? 300 : -300, opacity: 0 });
    await controls.start({
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    });

    toast({
      title: direction === "right" ? "Word Learned!" : "Word Failed",
      description:
        direction === "right"
          ? `Great job learning "${currentWord.word}"!`
          : `You can always come back to "${currentWord.word}" later.`,
      duration: 2000,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center p-5">
      {completed ? (
        <>
          <div className="p-5 text-bold">
            {currentIndex + 1} / {vocabList.length}
          </div>
          <Card className="w-full max-w-md h-64">
            <CardContent className="p-6 text-center">
              <h2 className="text-3xl font-bold text-orange-600">
                🎉 Congratulations! 🎉
              </h2>
              <p className="text-lg text-gray-700 mt-4">
                You've completed all the vocabulary cards for today. Time to go{" "}
                <i>practice</i> your words in <b>context</b>!
              </p>
            </CardContent>
          </Card>
          <div className="flex justify-center space-x-4 mt-6">
            <Button
              variant="outline"
              className="rounded bg-white hover:bg-blue-100 hover:text-blue-600"
              onClick={() => navigate("/stories")}
              aria-label="Practice your new words in story mode!"
            >
              Practice in Story Mode
            </Button>
            <Button
              variant="outline"
              className="rounded bg-white hover:bg-blue-100 hover:text-blue-600"
              onClick={() => navigate("/conversations")}
              aria-label="Practice your new words in conversation mode!"
            >
              Practice in Conversation Mode
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="p-5 text-bold">
            {currentIndex + 1} / {cards.length}
          </div>

          <motion.div animate={controls} className="w-full max-w-md">
            <Flashcard
              word={currentWord.word}
              example={currentWord.example}
              translation={currentWord.translation}
              isFlipped={isFlipped}
              onFlip={handleFlip}
            />
          </motion.div>

          <div className="flex justify-center space-x-4 mt-6">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white hover:bg-red-100 hover:text-red-600"
              onClick={() => handleSwipe("left")}
              aria-label="Skip word"
            >
              <X className="h-8 w-8 p-1" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white hover:bg-green-100 hover:text-green-600"
              onClick={() => handleSwipe("right")}
              aria-label="Learn word"
            >
              <Check className="h-6 w-6" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
