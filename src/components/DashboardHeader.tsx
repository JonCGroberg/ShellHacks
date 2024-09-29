import { Globe, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect, forwardRef } from "react"
import type { ForwardedRef, ElementRef, ComponentPropsWithoutRef } from "react"
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
import { logout } from "@/lib/utils"
import { app } from "src/firebase/client"

const Header = () => {
    const [activeTab, setActiveTab] = useState('');
    useEffect(() => {
        const handlePageTransition = () => {
            console.log('Page transition event fired');
            const pathname = window.location.pathname;
            if (pathname.includes('/dashboard')) {
                setActiveTab('dashboard');
            }
            else if (pathname.includes('/cards')) {
                setActiveTab('cards');
            } else if (pathname.includes('/stories')) {
                setActiveTab('stories');
            } else if (pathname.includes('/conversations')) {
                setActiveTab('conversations');
            }
        };

        handlePageTransition(); // Initial run when the page loads

        // Astro's built-in lifecycle hook for page transitions
        document.addEventListener('astro:page-transition', handlePageTransition);

        return () => {
            document.removeEventListener('astro:page-transition', handlePageTransition);
        };
    }, []);

    return (
        <header className=" py-4">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-4">
                    {/* Logo and Branding */}
                    <div className="flex justify-around md:justify-start items-center space-x-4 cursor-pointer col-span-1" onClick={() => navigate('/')}>
                        <span className="flex gap-2">
                            <Globe className="h-8 w-8 text-orange-500" />
                            <span className="text-2xl font-bold text-orange-500">LinguaLeap</span>
                        </span>
                        <Button onClick={() => logout(app)} className="bg-orange-500 text-white hover:bg-orange-600  col-span-1 block md:hidden">
                            Logout
                        </Button>
                    </div>



                    {/* Tabs for Navigation */}
                    <Tabs value={activeTab} className="order-last lg:order-none flex justify-center lg:justify-center mt-4 lg:mt-0">
                        <TabsList className="flex justify-center">
                            <TabsTrigger
                                value="dashboard"
                                onClick={() => {
                                    setActiveTab('dashboard');
                                    navigate('/dashboard');
                                    document.title = 'Dashboard';
                                }}
                            >
                                Dashboard
                            </TabsTrigger>
                            <TabsTrigger
                                value="cards"
                                onClick={() => {
                                    setActiveTab('cards');
                                    navigate('/cards');
                                    document.title = 'Card Swipes';
                                }}
                            >
                                Card Swipes
                            </TabsTrigger>
                            <TabsTrigger
                                value="stories"
                                onClick={() => {
                                    setActiveTab('stories');
                                    navigate('/stories');
                                    document.title = 'Story Scrolls';
                                }}
                            >
                                Story Scrolls
                            </TabsTrigger>
                            <TabsTrigger
                                value="conversations"
                                onClick={() => {
                                    setActiveTab('conversations');
                                    navigate('/conversations');
                                    document.title = 'Conversations';
                                }}
                            >
                                Conversations
                            </TabsTrigger>

                        </TabsList>
                    </Tabs>
                    {/* Action Buttons */}
                    <div className="lg:flex w-full hidden order-0 col-span-1  justify-end">
                        <Button onClick={() => logout(app)} className="bg-orange-500 text-white hover:bg-orange-600  col-span-1">
                            Logout
                        </Button>
                    </div>
                </div>

            </div>
        </header>
    )
}

const ListItem = forwardRef<
    ElementRef<"a">,
    ComponentPropsWithoutRef<"a">
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
