"use client"

import React, { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

// Define the message type for the conversation
interface Message {
  id: number
  text: string
  align: "left" | "right"
  color: string
}

export default function ChatRoom() {
  const [messages, setMessages] = useState<Message[]>([]) // Store chat messages
  const [allPredefinedAnswers, setAllPredefinedAnswers] = useState<string[]>([
    "Help me understand grammar",
    "Can you give me some new vocab?",
    "Let's review some words",
    "How do I use this in a sentence?",
    "Can you explain that again?",
    "Tell me more about tenses.",
    "What is the rule for adjectives?",
    "Can you give me an example?",
    "What are common mistakes with verbs?",
    "Can we talk about prepositions?",
    "What are common phrasal verbs?",
    "What are some tricky words to remember?",
  ]); // All predefined answers
  const [predefinedAnswers, setPredefinedAnswers] = useState<string[]>([]) // Store currently displayed answers
  const [selectedMessageIndex, setSelectedMessageIndex] = useState<number | null>(null) // Track selected message index
  const [currentAnswerIndex, setCurrentAnswerIndex] = useState(0); // Track the index for cycling

  // Ref for autoscrolling the chat
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Function to cycle through the predefined answers three at a time
  const cyclePredefinedAnswers = () => {
    const nextIndex = (currentAnswerIndex + 3) % allPredefinedAnswers.length;
    const nextSet = allPredefinedAnswers.slice(nextIndex, nextIndex + 3);

    // Update the predefined answers with the next set of 3
    setPredefinedAnswers(nextSet);
    setCurrentAnswerIndex(nextIndex);
  };

  // Function to send the selected predefined message to the backend
  async function fetchChatResponse(index: number) {
    try {
      const response = await fetch("http://localhost:3000/api/chat/chat-answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_response: predefinedAnswers[index], // Send the selected predefined answer
          current_story: messages.map((msg) => msg.text).join(" "), // Send the current chat history
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const newMessage = data.new_segment[0].Content.Parts || "Sorry, I didn't understand that."; // Adjust based on backend response structure

      // Update the messages with the new chat response from the backend
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: prevMessages.length + 1, text: newMessage, align: "left", color: "bg-gray-200" },
      ]);

    } catch (error) {
      console.error("Error fetching chat response:", error);
    }
  }

  // Handle sending a predefined message (user selection)
  const sendPredefinedMessage = (text: string, index: number) => {
    // Add the user's message to the conversation
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: prevMessages.length + 1, text: text, align: "right", color: "bg-blue-500 text-white" },
    ]);
    setSelectedMessageIndex(index);

    // Fetch the AI response based on the user's message
    fetchChatResponse(index);
  };

  // Scroll to the bottom of the chat container whenever messages are updated
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    // Initialize with the first 3 predefined answers
    setPredefinedAnswers(allPredefinedAnswers.slice(0, 3));

    // Optionally, you can add an initial message from the AI
    setMessages([
      {
        id: 1,
        text: "Welcome! How can I assist you today?",
        align: "left",
        color: "bg-gray-200",
      },
    ]);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-background p-4 items-center pb-0">
      {/* Main Chat Card */}
      <Card className="w-[600px] flex-1 overflow-auto mb-0 rounded-t-lg rounded-b-none" ref={chatContainerRef}>
        <CardHeader>
          <h2 className="text-2xl">Chatroom</h2>
        </CardHeader>
        <CardContent className="grid gap-4">
          {/* Display chat messages */}
          {messages.length > 0 ? (
            messages.map((message) => (
              <div key={message.id} className={`flex ${message.align === "right" ? "justify-end" : "justify-start"}`}>
                <div className={`p-3 rounded-full max-w-[70%] break-words ${message.color}`}>
                  <div className="text-sm">{message.text}</div>
                </div>
              </div>
            ))
          ) : (
            <p>No messages yet</p> // Fallback if no messages
          )}
        </CardContent>
      </Card>

      {/* Separate Card for Button Options */}
      <Card className="w-[600px] h-[100px] bg-card-foreground pb-8 rounded-b-lg rounded-t-none overflow-hidden">
        <CardContent className="h-24 p-4 flex justify-center items-center gap-2">
          {predefinedAnswers.length > 0 ? (
            predefinedAnswers.map((answer, index) => (
              <Button
                key={index}
                onClick={() => sendPredefinedMessage(answer, index)}
                className="rounded-full px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white w-auto max-w-[80%]"
              >
                {answer}
              </Button>
            ))
          ) : (
            <p>No predefined answers available</p> // Fallback message if no answers available
          )}
        </CardContent>
      </Card>

      {/* Cycle Button Below Second Card */}
      <div className="mt-6">
        <Button
          onClick={cyclePredefinedAnswers}
          className="rounded-full px-4 py-2 text-sm bg-orange-500 hover:bg-orange-600 text-white"
        >
          Next Questions
        </Button>
      </div>
    </div>
  );
}
