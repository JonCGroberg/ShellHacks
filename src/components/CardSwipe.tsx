"use client"

import { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, SpeakerIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { navigate } from "astro:transitions/client";
import { SpeakerLoudIcon } from "@radix-ui/react-icons";

interface VocabWord {
    word: string;
    translation: string;
    example: string;
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

export default function VocabSwipeCard() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [completed, setCompleted] = useState(false);
    const controls = useAnimation();
    const { toast } = useToast();

    const currentWord = vocabList[currentIndex];

    // Function to handle the flipping logic
    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    // Handle the swipe left or right
    const handleSwipe = async (direction: "left" | "right") => {
        // Animate card out (swipe out)
        await controls.start({
            x: direction === "left" ? -300 : 300,
            opacity: 0,
            transition: { duration: 0.3 },
        });

        if (currentIndex === vocabList.length - 1) {
            // If the user has completed all words, show the completion card
            setCompleted(true);
            toast({
                title: "Congratulations!",
                description: "You have completed all the vocabulary cards for today!",
                duration: 3000,
            });
            return;
        }

        // Set the next word
        setCurrentIndex((prevIndex) => prevIndex + 1);
        setIsFlipped(false); // Ensure the new card starts unflipped

        // Reset the position for the new card and animate it in
        controls.set({ x: direction === "left" ? 300 : -300, opacity: 0 });
        await controls.start({
            x: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: "easeOut" },
        });

        // Show toast notification
        toast({
            title: direction === "right" ? "Word Learned!" : "Word Skipped",
            description: direction === "right"
                ? `Great job learning "${currentWord.word}"!`
                : `You can always come back to "${currentWord.word}" later.`,
            duration: 2000,
        });
    };

    // Function to play audio using the Web Speech API
    const handlePlayAudio = () => {
        const utterance = new SpeechSynthesisUtterance(currentWord.word);
        utterance.lang = "es-ES"; // Set language to Spanish
        speechSynthesis.speak(utterance);
    };

    return (
        <div className="flex flex-col items-center justify-center p-5">
            {completed ? (
                <>
                    <div className="p-5 text-bold">{currentIndex + 1} / {vocabList.length}</div>
                    <Card className="w-full max-w-md h-64">
                        <CardContent className="p-6 text-center">
                            <h2 className="text-3xl font-bold text-blue-600">🎉 Congratulations! 🎉</h2>
                            <p className="text-lg text-gray-700 mt-4">
                                You've completed all the vocabulary cards for today. Well done!
                            </p>
                        </CardContent>
                    </Card>
                    <div className="flex justify-center space-x-4 mt-6">
                        <Button
                            variant="outline"
                            className="rounded bg-white hover:bg-blue-100 hover:text-blue-600"
                            onClick={() => navigate("/")}
                            aria-label="Go Back to Dashboard"
                        >
                            Go Back to Dashboard
                        </Button>
                    </div>
                </>
            ) : (
                <>
                    <div className="p-5 text-bold">{currentIndex + 1} / {vocabList.length}</div>
                    <motion.div animate={controls} className="w-full max-w-md">
                        <div className="relative w-full" style={{ perspective: 1000 }}>
                            <motion.div
                                className="relative w-full h-64 cursor-pointer"
                                onClick={handleFlip}
                                animate={{ rotateY: isFlipped ? 180 : 0 }}
                                transition={{ duration: 0.6 }}
                                style={{ transformStyle: "preserve-3d" }}
                            >
                                {/* Front of the card */}
                                <motion.div
                                    className="absolute w-full h-full"
                                    style={{ backfaceVisibility: "hidden" }}
                                >
                                    <Card className="w-full h-full">
                                        <CardContent className="p-6 h-full">
                                            <div className="flex flex-col h-full gap-4">
                                                <div className="flex-grow text-center space-y-4">
                                                    <p className="text-xl text-gray-500 italic">
                                                        {highlightWordInSentence(currentWord.example, currentWord.word)}
                                                    </p>
                                                </div>
                                                <div className=" textsm mx-auto  bg-blue-500 p-2 rounded-full text-sm text-white hover:bg-blue-700 transition-colors duration-200 justify-center text-center flex gap-2" onClick={(e) => {
                                                    e.stopPropagation();
                                                    handlePlayAudio();
                                                }}>
                                                    <button

                                                        aria-label="Play Audio"
                                                        className=""
                                                    >
                                                        <SpeakerLoudIcon className="w-6 h-6" />
                                                    </button>
                                                </div>
                                                <div className= "mx-auto text-sm text-grey-500">Tap to flip</div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>

                                {/* Back of the card */}
                                <motion.div
                                    className="absolute w-full h-full bg-orange-100"
                                    style={{
                                        backfaceVisibility: "hidden",
                                        transform: "rotateY(180deg)",
                                    }}
                                >
                                    <Card className="w-full h-full">
                                        <CardContent className="p-6 h-full">
                                            <div className="flex flex-col h-full">
                                                <div className="flex-grow text-center space-y-4">
                                                    <h2 className="text-2xl font-bold text-orange-600">
                                                        {currentWord.translation}
                                                    </h2>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </motion.div>
                        </div>
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

// Helper function to highlight the word in the sentence
const highlightWordInSentence = (sentence: string, word: string) => {
    const parts = sentence.split(new RegExp(`(${word})`, "gi"));
    return (
        <>
            {parts.map((part, index) =>
                part.toLowerCase() === word.toLowerCase() ? (
                    <span key={index} className="font-bold text-orange-600">
                        {part}
                    </span>
                ) : (
                    part
                )
            )}
        </>
    );
};
