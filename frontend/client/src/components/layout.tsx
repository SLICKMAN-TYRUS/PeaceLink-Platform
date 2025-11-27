import { Users, MapPin, BookOpen, Home, Bell, Menu, ArrowLeft } from "lucide-react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const [location] = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: MapPin, label: "Report", path: "/report" },
    { icon: Users, label: "Forums", path: "/forums" },
    { icon: BookOpen, label: "Resources", path: "/resources" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border/40 pb-safe z-50 mobile-container-fixed">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = location === item.path;
          return (
            <Link 
              key={item.path} 
              href={item.path}
              className={cn(
                "flex flex-col items-center justify-center w-16 h-full transition-colors duration-200 cursor-pointer",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className={cn("h-6 w-6 mb-1", isActive && "fill-current/20")} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function Header({ title, showBack = true, backPath }: { title?: string, showBack?: boolean, backPath?: string }) {
  const [, setLocation] = useLocation();

  const handleBack = () => {
    if (backPath) {
      setLocation(backPath);
    } else {
      window.history.back();
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur-md border-b border-border/40 shadow-sm">
      <div className="flex items-center justify-between px-4 h-14">
        <div className="flex items-center gap-3">
          {showBack && (
            <button 
              onClick={handleBack}
              className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5 text-muted-foreground" />
            </button>
          )}
          <div className="font-heading font-bold text-xl text-foreground tracking-tight">
            {title || "PeaceLink"}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/">
            <button className="p-2 rounded-full hover:bg-muted transition-colors">
              <Home className="h-5 w-5 text-muted-foreground" />
            </button>
          </Link>
          <button className="p-2 rounded-full hover:bg-muted transition-colors relative">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive ring-2 ring-background"></span>
          </button>
          <button className="p-2 rounded-full hover:bg-muted transition-colors">
            <Menu className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
      </div>
    </header>
  );
}
