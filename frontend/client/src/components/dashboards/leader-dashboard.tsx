import { Header, BottomNav } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, AlertTriangle, MessageSquare, CheckCircle2, Users } from "lucide-react";
import { Link } from "wouter";
import { RECENT_ISSUES } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth-context";
import { RadioSection } from "@/components/media/radio-section";
import { NewsSection } from "@/components/media/news-section";

export function LeaderDashboard() {
  const { user } = useAuth();
  const pendingReports = RECENT_ISSUES.filter(i => i.status === "Pending Review").length;

  return (
    <div className="min-h-screen bg-slate-50 pb-24 font-sans">
      <Header title="Community Leader" />
      
      <div className="p-4 space-y-6">
        {/* Status Overview */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary border-4 border-white shadow-sm">
                    <ShieldCheck className="h-8 w-8" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Welcome, Elder</h1>
                    <p className="text-slate-500 text-sm">{user?.location} Community</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                 <Link href="/moderation">
                    <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 cursor-pointer hover:bg-orange-100 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <AlertTriangle className="h-5 w-5 text-orange-600" />
                            <span className="bg-orange-200 text-orange-800 text-[10px] font-bold px-1.5 py-0.5 rounded-full">{pendingReports}</span>
                        </div>
                        <p className="text-sm font-bold text-slate-700">Pending Review</p>
                        <p className="text-xs text-slate-500 mt-1">Action needed</p>
                    </div>
                 </Link>
                 <Link href="/forums">
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 cursor-pointer hover:bg-blue-100 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <MessageSquare className="h-5 w-5 text-blue-600" />
                            <span className="bg-blue-200 text-blue-800 text-[10px] font-bold px-1.5 py-0.5 rounded-full">3</span>
                        </div>
                        <p className="text-sm font-bold text-slate-700">Mediation Req.</p>
                        <p className="text-xs text-slate-500 mt-1">Community disputes</p>
                    </div>
                 </Link>
            </div>
        </div>

        {/* Quick Actions */}
        <div>
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 px-1">Management</h3>
            <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 shadow-sm">
                <Link href="/moderation">
                    <div className="p-4 flex items-center gap-4 cursor-pointer hover:bg-slate-50 transition-colors">
                        <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                            <CheckCircle2 className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-slate-800 text-sm">Approve Reports</h4>
                            <p className="text-xs text-slate-500">Validate community submissions</p>
                        </div>
                    </div>
                </Link>
                <Link href="/forums">
                    <div className="p-4 flex items-center gap-4 cursor-pointer hover:bg-slate-50 transition-colors">
                        <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                            <Users className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-slate-800 text-sm">Initiate Dialogue</h4>
                            <p className="text-xs text-slate-500">Start a formal peace talk</p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>

        {/* Community Pulse */}
        <div>
             <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 px-1">Community Pulse</h3>
             <div className="space-y-3">
                {RECENT_ISSUES.slice(0,3).map(issue => (
                    <div key={issue.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex gap-3">
                         <div className={`h-2 w-2 mt-2 rounded-full shrink-0 ${issue.status === 'Approved' ? 'bg-green-500' : 'bg-orange-400'}`}></div>
                         <div>
                             <h4 className="text-sm font-bold text-slate-800">{issue.category}</h4>
                             <p className="text-xs text-slate-500 mb-2">{issue.location}</p>
                             <p className="text-sm text-slate-600 leading-snug">{issue.description}</p>
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
