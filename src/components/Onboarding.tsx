import React, { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from '@/components/ui/card';

function OnboardingProcess() {
  const [showSlider, setShowSlider] = useState(true); // Initially show the slider
  const [sliderValue, setSliderValue] = useState(5);
  const [progressValue, setProgressValue] = useState(0); // Start at 0 progress
  const incrementAmount = 35; // Customize this value for progress bar
  const [cardContentIndex, setCardContentIndex] = useState(0); // Tracks current card content

  // List of card contents that change when the "Continue" button is clicked
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

  // Handles when the button under the slider is clicked
  function handleSliderButtonClick() {
    setShowSlider(false);
  }

  // Handles progress bar button clicks and changes card content
  function handleProgressButtonClick() {
    setProgressValue((prevValue) => Math.min(prevValue + incrementAmount, 100));

    // Cycle through the card contents based on clicks
    setCardContentIndex((prevIndex) => (prevIndex + 1) % cardContents.length);
  }

  // Toggles highlight of clicked words
  function toggleHighlight(e: React.MouseEvent<HTMLSpanElement>) {
    const target = e.target as HTMLElement;
    if (target.style.backgroundColor === "orange") {
      target.style.backgroundColor = "";
    } else {
      target.style.backgroundColor = "orange";
    }
  }

  // Render the card with clickable words for highlighting
  function renderCard(content: string) {
    const words = content.split(" ").map((word, i) => (
      <span key={i} onClick={toggleHighlight} style={{ cursor: "pointer", marginRight: "4px" }}>
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
          <div className="w-64 mx-auto">
            <Slider value={[sliderValue]} onValueChange={handleSliderChange} />
          </div>
          <Button onClick={handleSliderButtonClick} className="mt-6 mx-auto">
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

          {/* Button to increase progress and change card content */}
          <Button onClick={handleProgressButtonClick} className="mt-6 mx-auto">
            Continue
          </Button>
        </div>
      )}
    </div>
  );
}

export default OnboardingProcess;
