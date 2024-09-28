import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Brain, Lightbulb, Rocket } from "lucide-react"
// import Image from "astro/components/Image.astro"



export default function LandingPage() {
  return (
    <main className="flex-grow">
      <section className="bg-gradient-to-b to-white from-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h1 className="text-4xl lg:text-6xl font-bold text-orange-600 mb-6">
                Learn Languages with AI-Powered Precision
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                LinguaLeap uses advanced AI to create a personalized learning experience.
                Learn in context, using words you already know, through AI-generated stories.
              </p>
              <Button 
                className="bg-blue-500 text-white hover:bg-blue-600 text-lg px-8 py-6" > 
                <a href="/Onboarding">Start Learning Now</a>     
              </Button>
            </div>
            <div className="lg:w-1/2">
              {/* <Image
                src="/placeholder.svg?height=400&width=600"
                alt="AI-powered language learning illustration"
                width={600}
                height={400}
                class="rounded-lg shadow-lg"
              /> */}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-12">
            Why Choose LinguaLeap?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Brain className="h-12 w-12 text-orange-500" />}
              title="AI-Powered Learning"
              description="Our advanced AI tailors the learning experience to your individual needs and progress."
            />
            <FeatureCard
              icon={<BookOpen className="h-12 w-12 text-orange-500" />}
              title="Learn in Context"
              description="Acquire new words and phrases naturally through context, using vocabulary you already know."
            />
            <FeatureCard
              icon={<Lightbulb className="h-12 w-12 text-orange-500" />}
              title="AI-Generated Stories"
              description="Engage with unique, AI-created stories that make learning both fun and effective."
            />
          </div>
        </div>
      </section>

      <section className="bg-orange-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-12">
            How LinguaLeap Works
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12">
            <Card className="w-full md:w-1/3">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-orange-600">1. Assess</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Take a quick assessment to determine your current language level and vocabulary knowledge.
                </p>
              </CardContent>
            </Card>
            <Card className="w-full md:w-1/3">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-orange-600">2. Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Engage with AI-generated stories and exercises tailored to your level and interests.
                </p>
              </CardContent>
            </Card>
            <Card className="w-full md:w-1/3">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-orange-600">3. Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Track your improvement and unlock new content as you advance in your language journey.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-8">
            Ready to Start Your Language Learning Journey?
          </h2>
          <p className="text-xl text-gray-700 mb-12">
            Join thousands of learners who have accelerated their language skills with LinguaLeap.
          </p>
          <Button className="bg-blue-500 text-white hover:bg-blue-600 text-lg px-8 py-6">
            Get Started for Free
          </Button>
        </div>
      </section>
    </main>
  )
}

function FeatureCard({ icon, title, description }:{ icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="flex flex-col items-center text-center justify-center">
      <CardHeader className="">
        <span className="text-center mx-auto">{icon}</span>
        <CardTitle className="text-xl font-bold text-gray-800 mt-4">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-600">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}