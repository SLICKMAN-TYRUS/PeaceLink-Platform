import { BottomNav, Header } from "@/components/layout";
import { CHAT_MESSAGES, MOCK_USERS } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth-context";
import { ArrowLeft, Send, MoreVertical, Phone, Video } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useLocation } from "wouter";
import { cn } from "@/lib/utils";

export default function Chat() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [newMessage, setNewMessage] = useState("");
  
  // Mock selecting a conversation with the first user in mock data
  const conversationPartner = MOCK_USERS.find(u => u.id === "u2") || MOCK_USERS[0];
  
  const handleSend = () => {
    if (!newMessage.trim()) return;
    // In a real app, this would send to backend
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Chat Header */}
      <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md border-b border-border/40 p-3 flex items-center gap-3">
        <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setLocation('/forums')}>
            <ArrowLeft className="h-6 w-6" />
        </Button>
        <div className="relative">
            <img 
                src={conversationPartner.avatar} 
                alt={conversationPartner.name} 
                className="h-10 w-10 rounded-full object-cover border border-border"
            />
            <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-background rounded-full"></span>
        </div>
        <div className="flex-1">
            <h3 className="font-bold text-sm">{conversationPartner.name}</h3>
            <span className="text-xs text-muted-foreground capitalize">{conversationPartner.role} • Online</span>
        </div>
        <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="text-muted-foreground"><Phone className="h-5 w-5" /></Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground"><Video className="h-5 w-5" /></Button>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
        <div className="text-center text-xs text-muted-foreground my-4">
            <span>Today, 10:30 AM</span>
        </div>
        
        {CHAT_MESSAGES.map((msg) => {
            const isMe = msg.senderId !== conversationPartner.id; // Assuming current user is the other one
            return (
                <div key={msg.id} className={cn("flex w-full", isMe ? "justify-end" : "justify-start")}>
                    <div className={cn(
                        "max-w-[75%] p-3 rounded-2xl text-sm",
                        isMe 
                        ? "bg-primary text-primary-foreground rounded-br-none" 
                        : "bg-secondary text-secondary-foreground rounded-bl-none"
                    )}>
                        {msg.text}
                    </div>
                </div>
            );
        })}
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-3 pb-safe mobile-container-fixed">
        <div className="flex items-center gap-2">
            <Input 
                placeholder="Type a message..." 
                className="rounded-full bg-secondary/50 border-none h-12"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
            />
            <Button size="icon" className="rounded-full h-12 w-12 shrink-0" onClick={handleSend}>
                <Send className="h-5 w-5" />
            </Button>
        </div>
      </div>
    </div>
  );
}
