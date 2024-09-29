import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

// Define the message type to structure messages properly
interface Message {
  id: number;
  text: string;
  align: "left" | "right";
  color: string;
}

export default function ChatRoom() {
  // State to handle the messages
  const [messages, setMessages] = useState<Message[]>([]); // Initial empty message state

  // State to handle card contents and predefined answers
  const [cardContents, setCardContents] = useState<string[]>([]); // Array of card contents
  const [predefinedAnswers, setPredefinedAnswers] = useState<string[]>([]); // Array of predefined answers

  // State to track the index of the selected predefined message
  const [selectedMessageIndex, setSelectedMessageIndex] = useState<number | null>(null); // Initially no message is selected

  // External function to update predefined answers (array of strings)
  function updatePredefinedAnswers(newAnswers: string[]) {
    setPredefinedAnswers(newAnswers);
  }

  // External function to update card contents (array of strings)
  function updateCardContents(newContents: string[]) {
    setCardContents(newContents);
  }

  // Handle sending a message based on predefined answers
  const sendPredefinedMessage = (text: string, index: number) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: prevMessages.length + 1, text: text, align: "right", color: "bg-blue-500 text-white" },
    ]);
    setSelectedMessageIndex(index); // Set the selected message index
  };

  useEffect(() => {
    console.log("ChatRoom initialized.");

    // Add example data for predefined answers and card contents
    updateCardContents([
      "Welcome to the chat!",
      "You are doing a great job!",
      "How can I assist you today?",
      "Feel free to ask any questions."
    ]);

    updatePredefinedAnswers([
      "Thank you!",
      "Can you explain more?",
      "I'm not sure about that.",
    ]);
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <div className="flex flex-col h-screen bg-background p-4 items-center pb-0">
      {/* Main Chat Card */}
      <Card className="w-[600px] flex-1 overflow-auto mb-0 rounded-t-lg rounded-b-none">
        <CardHeader>
          <h2 className="text-2xl">Chatroom</h2>
        </CardHeader>
        <CardContent className="grid gap-4">
          {/* Display cardContents */}
          {cardContents.length > 0 && (
            cardContents.map((content, index) => (
              <div key={index} className="p-3 bg-gray-200 rounded-full w-[50%]">
                <div className="text-sm">{content}</div>
              </div>
            ))
          )}

          {/* Display messages */}
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.align === "right" ? "justify-end" : "justify-start"}`}>
              {/* Shortened message bubble with max width 50% and text wrapping */}
              <div className={`p-3 rounded-full max-w-[50%] break-words ${message.color}`}>
                <div className="text-sm">{message.text}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Separate Card for Button Options */}
      <Card className="w-[600px] h-[100px] bg-card-foreground pb-8 rounded-b-lg rounded-t-none">
        <CardContent className="h-24 p-4 flex justify-center items-center gap-2">
          {predefinedAnswers.length > 0 ? (
            predefinedAnswers.map((answer, index) => (
              <Button
                key={index}
                onClick={() => sendPredefinedMessage(answer, index)}
                className="rounded-full px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white w-auto"
              >
                {answer}
              </Button>
            ))
          ) : (
            <p>No predefined answers available</p> // Fallback message if no answers available
          )}
        </CardContent>
      </Card>
    </div>
  );
}
