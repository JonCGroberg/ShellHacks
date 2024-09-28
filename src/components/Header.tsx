import { Globe, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "../components/Link"
import React from "react"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { navigate } from "astro:transitions/client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


const Header = () => {
    return (
        <header className=" py-4">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 cursor-pointer" onClick={() => navigate('/')}>
                        <Globe className="h-8 w-8 text-orange-500" />
                        <span className="text-2xl font-bold text-orange-500">LinguaLeap</span>
                    </div>
                    <NavigationMenu className="hidden md:flex">
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Learning Modes</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                        <li className="row-span-3">
                                            <NavigationMenuLink asChild>
                                                <a
                                                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-orange-500 to-orange-600 p-6 no-underline outline-none focus:shadow-md"
                                                    href="/"
                                                >
                                                    <Globe className="h-6 w-6 text-white" />
                                                    <div className="mt-4 mb-2 text-lg font-medium text-white">Stats & Leaderboard</div>
                                                    <p className="text-sm leading-tight text-white/90">
                                                        See where you rank among other learners and earn prizes.
                                                    </p>
                                                </a>
                                            </NavigationMenuLink>
                                        </li>
                                        <li>
                                            <NavigationMenuLink asChild>
                                                <a
                                                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-orange-100 hover:text-orange-600 focus:bg-orange-100 focus:text-orange-600"
                                                    href="/cards"
                                                >
                                                    <div className="text-sm font-medium leading-none">Flashcard Swipes</div>
                                                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                                        Swipe through flashcards to learn new words and phrases in context.
                                                    </p>
                                                </a>
                                            </NavigationMenuLink>
                                        </li>
                                        <li>
                                            <NavigationMenuLink asChild>
                                                <a
                                                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-orange-100 hover:text-orange-600 focus:bg-orange-100 focus:text-orange-600"
                                                    href="/stories"
                                                >
                                                    <div className="text-sm font-medium leading-none">Story Scrolls</div>
                                                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                                        Scroll through a choose your own adventure story in context.
                                                    </p>
                                                </a>
                                            </NavigationMenuLink>
                                        </li>
                                        <li>
                                            <NavigationMenuLink asChild>
                                                <a
                                                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-orange-100 hover:text-orange-600 focus:bg-orange-100 focus:text-orange-600"
                                                    href="/conversations"
                                                >
                                                    <div className="text-sm font-medium leading-none">Personalized AI Friend</div>
                                                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                                        Practice your conversational skills with a personalized tutor.
                                                    </p>
                                                </a>
                                            </NavigationMenuLink>
                                        </li>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            {/* <NavigationMenuItem>
                <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {resources.map((resource) => (
                      <ListItem
                        key={resource.title}
                        title={resource.title}
                        href={resource.href}
                      >
                        {resource.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem> */}
                            {/* <NavigationMenuItem>
                <NavigationMenuLink className="font-medium" href="/community">
                  Community
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className="font-medium" href="/about">
                  About
                </NavigationMenuLink>
              </NavigationMenuItem> */}
                        </NavigationMenuList>
                    </NavigationMenu>


                    <div className="flex items-center space-x-4">
                        {/* <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="w-[70px]">
                                    EN
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-[70px]">
                                <DropdownMenuItem>ES</DropdownMenuItem>
                                <DropdownMenuItem>FR</DropdownMenuItem>
                                <DropdownMenuItem>DE</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu> */}
                        <Button onClick={()=> navigate("http://localhost:3000/login")} className="bg-orange-500 text-white hover:bg-orange-600">
                            Sign Up
                        </Button>
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button className="md:hidden" variant="ghost" size="icon">
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent>
                                <nav className="flex flex-col space-y-4">
                                    <Link href="/" className="text-lg font-medium hover:text-orange-500">
                                        Courses
                                    </Link>
                                    <Link href="/" className="text-lg font-medium hover:text-orange-500">
                                        Resources
                                    </Link>
                                    <Link href="/community" className="text-lg font-medium hover:text-orange-500">
                                        Community
                                    </Link>
                                    <Link href="/about" className="text-lg font-medium hover:text-orange-500">
                                        About
                                    </Link>
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-orange-100 hover:text-orange-600 focus:bg-orange-100 focus:text-orange-600 ${className}`}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"

const resources = [
    {
        title: "Blog",
        href: "/",
        description: "Read articles about language learning tips and cultural insights.",
    },
    {
        title: "Podcasts",
        href: "/",
        description: "Listen to our language learning podcasts for immersive practice.",
    },
    {
        title: "Videos",
        href: "/",
        description: "Watch video lessons and cultural content in your target language.",
    },
    {
        title: "Flashcards",
        href: "/",
        description: "Practice vocabulary with our interactive flashcard system.",
    },
]

export default Header