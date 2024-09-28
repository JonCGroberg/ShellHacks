'use client';

import { Globe, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
// import { UserDropdownMenu } from "./UserDropdownMenu";
import React from "react";
import { useSidebar } from "@/hooks/use-sidebar"; // Assuming you have a hook for sidebar state (minimized/expanded)
import Link from "../components/Link";
// import { DashboardNav } from "./DashboardNav"; // Your dynamic navigation component
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenuGroup, DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { navigate } from "astro:transitions/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Example navigation items (you can replace with your actual data)
const navItems: any = [
    { title: "Dashboard", href: "/", icon: "home" },
    { title: "Leaderboard", href: "/leaderboard", icon: "award" },
    { title: "Settings", href: "/settings", icon: "settings" },
    { title: "Profile", href: "/settings", icon: "settings" }
];

const Sidebar = ({ children }: any) => {
    const [minimized, setMinimized] = useState(false);
    const toggleSidebar = () => {
        setMinimized(!minimized);
    };

    return (
        <div className="flex min-h-screen h-full bg-gray-50">
            {/* Sidebar */}
            <aside
                className="w-64 bg-white border pt-5 ps-5 flex flex-col transition-transform duration-300 ease-in-out"
            >
                <div className="flex items-center space-x-4 cursor-pointer mb-8">
                    <Globe className="h-8 w-8 text-orange-500" />
                    {!minimized && (
                        <span className="text-2xl font-bold text-orange-500">LinguaLeap</span>
                    )}
                </div>
                <nav className="flex flex-col gap-4 text-black">
                    {navItems.map((item:any) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-4 py-2 px-3 rounded-lg hover:bg-gray-200 transition"
                        >
                            <item.icon className="h-5 w-5" />
                            {!minimized && <span className="text-sm font-medium">{item.title}</span>}
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="bg-white shadow-sm py-4">
                    <div className="container mx-auto px-4 flex items-center justify-between">
                        {/* User Dropdown in Header */}
                        <div className="flex items-center justify-center w-full space-x-4">

                        <Tabs defaultValue="dashboard" className="w-[400px]">
                                <TabsList>
                                    <TabsTrigger value="swipes" onClick={()=>navigate('/swipes')}>Card Swipes</TabsTrigger>
                                    <TabsTrigger value="scrolls">Story Scrolls</TabsTrigger>
                                    <TabsTrigger value="chat">Conversations</TabsTrigger>
                                </TabsList>
                            </Tabs>
                            {/* <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="rounded-full">
                                        <User className="h-6 w-6 text-gray-600 cursor-pointer" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem onClick={() => navigate("/profile")}>
                                            Profile
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => navigate("/settings")}>
                                            Settings
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => navigate("/login")}>
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu> */}
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 p-6 ">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Sidebar;
