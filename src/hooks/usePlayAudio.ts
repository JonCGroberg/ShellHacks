import { useState } from 'react';

const ELEVEN_LABS_API_KEY = "sk_3fcd1e4536a22db19469b15f3e38556fe551f9bbef2d4f61"; // Replace with your actual API key
const ELEVEN_LABS_VOICE_ID = "yoZ06aMxZJJ28mfd3POQ"; // Voice ID for Antonio (Spanish Male Voice)
const usePlayAudio = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = async (text: string) => {
    if (isLoading || isPlaying) {
      return; // Prevent new requests while loading or playing
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${ELEVEN_LABS_VOICE_ID}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'xi-api-key': ELEVEN_LABS_API_KEY,
          },
          body: JSON.stringify({
            text,
            voice_settings: {
              stability: 0.1,
              similarity_boost: 0.3,
              style: 0.2,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch audio from Eleven Labs');
      }

      const blob = await response.blob();
      const audioUrl = URL.createObjectURL(blob);

      const audio = new Audio(audioUrl);
      setIsPlaying(true); // Audio is playing

      audio.play();

      audio.onended = () => {
        setIsPlaying(false); // Audio finished playing
      };
    } catch (error) {
      console.error('Error playing audio:', error);
    } finally {
      setIsLoading(false); // Reset loading state after the request
    }
  };

  return { playAudio, isLoading, isPlaying };
};

export default usePlayAudio;
