import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth-context";
import { Building2, ArrowLeft, Upload, Globe, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function InstitutionSignUp() {
  const { login } = useAuth();
  const { toast } = useToast();
  const [step, setStep] = useState<1 | 2>(1);
  
  // Form State
  const [orgName, setOrgName] = useState("");
  const [orgType, setOrgType] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [mission, setMission] = useState("");

  const handleNext = () => {
    if (!orgName || !orgType || !email) {
        toast({ title: "Required Fields", description: "Please fill in organization details.", variant: "destructive" });
        return;
    }
    setStep(2);
  };

  const handleSubmit = () => {
    if (!regNumber) {
        toast({ title: "Registration Required", description: "Please provide registration details.", variant: "destructive" });
        return;
    }
    
    toast({
        title: "Application Submitted",
        description: "Our team will verify your organization details within 48 hours.",
    });
    
    // Simulate login for demo purposes
    setTimeout(() => {
        login({
            id: "new-inst",
            name: orgName,
            role: "ngo",
            location: "Pending Verification",
            avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${orgName}`,
            verified: false,
        });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      <div className="p-6 flex justify-between items-center">
        <Link href="/landing">
          <Button variant="ghost" className="gap-2 text-slate-600">
            <ArrowLeft className="h-4 w-4" /> Cancel
          </Button>
        </Link>
        <div className="text-sm font-medium text-slate-500">Step {step} of 2</div>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center px-6 pb-20">
        <div className="w-full max-w-lg space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-slate-900">Partner Registration</h1>
            <p className="text-slate-500">Join PeaceLink to coordinate aid and access community data.</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            {step === 1 ? (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Organization Name</Label>
                            <Input 
                                placeholder="e.g. Save the Children" 
                                className="h-12 bg-slate-50 border-slate-200" 
                                value={orgName}
                                onChange={(e) => setOrgName(e.target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Type</Label>
                                <Select onValueChange={setOrgType}>
                                    <SelectTrigger className="h-12 bg-slate-50 border-slate-200">
                                        <SelectValue placeholder="Select..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ingo">International NGO</SelectItem>
                                        <SelectItem value="nngo">National NGO</SelectItem>
                                        <SelectItem value="cbo">CBO</SelectItem>
                                        <SelectItem value="gov">Government Agency</SelectItem>
                                        <SelectItem value="un">UN Agency</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Official Email</Label>
                                <Input 
                                    placeholder="contact@org.com" 
                                    className="h-12 bg-slate-50 border-slate-200"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Website (Optional)</Label>
                            <div className="relative">
                                <Globe className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                                <Input 
                                    placeholder="https://..." 
                                    className="pl-10 h-12 bg-slate-50 border-slate-200"
                                    value={website}
                                    onChange={(e) => setWebsite(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <Button onClick={handleNext} className="w-full h-12 font-bold text-base bg-slate-900 hover:bg-slate-800">
                        Continue
                    </Button>
                </div>
            ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex gap-3 items-start">
                        <ShieldCheck className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                        <p className="text-sm text-blue-800">We require proof of registration with the RRC (Relief and Rehabilitation Commission) to verify your account.</p>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>RRC Registration Number</Label>
                            <Input 
                                placeholder="Reg. No." 
                                className="h-12 bg-slate-50 border-slate-200"
                                value={regNumber}
                                onChange={(e) => setRegNumber(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Mission Statement / Focus Areas</Label>
                            <Textarea 
                                placeholder="Briefly describe your organization's work in South Sudan..." 
                                className="min-h-[100px] bg-slate-50 border-slate-200"
                                value={mission}
                                onChange={(e) => setMission(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Upload Registration Certificate</Label>
                            <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer bg-white">
                                <Upload className="h-8 w-8 text-slate-400 mb-2" />
                                <span className="text-sm font-medium text-slate-600">Click to upload document</span>
                                <span className="text-xs text-slate-400 mt-1">PDF or JPG up to 5MB</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <Button variant="outline" onClick={() => setStep(1)} className="h-12 px-6">Back</Button>
                        <Button onClick={handleSubmit} className="flex-1 h-12 font-bold text-base bg-slate-900 hover:bg-slate-800">
                            Submit Application
                        </Button>
                    </div>
                </div>
            )}
          </div>
          
          <div className="text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link href="/institution-login" className="text-blue-600 font-bold hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
