"use client";

import { Users, BarChart3, Video, Image, Layout, PanelRight, ImagePlay } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockUsers } from "@/lib/mock-data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Imagenext from 'next/image'
import logo from "@/public/images/datalens logo.png"
import {ModeToggle} from "@/components/mode-toggle"
import { useState } from "react";


const mainNav = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: BarChart3,
  },
  {
    title: "Reels/Short Videos",
    href: "/dashboard/reels",
    icon: Video,
  },
  {
    title: "Static Image",
    href: "/dashboard/posts",
    icon: Image,
  },
  {
    title: "Polls",
    href: "/dashboard/polls",
    icon: Layout,
  },
  {
    title: "GIFs",
    href: "/dashboard/gifs",
    icon: ImagePlay,
  },

];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
    <div className={`flex flex-col h-screen border-r bg-background overflow-hidden ${
          isOpen ? "w-[330px] lg:w-[auto]" : "w-[0px]"
        }`}>
      <div className="p-6">
<h1 className="fat-albert text-5xl pr-2 m-[-10px]">DataLans</h1>
      </div>
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-4">
          <div className="py-2">
            <h3 className="mb-2 px-4 text-sm font-semibold">Analytics</h3>
            <nav className="space-y-1">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    pathname === item.href ? "bg-accent" : "transparent"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
          {/* <div className="py-2">
            <h3 className="mb-2 px-4 text-sm font-semibold">Creators</h3>
            <nav className="space-y-1">
              {mockUsers.map((user) => (
                <Link
                  key={user.id}
                  href={`/dashboard/creator/${user.id}`}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    pathname === `/dashboard/creator/${user.id}` ? "bg-accent" : "transparent"
                  )}
                >
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={user.avatarUrl} alt={user.username} />
                    <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                  {user.username}
                </Link>
              ))}
            </nav>
          </div> */}
        </div>
        <div className="absolute bottom-[70px] left-[0px] w-[100%] dark-mode-container flex justify-center items-center">
        <Link
      
                  href={`/dashboard/creator/1`}
                  className={cn(
                    "flex items-center gap-3 rounded-lg w-[88%] px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    pathname === `/dashboard/creator/1` ? "bg-accent" : "transparent"
                  )}
                >
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/images/user/sara.jpeg" alt="Sara" />
                    <AvatarFallback>{"Sara".toUpperCase()}</AvatarFallback>
                  </Avatar>
                  Sara Smith
                </Link>
      </div>

        <div className="absolute bottom-[0px] left-[0px] w-[100%] dark-mode-container flex justify-center items-center">
        <ModeToggle />
      </div>
      </ScrollArea>
    </div>
    <div className={`toggle-sidebar z-50 absolute sm:top-[27px] ${
          isOpen ? "sm:right-[-20px] right-[-20px] top-[25px]" : "sm:right-[-70px] right-[-60px] top-[30px]"
        }`}>
      <Button variant="outline" className="bg-background text-foreground hover:bg-card text-[30px] p-0 w-[35px] h-[35px]" onClick={toggleSidebar}>
      <PanelRight />
      </Button>
    </div>
    </div>
  );
}