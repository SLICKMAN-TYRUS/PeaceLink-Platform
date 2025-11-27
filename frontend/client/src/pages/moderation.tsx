import { BottomNav, Header } from "@/components/layout";
import { RECENT_ISSUES } from "@/lib/mock-data";
import { MapPin, Check, X, AlertTriangle, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import mapImage from "@assets/generated_images/map_of_south_sudan_with_pins.png";

export default function Moderation() {
  const { toast } = useToast();
  
  const handleApprove = (id: number) => {
    toast({ title: "Report Approved", description: "The report is now visible to the public." });
  };

  const handleReject = (id: number) => {
      toast({ title: "Report Rejected", description: "The user has been notified." });
  };

  return (
    <div className="mobile-container pb-20">
      <Header title="Moderation Queue" />
      
      <main className="h-full flex flex-col">
        <div className="p-4 bg-background border-b border-border sticky top-14 z-10">
            <Tabs defaultValue="pending" className="w-full">
                <TabsList className="w-full">
                    <TabsTrigger value="pending" className="flex-1">Pending (3)</TabsTrigger>
                    <TabsTrigger value="flagged" className="flex-1">Flagged</TabsTrigger>
                    <TabsTrigger value="map" className="flex-1">Map View</TabsTrigger>
                </TabsList>
            </Tabs>
        </div>

        <div className="p-4 space-y-4">
             {/* Pending Items */}
             {RECENT_ISSUES.filter(i => i.status === "Pending Review").map((issue) => (
                 <div key={issue.id} className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                    <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                            <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                                {issue.category}
                            </span>
                            <span className="text-xs text-muted-foreground">{issue.timestamp}</span>
                        </div>
                        <h3 className="font-bold text-foreground mb-1">New Report from {issue.location}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{issue.description}</p>
                        
                        <div className="bg-secondary/30 p-2 rounded text-xs flex items-center gap-2 mb-4">
                            <AlertTriangle className="h-4 w-4 text-yellow-600" />
                            <span>AI Safety Check: No harmful language detected.</span>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <Button variant="outline" className="w-full text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => handleReject(issue.id)}>
                                <X className="h-4 w-4 mr-2" /> Reject
                            </Button>
                            <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => handleApprove(issue.id)}>
                                <Check className="h-4 w-4 mr-2" /> Publish
                            </Button>
                        </div>
                    </div>
                 </div>
             ))}

             {/* Mock Map View for "map" tab context */}
             <div className="hidden">
                 <img src={mapImage} alt="Map View" className="w-full rounded-xl" />
             </div>
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
}
