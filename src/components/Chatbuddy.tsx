import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function Chatconvo() {
  const [showButtons, setShowButtons] = useState(false);
  const [selectedButton, setSelectedButton] = useState<number | null>(null); // Track the selected button

  // Display the buttons after a 3-second delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButtons(true);
    }, 3000); // 3000ms = 3 seconds

    // Cleanup the timer when the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  // Handle button click
  const handleButtonClick = (buttonNumber: number) => {
    setSelectedButton(buttonNumber); // Set the clicked button as the selected one
  };

  return (
    <Card className="w-[600px] h-[750px] mx-auto my-10 p-8 shadow-lg flex flex-col justify-between bg-white border border-gray-300">
      {/* Top Section for Text */}
      <div className="flex-grow">
        <CardHeader className="text-right">
          <CardTitle className="text-2xl">Important Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full flex justify-end">
            {/* Added custom hex color for the background */}
            <p className="text-lg text-left animate-pop-up border-2 border-gray-400 p-4 rounded-[30px] w-full max-w-[90%] bg-[#FCC47B]">
              This is some important information that is displayed to the user. After reading this, more options will appear.
            </p>
          </div>
        </CardContent>
      </div>

      {/* Bottom Section for Buttons */}
      <CardFooter className="flex flex-col items-start space-y-4">
        {showButtons && (
          <>
            {/* Button 1 with normal background and hover effect */}
            <Button
              onClick={() => handleButtonClick(1)} // Pass button number directly
              variant="outline"
              className={`w-3/4 transform transition-transform duration-500 ease-out bg-[#147efb] hover:bg-[#6F7BBE] rounded-full border-2 border-[#6F7BBE]
                ${selectedButton === 1 ? "translate-y-[-200px]" : selectedButton ? "opacity-0 transition-opacity duration-700" : ""}`}
            >
              Option 1
            </Button>

            {/* Button 2 with normal background and hover effect */}
            <Button
              onClick={() => handleButtonClick(2)} // Pass button number directly
              variant="outline"
              className={`w-3/4 transform transition-transform duration-500 ease-out bg-[#147efb] hover:bg-[#6F7BBE] rounded-full border-2 border-[#6F7BBE]
                ${selectedButton === 2 ? "translate-y-[-200px]" : selectedButton ? "opacity-0 transition-opacity duration-700" : ""}`}
            >
              Option 2
            </Button>

            {/* Button 3 with normal background and hover effect */}
            <Button
              onClick={() => handleButtonClick(3)} // Pass button number directly
              variant="outline"
              className={`w-3/4 transform transition-transform duration-500 ease-out bg-[#147efb] hover:bg-[#6F7BBE] rounded-full border-2 border-[#6F7BBE]
                ${selectedButton === 3 ? "translate-y-[-200px]" : selectedButton ? "opacity-0 transition-opacity duration-700" : ""}`}
            >
              Option 3
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}

export default Chatconvo;
