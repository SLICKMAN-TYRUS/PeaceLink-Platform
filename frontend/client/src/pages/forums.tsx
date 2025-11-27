import { useState } from "react";
import { BottomNav, Header } from "@/components/layout";
import { SAMPLE_FORUM_TOPICS, HIGHLIGHTED_POSTS, SAMPLE_MEETINGS } from "@/lib/sample-forums-data";
import { MessageSquare, Plus, Search, ThumbsUp, ShieldCheck, Users, Calendar, Video, Mic, Paperclip, Send, TrendingUp, AlertCircle, Clock, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "wouter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/lib/auth";

export default function Forums() {
  const { user } = useAuth();
  const [createPostOpen, setCreatePostOpen] = useState(false);
  const [scheduleMeetingOpen, setScheduleMeetingOpen] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCreatePost = () => {
    // API call to create post
    console.log("Creating post:", postContent);
    setCreatePostOpen(false);
    setPostContent("");
  };

  const handleScheduleMeeting = () => {
    // API call to schedule meeting
    console.log("Scheduling meeting");
    setScheduleMeetingOpen(false);
  };

  const filteredTopics = SAMPLE_FORUM_TOPICS.filter(topic =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 pb-24">
      <Header title="Peace Talks" />
      
      <main className="p-4 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search topics..." 
            className="pl-9 bg-white border-2 border-blue-100" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Admin Meeting Scheduler - Only for admins */}
        {user?.role === 'admin' && (
          <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                  <span className="font-bold text-sm">Admin: Schedule Leadership Meeting</span>
                </div>
                <Dialog open={scheduleMeetingOpen} onOpenChange={setScheduleMeetingOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline" className="border-orange-300">
                      <Calendar className="h-4 w-4 mr-1" />
                      Schedule
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Schedule Leadership Meeting</DialogTitle>
                      <DialogDescription>
                        Invite leaders from all categories for urgent political intervention
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="meeting-title">Meeting Title</Label>
                        <Input id="meeting-title" placeholder="e.g., Urgent Conflict Mediation" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="meeting-desc">Description</Label>
                        <Textarea id="meeting-desc" placeholder="Meeting purpose and agenda" rows={3} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="meeting-time">Scheduled Time</Label>
                        <Input id="meeting-time" type="datetime-local" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="urgency">Urgency Level</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select urgency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="critical">Critical</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="normal">Normal</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Invite Leaders (Select multiple)</Label>
                        <div className="text-xs text-muted-foreground">
                          Will invite elders, NGO leaders, and youth representatives
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleScheduleMeeting} className="w-full">
                        Schedule & Generate Google Meet Link
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Upcoming Meetings */}
        {SAMPLE_MEETINGS.length > 0 && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Video className="h-4 w-4 text-blue-600" />
                Upcoming Leadership Meetings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {SAMPLE_MEETINGS.slice(0, 2).map(meeting => (
                <div key={meeting.id} className="p-3 bg-secondary/30 rounded-lg">
                  <div className="flex items-start justify-between mb-1">
                    <Badge 
                      variant="outline" 
                      className={`text-[9px] ${
                        meeting.urgency === 'critical' ? 'border-red-500 text-red-600' :
                        meeting.urgency === 'high' ? 'border-orange-500 text-orange-600' :
                        'border-blue-500 text-blue-600'
                      }`}
                    >
                      {meeting.urgency.toUpperCase()}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(meeting.scheduled_time).toLocaleDateString()}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm mb-1">{meeting.title}</h4>
                  <p className="text-xs text-muted-foreground mb-2">{meeting.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {meeting.invited_count} leaders invited
                    </span>
                    {meeting.google_meet_link && (
                      <Button size="sm" variant="outline" className="h-7 text-xs">
                        <Video className="h-3 w-3 mr-1" />
                        Join
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Highlighted/Most Engaged Posts */}
        <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              Most Engaged Discussions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {HIGHLIGHTED_POSTS.map(post => (
              <div key={post.id} className="p-3 bg-white rounded-lg border border-green-100">
                <div className="flex items-start gap-2 mb-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.user.username}`} />
                    <AvatarFallback>{post.user.username[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs">{post.user.username}</span>
                      <Badge variant="outline" className="text-[9px]">{post.user.role}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{post.user.location}</p>
                  </div>
                  <span className="text-[10px] text-muted-foreground">{formatRelativeTime(post.created_at)}</span>
                </div>
                {post.audio_recording && (
                  <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg mb-2">
                    <Mic className="h-4 w-4 text-blue-600" />
                    <span className="text-xs text-blue-700">Audio message in local language</span>
                  </div>
                )}
                {post.attachment && (
                  <div className="flex items-center gap-2 p-2 bg-purple-50 rounded-lg mb-2">
                    <Paperclip className="h-4 w-4 text-purple-600" />
                    <span className="text-xs text-purple-700">File attachment</span>
                  </div>
                )}
                <p className="text-sm mb-2">{post.content}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <button className="flex items-center gap-1 hover:text-primary transition-colors">
                    <ThumbsUp className="h-3.5 w-3.5" />
                    {post.like_count}
                  </button>
                  <button className="flex items-center gap-1 hover:text-primary transition-colors">
                    <MessageSquare className="h-3.5 w-3.5" />
                    {post.reply_count}
                  </button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Forum Topics */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="all">All Topics</TabsTrigger>
            <TabsTrigger value="pinned">Pinned</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-3 mt-4">
            {filteredTopics.map((topic) => (
              <Card key={topic.id} className="border-2 border-blue-100 hover:border-blue-300 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <Badge className="text-[10px] uppercase">{topic.category}</Badge>
                    {topic.is_pinned && (
                      <ShieldCheck className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                  <h3 className="font-bold text-base mb-2 leading-snug">
                    {topic.title}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${topic.author.username}`} />
                      <AvatarFallback>{topic.author.username[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-medium">{topic.author.username}</span>
                    <Badge variant="outline" className="text-[9px]">{topic.author.role}</Badge>
                    <span className="text-xs text-muted-foreground ml-auto">
                      <MapPin className="h-3 w-3 inline mr-1" />
                      {topic.author.location}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-3.5 w-3.5" />
                        {topic.post_count} posts
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        {topic.view_count} views
                      </span>
                    </div>
                    <span>{formatRelativeTime(topic.latest_post?.created_at || topic.created_at)}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="pinned" className="space-y-3 mt-4">
            {filteredTopics.filter(t => t.is_pinned).map(topic => (
              <Card key={topic.id} className="border-2 border-blue-200">
                <CardContent className="p-4">
                  <h3 className="font-bold">{topic.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{topic.post_count} posts</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="recent" className="space-y-3 mt-4">
            {filteredTopics.slice(0, 5).map(topic => (
              <Card key={topic.id}>
                <CardContent className="p-4">
                  <h3 className="font-bold">{topic.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{topic.post_count} posts</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </main>

      {/* Create Discussion Button with Dialog */}
      <Dialog open={createPostOpen} onOpenChange={setCreatePostOpen}>
        <DialogTrigger asChild>
          <Button className="fixed bottom-24 right-4 h-14 w-14 rounded-full shadow-lg z-40 bg-primary hover:bg-primary/90" size="icon">
            <Plus className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Initiate a Discussion</DialogTitle>
            <DialogDescription>
              Start a new topic or share your thoughts with the community
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="topic-title">Discussion Title</Label>
              <Input id="topic-title" placeholder="What would you like to discuss?" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conflict_resolution">Conflict Resolution</SelectItem>
                  <SelectItem value="infrastructure">Infrastructure</SelectItem>
                  <SelectItem value="governance">Governance</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="health">Health</SelectItem>
                  <SelectItem value="livelihoods">Livelihoods</SelectItem>
                  <SelectItem value="youth">Youth Issues</SelectItem>
                  <SelectItem value="women">Women & Gender</SelectItem>
                  <SelectItem value="culture">Culture & Heritage</SelectItem>
                  <SelectItem value="environment">Environment</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="post-content">Your Message</Label>
              <Textarea 
                id="post-content" 
                placeholder="Share your thoughts, concerns, or ideas..." 
                rows={5}
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                className={isRecording ? "bg-red-50 border-red-300" : ""}
                onClick={() => setIsRecording(!isRecording)}
              >
                <Mic className={`h-4 w-4 mr-1 ${isRecording ? "text-red-600" : ""}`} />
                {isRecording ? "Recording..." : "Record Audio"}
              </Button>
              <Button type="button" variant="outline" size="sm">
                <Paperclip className="h-4 w-4 mr-1" />
                Attach File
              </Button>
            </div>
            {isRecording && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-xs text-red-700">
                  🎤 Recording audio for elders who prefer voice messages...
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button onClick={handleCreatePost} className="w-full gap-2">
              <Send className="h-4 w-4" />
              Post Discussion
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
}
