"use client"

import { useState } from "react"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import PlayAudioButton from "./PlayAudioButton"
import { navigate } from "astro:transitions/client"

export default function OnboardingProcess() {
  const [showSlider, setShowSlider] = useState(true)
  const [sliderValue, setSliderValue] = useState(5)
  const [progressValue, setProgressValue] = useState(0)
  const incrementAmount = 35
  const [cardContentIndex, setCardContentIndex] = useState(0)
  const [highlightedWords, setHighlightedWords] = useState<string[]>([])
  const [allHighlightedWords, setAllHighlightedWords] = useState<string[]>([])
  const [paragraphs, setParagraphs] = useState<string[]>([])

  async function fetchParagraphs() {
    try {
      const response = await fetch('http://3.147.36.237:3000/api/onboard-gen', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ number: sliderValue }),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      setParagraphs(data.paragraphs[0].Content.Parts)
    } catch (error) {
      console.error('Error fetching paragraphs:', error)
      setParagraphs(['An error occurred while fetching content. Please try again.'])
    }
  }

  function handleSliderChange(value: number[]) {
    setSliderValue(value[0])
  }

  function handleSliderButtonClick() {
    fetchParagraphs()
    setShowSlider(false)
  }

  async function handleProgressButtonClick() {``
    setAllHighlightedWords((prev) => [...new Set([...prev, ...highlightedWords])])
    try {
      const response = await fetch('http://3.147.36.237:3000/api/onboard-gen', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ number: sliderValue }),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      setParagraphs(data.paragraphs[0].Content.Parts)
    } catch (error) {
      console.error('Error fetching paragraphs:', error)
      setParagraphs(['An error occurred while fetching content. Please try again.'])
    }
    if (progressValue < 100) {
      setProgressValue((prevValue) => Math.min(prevValue + incrementAmount, 100))
      setCardContentIndex((prevIndex) => (prevIndex + 1) % paragraphs.length)
      setHighlightedWords([])
    }
  }

  function toggleHighlight(word: string) {
    const cleanWord = word.replace(/^[^\w]+|[^\w]+$/g, "");

    setHighlightedWords((prev) =>
      prev.includes(word) ? prev.filter((w) => w !== word) : [...prev, cleanWord]
    )
  }

  function renderCard(content: string) {
    const words = content.split(" ").map((word, i) => (
      <span
        key={i}
        onClick={() => toggleHighlight(word)}
        className={`cursor-pointer inline-block mr-1 mb-1 ${
          highlightedWords.includes(word) ? "bg-orange-300" : ""
        }`}
      >
        {word}
      </span>
    ))

    return (
      <Card className="w-full max-w-3xl h-[300px] shadow-md">
        <CardContent className="p-6 h-[]] overflow-y-auto">
          <div className="text-center leading-relaxed text-base whitespace-normal break-words">
            {words}
          </div>
          <PlayAudioButton text={words.map((word) => word.props.children).join(" ")} />        </CardContent>
      </Card>
    )
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4 space-y-6">
      {showSlider ? (
        <div className="text-center w-full max-w-md">
          <h2 className="mb-6 text-2xl">What is Your Current Level</h2>
          <Slider
            value={[sliderValue]}
            onValueChange={handleSliderChange}
            max={100}
            step={1}
          />
          <Button onClick={handleSliderButtonClick} className="mt-6">
            Confirm Knowledge Level
          </Button>
        </div>
      ) : (
        <div className="text-center w-full max-w-3xl space-y-6">
          <Progress value={progressValue} className="w-full" />

          {paragraphs.length > 0 ? renderCard(paragraphs[cardContentIndex]) : "Loading..."}

          {progressValue < 100 ? (
            <Button onClick={handleProgressButtonClick}>
              Continue
            </Button>
          ) : (
            <Button className="bg-green-500 hover:bg-green-600" onClick={()=>navigate("dashboard")}>
              Complete
            </Button>
          )}

          <div className="w-full max-w-3xl">
            <h3 className="text-lg font-bold">Highlighted Words:</h3>
            <p className="mt-2 break-words">
              {allHighlightedWords.length > 0
                ? allHighlightedWords.join(", ")
                : "No words highlighted yet"}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}