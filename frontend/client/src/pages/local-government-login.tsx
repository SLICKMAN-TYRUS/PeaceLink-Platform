import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth-context";
import { Building2, Mail, Lock, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

export default function InstitutionLogin() {
  const { login } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    if (!email || !password) return;
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      login({
        id: "inst-1",
        name: "UNICEF South Sudan",
        role: "ngo",
        location: "Juba HQ",
        avatar: "https://api.dicebear.com/7.x/initials/svg?seed=UN",
        verified: true,
      });
      toast({
        title: "Partner Access Granted",
        description: "Welcome back to the PeaceLink Partner Portal.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      <div className="p-6">
        <Link href="/landing">
          <Button variant="ghost" className="gap-2 text-slate-600">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Button>
        </Link>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center px-6 pb-20">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2">
            <div className="h-16 w-16 bg-blue-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-blue-200">
              <Building2 className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Partner Portal</h1>
            <p className="text-slate-500">Secure access for NGOs and Government Agencies</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Official Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                  <Input 
                    id="email" 
                    placeholder="name@organization.org" 
                    className="pl-10 h-12 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  <span className="text-xs text-blue-600 font-medium cursor-pointer hover:underline">Forgot password?</span>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    className="pl-10 h-12 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-600"
                >
                  Remember this device
                </label>
              </div>
            </div>

            <Button 
              onClick={handleLogin} 
              className="w-full h-12 font-bold text-base bg-slate-900 hover:bg-slate-800"
              disabled={!email || !password || isLoading}
            >
              {isLoading ? "Authenticating..." : "Access Dashboard"}
            </Button>

            <div className="text-center text-sm text-slate-500">
              Not a partner yet?{" "}
              <Link href="/institution-signup" className="text-blue-600 font-bold hover:underline">
                Apply for Access
              </Link>
            </div>
          </div>
          
          <div className="text-center text-xs text-slate-400">
            <p>Protected by secure encryption. Access is monitored.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
