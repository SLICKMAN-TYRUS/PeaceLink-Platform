import { Header, BottomNav } from "@/components/layout";
import { RECENT_ISSUES } from "@/lib/mock-data";
import { MapPin, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MyReports() {
  // Mocking user's own reports
  const myReports = RECENT_ISSUES; // In real app, filter by user ID

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="My Activity" showBack />
      
      <div className="p-4 space-y-4">
        <h2 className="text-lg font-bold text-foreground">Submission History</h2>
        
        <div className="space-y-3">
          {myReports.map((issue) => (
            <div key={issue.id} className="bg-card p-4 rounded-xl border border-border shadow-sm flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  {issue.status === 'Approved' && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                  {issue.status === 'Pending Review' && <Clock className="h-4 w-4 text-orange-500" />}
                  {issue.status === 'Resolved' && <CheckCircle2 className="h-4 w-4 text-blue-500" />}
                  
                  <span className={cn(
                    "text-xs font-bold uppercase tracking-wider",
                    issue.status === 'Pending Review' ? "text-orange-600" : 
                    issue.status === 'Approved' ? "text-green-600" : "text-blue-600"
                  )}>
                    {issue.status}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">{issue.timestamp}</span>
              </div>
              
              <div>
                 <h3 className="font-bold text-sm mb-1">{issue.category}</h3>
                 <p className="text-sm text-muted-foreground line-clamp-2">{issue.description}</p>
              </div>
              
              <div className="flex items-center text-xs text-muted-foreground gap-1.5 pt-2 border-t border-border/50">
                  <MapPin className="h-3.5 w-3.5" />
                  {issue.location}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
}
