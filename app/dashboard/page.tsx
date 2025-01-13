"use client";

import { TrendingUp, Users, Heart, Share2, MessageCircle, Clock, Hash } from "lucide-react";
import { mockImagePosts, mockUsers } from "@/lib/mock-data";
import { StatsCard } from "@/components/metrics/StatsCard";
import { EngagementChart } from "@/components/charts/EngagementChart";
import { TopCreatorsList } from "@/components/creators/TopCreatorsList";
import { HashtagsAnalysis } from "@/components/analytics/HashtagsAnalysis";
import { PostingTimeAnalysis } from "@/components/analytics/PostingTimeAnalysis";
import { analyzeHashtags } from "@/lib/analytics/hashtags";
import { analyzePostingPatterns } from "@/lib/analytics/posting-patterns";
import { format, parseISO } from "date-fns";
import EngagementBarChart from "@/components/charts/engagement-bar-chart"
import { Insights} from "@/components/insights/insights"
import {Device} from "@/components/charts/device"
import {Visitor} from "@/components/charts/visitor"
import { Likes } from "@/components/charts/likes";


export default function DashboardPage() {
  const totalEngagement = mockImagePosts.reduce((sum, post) => sum + post.likes + post.comments + post.shares, 0);
  const totalLikes = mockImagePosts.reduce((sum, post) => sum + post.likes, 0);
  const totalComments = mockImagePosts.reduce((sum, post) => sum + post.comments, 0);
  const totalShares = mockImagePosts.reduce((sum, post) => sum + post.shares, 0);

  const trendData = mockImagePosts.map(post => ({
    date: format(parseISO(post.createdAt), 'MMM d'),
    engagement: post.likes + post.comments + post.shares,
    type: post.type,
  }));

  const topCreators = mockUsers
    .map(user => {
      const posts = mockImagePosts.filter(p => p.userId === user.id);
      const engagement = posts.reduce((sum, post) => sum + post.likes + post.comments + post.shares, 0);
      return { ...user, engagement, postCount: posts.length };
    })
    .sort((a, b) => b.engagement - a.engagement)
    .slice(0, 5);

  const hashtagStats = analyzeHashtags(mockImagePosts);
  const postingPatterns = analyzePostingPatterns(mockImagePosts);

  return (
    <div className="p-8">
      <h1 className="text-2xl pl-[50px] font-bold mb-8">Analytics Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Posts"
          value={mockImagePosts.length}
          icon={Clock}
          gradient="from-[#017AFF] to-[#017AFF]"
          iconColor="text-[#fff]/30"
        />
        <StatsCard
          title="Total Likes"
          value={totalLikes}
          icon={Heart}
          gradient="from-[#F34971] to-[#F34971]"
          iconColor="text-[#fff]/30"
        />
        <StatsCard
          title="Total Comments"
          value={totalComments}
          icon={MessageCircle}
          gradient="from-[#00D37F] to-[#00D37F]"
          iconColor="text-[#fff]/30"
        />
        <StatsCard
          title="Total Shares"
          value={totalShares}
          icon={Share2}
          gradient="from-[#017AFF] to-[#017AFF]"
          iconColor="text-[#fff]/30"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <EngagementBarChart/>
        <Insights />
        <Device/>
        <Visitor/>
        <Likes/>
        {/* <TopCreatorsList creators={topCreators} /> */}
      </div>
    </div>
  );
}