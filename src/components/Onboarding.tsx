import React, { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from '@/components/ui/card';

function OnboardingProcess() {
  const [showSlider, setShowSlider] = useState(true); // Initially show the slider
  const [sliderValue, setSliderValue] = useState(5); // Start with a default slider value
  const [progressValue, setProgressValue] = useState(0); // Start at 0 progress
  const incrementAmount = 35; // Customize this value for progress bar
  const [cardContentIndex, setCardContentIndex] = useState(0); // Tracks current card content
  const [highlightedWords, setHighlightedWords] = useState<string[]>([]); // Track highlighted words for the current card
  const [allHighlightedWords, setAllHighlightedWords] = useState<string[]>([]); // Track all highlighted words across cards

  // List of card contents that change when the "Continue" button is pressed
  const cardContents = [
    "You're making great progress! Keep going to unlock more learning opportunities.",
    "You're already well on your way! Keep up the good work!",
    "You're progressing quickly! Keep pushing forward!",
    "Congratulations! You've completed this section!"
  ];

  // Handles the slider value change
  function handleSliderChange(value: number[]) {
    setSliderValue(value[0]);
  }

  // Function to return the appropriate image based on slider value (exact ranges specified)
  function getImageForSliderValue(value: number) {
    if (value >= 0 && value <= 24) return '/assets/seedling.png';        // Slider value from 0 to 24
    if (value >= 25 && value <= 49) return '/assets/sprout.png';         // Slider value from 25 to 49
    if (value >= 50 && value <= 74) return '/assets/youngTree.png';      // Slider value from 50 to 74
    if (value >= 75 && value <= 100) return '/assets/tree.png';          // Slider value from 75 to 100
  }

  // Function to return the appropriate text label based on slider value
  function getLabelForSliderValue(value: number) {
    if (value >= 0 && value <= 24) return 'Beginner';
    if (value >= 25 && value <= 49) return 'Novice';
    if (value >= 50 && value <= 74) return 'Intermediate';
    if (value >= 75 && value <= 100) return 'Advanced';
  }

  // Handles when the button under the slider is clicked
  function handleSliderButtonClick() {
    setShowSlider(false);
  }

  // Handles progress bar button clicks and changes card content
  function handleProgressButtonClick() {
    // Add current highlighted words to allHighlightedWords, avoiding duplicates
    setAllHighlightedWords((prev) => [
      ...new Set([...prev, ...highlightedWords]) // Ensure no duplicates are added
    ]);

    if (progressValue < 100) {
      setProgressValue((prevValue) => Math.min(prevValue + incrementAmount, 100));
      setCardContentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % cardContents.length;

        // Reset highlighted words for the next card
        setHighlightedWords([]);

        return nextIndex;
      });
    }
  }

  // Toggles highlight of clicked words
  function toggleHighlight(word: string) {
    // Regular expression to remove punctuation from the beginning and end of the word
    const cleanWord = word.replace(/^[^\w]+|[^\w]+$/g, "");

    // Only highlight the cleaned word
    if (cleanWord.length > 0) {
      setHighlightedWords((prev) =>
        prev.includes(cleanWord)
          ? prev.filter((w) => w !== cleanWord) // Remove highlight if already highlighted
          : [...prev, cleanWord] // Add highlight if not highlighted
      );
    }
  }

  // Render the card with clickable words for highlighting
  function renderCard(content: string) {
    const words = content.split(" ").map((word, i) => (
      <span
        key={i}
        onClick={() => toggleHighlight(word)}
        style={{
          cursor: "pointer",
          marginRight: "4px",
          backgroundColor: highlightedWords.includes(word.replace(/^[^\w]+|[^\w]+$/g, "")) ? "orange" : "transparent",
        }}
      >
        {word}
      </span>
    ));

    return (
      <Card className="w-[1000px] h-[600px] flex flex-col items-center justify-center p-4 mb-4">
        <CardContent className="text-center">
          {words}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {showSlider ? (
        <div className="text-center">
          <h2 className="mb-6 text-2xl">What is Your Current Level</h2>
          
          {/* Centered and Enlarged Image Above the Slider */}
          <div className="flex flex-col items-center mb-8 p-8">
            <img src={getImageForSliderValue(sliderValue)} alt="Slider Value" className="w-72 h-72 object-contain pb-4" />
            <p className="text-lg font-semibold mt-4">{getLabelForSliderValue(sliderValue)}</p> 
          </div>

          <div className="w-[600px] mx-auto"> 
            <Slider value={[sliderValue]} onValueChange={handleSliderChange} className="h-6" /> 
          </div>

          <Button onClick={handleSliderButtonClick} className="mt-8 mx-auto px-8 py-4 text-xl">
            Confirm Knowledge Level
          </Button>
        </div>
      ) : (
        <div className="text-center">
          <div className="w-64 mx-auto">
            <Progress value={progressValue} />
          </div>

          {/* Render the dynamic card content */}
          <div className="my-6">
            {renderCard(cardContents[cardContentIndex])}
          </div>

          {/* Conditionally render Continue or Complete button */}
          {progressValue < 100 ? (
            <Button onClick={handleProgressButtonClick} className="mt-6 mx-auto px-8 py-4 text-xl"> {/* Enlarged button */}
              Continue
            </Button>
          ) : (
            <Button className="mt-6 mx-auto bg-green-500 hover:bg-green-600 px-8 py-4 text-xl"> {/* Enlarged button */}
              Complete
            </Button>
          )}

          {/* Display the allHighlightedWords array */}
          <div className="mt-4">
            <h3 className="text-lg font-bold">Highlighted Words:</h3>
            <p>{allHighlightedWords.length > 0 ? allHighlightedWords.join(', ') : "No words highlighted yet"}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default OnboardingProcess;
