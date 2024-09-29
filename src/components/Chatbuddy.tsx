import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";

export default function ChatRoom() {
  // State to handle the messages
  const [messages, setMessages] = useState([
    { id: 1, user: "John Doe", text: "Hey there! How's it going?", align: "left", color: "bg-gray-200" },
    { id: 2, user: "You", text: "I'm doing great, thanks for asking!", align: "right", color: "bg-blue-500 text-white" },
    { id: 3, user: "Sarah", text: "Awesome, I'm glad to hear that! Did you catch the game last night?", align: "left", color: "bg-gray-200" },
    { id: 4, user: "You", text: "No, I missed it. Was it a good game?", align: "right", color: "bg-blue-500 text-white" },
  ]);

  // Predefined answers (button options)
  const predefinedAnswers = [
    "Yes, it was fantastic!",
    "No, I didn't watch it.",
    "What game are you talking about?",
  ];

  // Handle sending a message based on predefined answers
  const sendPredefinedMessage = (text: string) => {
    setMessages([
      ...messages,
      { id: messages.length + 1, user: "You", text: text, align: "right", color: "bg-blue-500 text-white" },
    ]);
  };

  useEffect(() => {
    console.log("ChatRoom initialized.");
  }, []);

  return (
    <div className="flex flex-col h-screen bg-background p-4 items-center">
      {/* Main Chat Card */}
      <Card className="w-[600px] flex-1 overflow-auto mb-0">
        <CardHeader>
          <h2 className="text-2xl">Chatroom</h2>
        </CardHeader>
        <CardContent className="grid gap-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.align === "right" ? "justify-end" : "justify-start"}`}>
              <div className={`p-3 rounded-full max-w-[50%] ${message.color} break-words`}>
                <div className="font-medium">{message.user}</div>
                <div className="text-sm">{message.text}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Separate Card for Button Options */}
      <Card className="w-[600px] h-[100px] bg-card-foreground">
        <CardContent className="h-24 p-4 flex justify-center items-center gap-2">
          {predefinedAnswers.map((answer, index) => (
            <Button
              key={index}
              onClick={() => sendPredefinedMessage(answer)}
              className="rounded-full px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white w-auto "
            >
              {answer}
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
