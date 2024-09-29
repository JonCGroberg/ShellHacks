
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { BookOpenIcon, LanguagesIcon, PlusIcon, BookIcon, WebcamIcon } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <main className="flex-1 grid gap-4 p-4 md:gap-8 md:p-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <BookOpenIcon className="w-8 h-8" />
              <div className="grid gap-1">
                <CardTitle>Lessons</CardTitle>
                <CardDescription>Track your progress through interactive lessons.</CardDescription>
              </div>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <LanguagesIcon className="w-8 h-8" />
              <div className="grid gap-1">
                <CardTitle>Vocabulary</CardTitle>
                <CardDescription>Master new words and phrases with flashcards and quizzes.</CardDescription>
              </div>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <PlusIcon className="w-8 h-8" />
              <div className="grid gap-1">
                <CardTitle>Proficiency</CardTitle>
                <CardDescription>Monitor your language skills and track your progress.</CardDescription>
              </div>
            </CardHeader>
          </Card>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Vocabulary Mastered</CardTitle>
              <div className="bg-muted rounded-full flex items-center justify-center aspect-square w-10 md:w-12">
                <LanguagesIcon className="w-5 h-5" />
              </div>
            </CardHeader>
            <CardContent>
              {/* <BarChart className="w-full aspect-[4/3]" /> */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Lessons Completed</CardTitle>
              <div className="bg-muted rounded-full flex items-center justify-center aspect-square w-10 md:w-12">
                <BookOpenIcon className="w-5 h-5" />
              </div>
            </CardHeader>
            <CardContent>
              {/* <LineChart className="w-full aspect-[4/3]" /> */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Proficiency Levels</CardTitle>
              <div className="bg-muted rounded-full flex items-center justify-center aspect-square w-10 md:w-12">
                <PlusIcon className="w-5 h-5" />
              </div>
            </CardHeader>
            <CardContent>
              {/* <LineChart className="w-full aspect-square" /> */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>AI Generated Stories</CardTitle>
              <div className="bg-muted rounded-full flex items-center justify-center aspect-square w-10 md:w-12">
                <BookIcon className="w-5 h-5" />
              </div>
            </CardHeader>
            <CardContent>
              {/* <LineChart className="w-full aspect-[4/3]" /> */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Vocabulary Generated in Context</CardTitle>
              <div className="bg-muted rounded-full flex items-center justify-center aspect-square w-10 md:w-12">
                <LanguagesIcon className="w-5 h-5" />
              </div>
            </CardHeader>
            <CardContent>
              {/* <LineChart className="w-full aspect-[4/3]" /> */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Conversation Practice</CardTitle>
              <div className="bg-muted rounded-full flex items-center justify-center aspect-square w-10 md:w-12">
                <WebcamIcon className="w-5 h-5" />
              </div>
            </CardHeader>
            <CardContent>
              {/* <LineChart className="w-full aspect-[4/3]" /> */}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}