import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { SpeakerLoudIcon } from '@radix-ui/react-icons';
import usePlayAudio from '@/hooks/usePlayAudio'; // Import the custom hook
import { Loader } from 'lucide-react';
import PlayAudioButton from './PlayAudioButton';

interface CardComponentProps {
    word: string;
    example: string;
    translation: string;
    isFlipped: boolean;
    onFlip: () => void;
}

export default function Flashcard({
    word,
    example,
    translation,
    isFlipped,
    onFlip,
}: CardComponentProps) {
    const { playAudio, isLoading, isPlaying } = usePlayAudio(); // Use the custom hook

    return (
        <motion.div className="relative w-full" style={{ perspective: 1000 }}>
            <motion.div
                className="relative w-full min-h-72 cursor-pointer"
                onClick={onFlip}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Front of the card */}
                <motion.div
                    className="absolute w-full h-full"
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    <Card className="w-full h-full">
                        <CardContent className="p-6 h-full">
                            <div className="flex flex-col h-full gap-4">
                                <div className="flex-grow text-center space-y-4">
                                    <p className="text-xl text-gray-500 italic">
                                        {highlightWordInSentence(example, word)}
                                    </p>
                                </div>
                                <div
                                className='flex items-center justify-center'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    }}
                                >
                                    <div className="mx-auto">
                                        <PlayAudioButton text={example} />
                                    </div>
                                </div>
                                <div className="mx-auto text-sm text-grey-500 pb-4">Tap to flip</div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Back of the card */}
                <motion.div
                    className="absolute w-full h-full bg-orange-100"
                    style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                    }}
                >
                    <Card className="w-full h-full">
                        <CardContent className="p-6 h-full">
                            <div className="flex flex-col h-full">
                                <div className="flex-grow text-center space-y-4">
                                    <h2 className="text-2xl font-bold text-orange-600">{translation}</h2>
                                </div>
                                <div className="mx-auto text-sm text-grey-500 pb-4">Tap to flip</div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

// Helper function to highlight the word in the sentence
const highlightWordInSentence = (sentence: string, word: string) => {
    const parts = sentence.split(new RegExp(`(${word})`, 'gi'));
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
