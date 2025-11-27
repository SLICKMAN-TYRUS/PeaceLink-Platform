import { Header, BottomNav } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, MessageCircle } from "lucide-react";
import { Link } from "wouter";
import { FORUM_TOPICS } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth-context";
import { RadioSection } from "@/components/media/radio-section";
import { NewsSection } from "@/components/media/news-section";

export function YouthDashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="PeaceLink" />
      
      <div className="p-4 space-y-6">
        {/* Welcome & Status */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent/90 to-accent/70 p-6 text-white shadow-lg">
          <div className="relative z-10">
            <h1 className="text-3xl font-heading font-bold mb-2">Hello, {user?.name?.split(' ')[0] || 'Friend'}!</h1>
            <p className="text-white/90 font-medium mb-6">Your voice matters. What change will you make today?</p>
            
            <div className="flex gap-3">
              <Link href="/report">
                <Button className="bg-white text-accent hover:bg-white/90 font-bold rounded-xl flex-1 h-12">
                  <MapPin className="mr-2 h-4 w-4" /> Report Issue
                </Button>
              </Link>
              <Link href="/forums">
                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold rounded-xl flex-1 h-12">
                  <MessageCircle className="mr-2 h-4 w-4" /> Join Talks
                </Button>
              </Link>
            </div>
          </div>
          {/* Decor */}
          <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-white/20 blur-3xl"></div>
        </div>

        {/* My Impact / Stats */}
        <div>
            <div className="flex items-center justify-between mb-3 px-1">
                <h3 className="text-lg font-bold text-foreground">Your Impact</h3>
                <Link href="/my-reports">
                   <span className="text-xs font-bold text-primary cursor-pointer">View Activity</span>
                </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
                <Card className="border-none shadow-sm bg-secondary/30">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                        <span className="text-3xl font-bold text-foreground">2</span>
                        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide mt-1">Reports Filed</span>
                    </CardContent>
                </Card>
                <Card className="border-none shadow-sm bg-secondary/30">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                        <span className="text-3xl font-bold text-accent">5</span>
                        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide mt-1">Discussions</span>
                    </CardContent>
                </Card>
            </div>
        </div>

        {/* Active Peace Talks */}
        <div>
           <div className="flex items-center justify-between mb-3 px-1">
                <h3 className="text-lg font-bold text-foreground">Active Peace Talks</h3>
                <Link href="/forums">
                  <span className="text-xs font-bold text-primary cursor-pointer">View All</span>
                </Link>
            </div>
            <div className="space-y-3">
                {FORUM_TOPICS.slice(0, 2).map(topic => (
                    <div key={topic.id} className="bg-card p-4 rounded-2xl border border-border shadow-sm flex flex-col gap-2 cursor-pointer hover:border-primary/50 transition-colors">
                        <div className="flex justify-between">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">{topic.category}</span>
                            <span className="text-xs text-muted-foreground">{topic.replies} replies</span>
                        </div>
                        <h4 className="font-bold text-foreground">{topic.title}</h4>
                         <div className="flex items-center gap-2 mt-1">
                            <div className="flex -space-x-2">
                                <div className="h-6 w-6 rounded-full border-2 border-background bg-gray-300"></div>
                                <div className="h-6 w-6 rounded-full border-2 border-background bg-gray-400"></div>
                                <div className="h-6 w-6 rounded-full border-2 border-background bg-gray-500 flex items-center justify-center text-[8px] text-white font-bold">+3</div>
                            </div>
                            <span className="text-xs text-muted-foreground">participating</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Radio Section */}
        <RadioSection />

        {/* News Section */}
        <NewsSection />
      </div>
      
      <BottomNav />
    </div>
  );
}
