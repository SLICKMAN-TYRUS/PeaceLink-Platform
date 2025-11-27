import { Header, BottomNav } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { BarChart3, Map, FileText, Download, TrendingUp, Activity } from "lucide-react";
import { Link } from "wouter";
import { useAuth } from "@/lib/auth-context";
import { RadioSection } from "@/components/media/radio-section";
import { NewsSection } from "@/components/media/news-section";

export function NGODashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-100 pb-24 font-sans">
      <Header title="Partner Portal" />
      
      <div className="p-4 space-y-6">
        {/* Dashboard Header */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-xl font-bold text-slate-900">{user?.name}</h1>
                    <p className="text-slate-500 text-sm">Operations • {user?.location}</p>
                </div>
                <div className="h-10 w-10 bg-green-100 text-green-700 rounded-lg flex items-center justify-center">
                    <Activity className="h-6 w-6" />
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center divide-x divide-slate-100">
                <div>
                    <span className="block text-2xl font-bold text-slate-900">12</span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider">Active Projects</span>
                </div>
                <div>
                    <span className="block text-2xl font-bold text-slate-900">85%</span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider">Completion</span>
                </div>
                <div>
                    <span className="block text-2xl font-bold text-slate-900">142</span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider">Beneficiaries</span>
                </div>
            </div>
        </div>

        {/* Analytics & Map Access */}
        <div className="grid grid-cols-2 gap-4">
            <Link href="/analytics">
                <div className="bg-blue-600 text-white p-5 rounded-2xl shadow-lg shadow-blue-200 cursor-pointer hover:bg-blue-700 transition-colors flex flex-col justify-between h-32">
                    <BarChart3 className="h-6 w-6 opacity-80" />
                    <div>
                        <h3 className="font-bold text-lg">Analytics</h3>
                        <p className="text-blue-100 text-xs">View data trends</p>
                    </div>
                </div>
            </Link>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors flex flex-col justify-between h-32">
                <Map className="h-6 w-6 text-slate-400" />
                <div>
                    <h3 className="font-bold text-lg text-slate-800">Heatmap</h3>
                    <p className="text-slate-500 text-xs">Regional hotspots</p>
                </div>
            </div>
        </div>

        {/* Recent Reports Table Preview */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-slate-800 text-sm">Recent Verified Reports</h3>
                <Button variant="ghost" size="sm" className="text-xs h-8">View All</Button>
            </div>
            <div className="divide-y divide-slate-100">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="p-4 flex justify-between items-center">
                        <div>
                            <p className="text-sm font-medium text-slate-800">Water Infrastructure</p>
                            <p className="text-xs text-slate-500">Juba, Munuki • 2h ago</p>
                        </div>
                        <span className="px-2 py-1 bg-green-50 text-green-700 text-[10px] font-bold rounded-full uppercase">Verified</span>
                    </div>
                ))}
            </div>
            <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
                <button className="text-xs font-bold text-blue-600 flex items-center justify-center gap-1 w-full">
                    <Download className="h-3 w-3" /> Export CSV
                </button>
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
