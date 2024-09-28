import { useState } from 'react';
import { SpeakerLoudIcon, } from '@radix-ui/react-icons';
import { Loader } from 'lucide-react';
import usePlayAudio from '@/hooks/usePlayAudio'; // Import the custom hook

interface PlayAudioButtonProps {
  text: string; // The text to convert to audio
}

const PlayAudioButton: React.FC<PlayAudioButtonProps> = ({ text }) => {
  const { playAudio, isLoading, isPlaying } = usePlayAudio(); // Use the custom hook

  const handlePlay = () => {
    if (!isLoading && !isPlaying) {
      playAudio(text);
    }
  };

  return (
    <button
      onClick={handlePlay}
      disabled={isLoading || isPlaying}
      className="flex items-center justify-center p-2 bg-blue-500 rounded-full text-white hover:bg-blue-700 transition-colors duration-200"
      aria-label="Play Audio"
    >
      {isLoading ? (
        <Loader className="w-6 h-6 animate-spin" /> // Show spinner during loading
      ) : (
        <SpeakerLoudIcon className="w-6 h-6" /> // Show speaker icon when ready
      )}
    </button>
  );
};

export default PlayAudioButton;
