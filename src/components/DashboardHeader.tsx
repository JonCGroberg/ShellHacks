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
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
                    {/* Logo and Branding */}
                    <div className="flex items-center space-x-4 cursor-pointer" onClick={() => navigate('/')}>
                        <Globe className="h-8 w-8 text-orange-500" />
                        <span className="text-2xl font-bold text-orange-500">LinguaLeap</span>
                    </div>

                    {/* Tabs for Navigation */}
                    <Tabs defaultValue="cards" className="col-span-1 ">
                        <TabsList className="flex justify-center">
                            <TabsTrigger value="cards" onClick={() => navigate('/cards')}>Card Swipes</TabsTrigger>
                            <TabsTrigger value="stories" onClick={()=> navigate('/stories')} >Story Scrolls</TabsTrigger>
                            <TabsTrigger value="conversations" onClick={()=>navigate('/conversations')}>Conversations</TabsTrigger>
                        </TabsList>
                    </Tabs>
                    {/* Action Buttons */}
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
