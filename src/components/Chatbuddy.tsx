import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function Chatconvo() {
  const [showButtons, setShowButtons] = useState(false);

  // Display the buttons after a 3-second delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButtons(true);
    }, 3000); // 3000ms = 3 seconds

    // Cleanup the timer when the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className="w-[600px] h-[700px] mx-auto my-10 p-8 shadow-lg flex">
      {/* Left Half with Buttons */}
      <div className="w-1/2 flex flex-col justify-end">
        {/* Conditionally render the buttons after the delay */}
        {showButtons && (
          <CardFooter className="flex flex-col items-start space-y-4">
            {/* Stack buttons vertically with hover effects */}
            <Button
              variant="outline"
              className="w-3/4 transform transition-transform duration-200 ease-out hover:scale-125 hover:bg-opacity-90 rounded-full border-2 border-gray-400"
            >
              Option 1
            </Button>
            <Button
              variant="outline"
              className="w-3/4 transform transition-transform duration-200 ease-out hover:scale-125 hover:bg-opacity-90 rounded-full border-2 border-gray-400"
            >
              Option 2
            </Button>
            <Button
              variant="outline"
              className="w-3/4 transform transition-transform duration-200 ease-out hover:scale-125 hover:bg-opacity-90 rounded-full border-2 border-gray-400"
            >
              Option 3
            </Button>
          </CardFooter>
        )}
      </div>

      {/* Right Half for Text */}
      <div className="w-1/2 text-right">
        <CardHeader>
          <CardTitle className="text-2xl">Important Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg animate-pop-up border-2 border-gray-400 p-2 rounded-[25px] inline-block">
            This is some important information that is displayed to the user. After reading this, more options will appear.
          </p>
        </CardContent>
      </div>
    </Card>
  );
}

export default Chatconvo;
