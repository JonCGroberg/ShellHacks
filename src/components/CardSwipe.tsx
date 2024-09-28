import { useState } from "react";
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

interface CardSwiperProps {
    cards: VocabWord[];
}

const vocabList: VocabWord[] = [
    {
        word: "Amistad",
        translation: "Friendship",
        example: "La amistad es uno de los tesoros más grandes que una persona puede tener, ya que los amigos están ahí en los momentos buenos y malos."
    },
    {
        word: "Esfuerzo",
        translation: "Effort",
        example: "Con mucho esfuerzo y dedicación, Juan logró terminar su carrera universitaria en menos tiempo del esperado, demostrando gran perseverancia."
    },
    {
        word: "Sabiduría",
        translation: "Wisdom",
        example: "La sabiduría no solo se adquiere con los años, sino también con las experiencias y los aprendizajes que recogemos a lo largo de la vida."
    },
];

export default function CardSwipe() {
    const [cards, setCards] = useState(vocabList);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const controls = useAnimation();
    const { toast } = useToast();

    const currentWord = cards[currentIndex];

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handlePlayAudio = async (example:string) => {
        setIsLoading(true);
        if (isLoading) {
            return;
        }
        try {
          const response = await fetch(
            `https://api.elevenlabs.io/v1/text-to-speech/yoZ06aMxZJJ28mfd3POQ`, // Voice ID for Antonio
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "xi-api-key": "sk_3fcd1e4536a22db19469b15f3e38556fe551f9bbef2d4f61", // Replace with your Eleven Labs API key
              },
              body: JSON.stringify({
                text: example,
                voice_settings: {
                  stability: 0.1,
                  similarity_boost: 0.3,
                  style: 0.2,
                },
              }),
            }
          );

          if (!response.ok) {
            throw new Error("Failed to fetch audio from Eleven Labs");
          }

          const blob = await response.blob();
          const audioUrl = URL.createObjectURL(blob);

          const audio = new Audio(audioUrl);
          audio.play();
        } catch (error) {
          console.error("Error playing audio:", error);
        } finally {
          setIsLoading(false);
        }
      };

    const handleSwipe = async (direction: "left" | "right") => {
        await controls.start({
            x: direction === "left" ? -300 : 300,
            opacity: 0,
            transition: { duration: 0.3 },
        });


        if (currentIndex === cards.length - 1) {
            setCompleted(true);
            toast({
                title: "Congratulations!",
                description:
                    "You have completed all the vocabulary cards for today!",
                duration: 3000,
            });
            return;
        }

        setCurrentIndex((prevIndex) => prevIndex + 1);
        setIsFlipped(false);
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

    return <div className="flex flex-col items-center justify-center p-5">
        {(completed ? <>
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
                    aria-label="Practice your new words in story mode!"
                >
                    Practice in Conversation Mode
                </Button>
            </div>
        </>
            : <>
                <div className="p-5 text-bold">
                    {currentIndex + 1} / {vocabList.length}
                </div>

                <motion.div animate={controls} className="w-full max-w-md">
                    <Flashcard
                        word={currentWord.word}
                        example={currentWord.example}
                        translation={currentWord.translation}
                        isFlipped={isFlipped}
                        onFlip={handleFlip}
                        onPlayAudio={() => handlePlayAudio(currentWord.example)}
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
            </>)}
    </div>
}