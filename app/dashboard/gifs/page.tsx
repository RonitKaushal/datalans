"use client";

import { mockPosts, mockUsers } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share2, Image as ImageIcon } from "lucide-react";
import { format } from "date-fns";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Masonry from "react-masonry-css";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function GifsPage() {
  const posts = mockPosts
    .filter((post) => post.type === "image")
    .map((post) => ({
      ...post,
      user: mockUsers.find((u) => u.id === post.userId)!,
    }))
    .sort((a, b) => b.likes - a.likes);

  const breakpointColumns = {
    default: 4,
    1100: 3,
    768: 2,
    500: 2,
  };

  const notifications = [
    {
      title:
        "Your posts featuring '#coding', '#art', and '#photography' gain the highest engagement, highlighting your audience's strong interest in these topics.",
      description: "1 hour ago",
    },
    {
      title:
        "Image posts generally perform better, with the highest impressions and engagement compared to other formats.",
      description: "1 hour ago",
    },
    {
      title:
        "Being a 23-year-old from Korea using a tablet makes you relatable to tech-savvy and creative Gen Z audiences.",
      description: "1 hour ago",
    },
    {
      title:
        "Your posts tend to get maximum engagement on days close to holidays or year-end, indicating audience activity spikes during festive periods.",
      description: "1 hour ago",
    },
    {
      title:
        "Frequent interactions from users like 'katiewaters' and 'jjones' suggest a core group of followers contributing to your engagement.",
      description: "2 hours ago",
    },
  ];

  return (
    <div className="sm:p-8 p-2 flex flex-col ">
      {/* ///////////////////// */}
      <h1 className="text-2xl font-bold mb-8 pl-[50px]">Posts Analytics</h1>

      <Masonry
        breakpointCols={breakpointColumns}
        className="flex justify-center items-start w-auto sm:gap-6 gap-2"
        columnClassName="bg-clip-padding"
      >
        {posts.map((post) => (
          // /////////////////////////

          <div className="w-full">
            <Sheet>
              <Card key={post.id} className="overflow-hidden mb-6 w-full">
                <SheetTrigger>
                  <div className="relative w-full h-[auto]">
                    <img
                      src={post.mediaUrl}
                      alt={post.caption}
                      className="relative inset-0 w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-4">
                    {/* <div className="flex items-center gap-3 mb-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={post.user.avatarUrl} alt={post.user.username} />
                  <AvatarFallback>{post.user.username[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{post.user.username}</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(post.createdAt), "MMM d, yyyy")}
                  </p>
                </div>
              </div> */}
                    <p className="text-sm mb-4">{post.caption}</p>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Heart className="w-4 h-4" />
                        <span>{post.likes.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.comments.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Share2 className="w-4 h-4" />
                        <span>{post.shares.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </SheetTrigger>
                <SheetContent className="w-[320px] sm:w-[540px] overflow-scroll">
                  <SheetHeader>
                    <SheetTitle>Post Analysis</SheetTitle>
                    <div className="relative w-full h-[300px] shadow-inner-2xl">
                      <img
                        src={post.mediaUrl}
                        alt={post.caption}
                        className="relative inset-0 w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <p className="relative text-base">{post.caption}</p>
                  </SheetHeader>
                  <div className="card-container relative w-[100%] h-[100%] flex justify-start items-start flex-col">
                    <Separator className="my-4" />

                    <h1 className="mt-3 text-2xl">Insights</h1>
                    <CardDescription>
                      You have 3 unread insights.
                    </CardDescription>

                    <div className="grid gap-4 justify-start items-start mt-5 w-full">
                      <div className="relative w-full">
                        {notifications.map((notification, index) => (
                          <div
                            key={index}
                            className="relative mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0 w-[100%]"
                          >
                            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                            <div className="space-y-1">
                              <p className="text-sm font-normal leading-1 w-full">
                                {notification.title}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {notification.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Card>
            </Sheet>
          </div>
        ))}
      </Masonry>
    </div>
  );
}
