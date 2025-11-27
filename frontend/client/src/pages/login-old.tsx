import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth-context";
import { ArrowLeft, Lock, Phone, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const { login } = useAuth();
  const { toast } = useToast();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [step, setStep] = useState<1 | 2>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);

  // Timer countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  const handleSendOtp = async () => {
    if (!phone || phone.length < 10) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid phone number",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Check if user exists in localStorage (registered users)
    const registeredUsers = JSON.parse(localStorage.getItem('peacelink_users') || '[]');
    const userExists = registeredUsers.find((u: any) => u.phone === phone);
    
    if (!userExists) {
      setIsLoading(false);
      toast({
        title: "Account not found",
        description: "No account found with this phone number. Please sign up first.",
        variant: "destructive",
      });
      return;
    }

    // Generate 6-digit OTP
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    
    // Simulate SMS sending (In production, call your SMS API here)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setStep(2);
    setOtpTimer(120); // 2 minutes
    
    toast({
      title: "OTP Sent!",
      description: `Verification code sent to ${phone}. Code: ${newOtp} (Demo mode)`,
    });
  };

  const handleVerify = () => {
    if (!otp || otp.length !== 6) {
      toast({
        title: "Invalid code",
        description: "Please enter a 6-digit verification code",
        variant: "destructive",
      });
      return;
    }

    if (otp !== generatedOtp) {
      toast({
        title: "Incorrect code",
        description: "The verification code you entered is incorrect. Please try again.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Retrieve user from localStorage
    const registeredUsers = JSON.parse(localStorage.getItem('peacelink_users') || '[]');
    const userData = registeredUsers.find((u: any) => u.phone === phone);
    
    setTimeout(() => {
      setIsLoading(false);
      
      if (userData) {
        // Determine landing page based on role
        let destination = '';
        switch (userData.role) {
          case 'youth':
            destination = 'Youth Dashboard';
            break;
          case 'leader':
          case 'elder':
            destination = 'Elder Dashboard';
            break;
          case 'ngo':
            destination = 'NGO/Government Dashboard';
            break;
          case 'moderator':
            destination = 'Moderator Dashboard';
            break;
          case 'admin':
            destination = 'Admin Dashboard';
            break;
          default:
            destination = 'Dashboard';
        }

        login({
          id: userData.id,
          name: userData.name,
          role: userData.role,
          location: userData.location,
          avatar: userData.avatar,
          verified: userData.verified,
          phone: userData.phone,
          nationalId: userData.nationalId,
          residenceProof: userData.residenceProof,
        });
        
        toast({
          title: "Welcome back!",
          description: `Logged in as ${userData.name}. Redirecting to ${destination}...`,
        });
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 font-sans flex flex-col">
      <div className="p-4">
        <Link href="/landing">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
      </div>

      <div className="flex-1 flex flex-col justify-center px-6 pb-20 max-w-md mx-auto w-full">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-heading font-bold mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">
            {step === 1 ? "Enter your phone number to access your account" : "Enter the verification code sent to your phone"}
          </p>
        </div>

        <div className="space-y-6 bg-card p-6 rounded-2xl border-2 border-border shadow-lg">
          {step === 1 ? (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input 
                    id="phone" 
                    placeholder="+211 ..." 
                    className="pl-10 h-12 text-lg"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <p className="text-xs text-muted-foreground">Use the phone number you registered with</p>
              </div>
              <Button 
                onClick={handleSendOtp} 
                className="w-full h-14 font-bold text-lg rounded-xl shadow-lg shadow-primary/20"
                disabled={!phone || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Code"
                )}
              </Button>
              <div className="text-center pt-2">
                <Link href="/signup" className="text-sm text-primary font-medium hover:underline">
                  Don't have an account? Sign up
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-8">
              <div className="space-y-2">
                <Label htmlFor="otp">Verification Code</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input 
                    id="otp" 
                    placeholder="000000" 
                    className="pl-10 h-12 text-lg tracking-widest text-center font-mono"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    maxLength={6}
                  />
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">Sent to {phone}</span>
                  {otpTimer > 0 ? (
                    <span className="text-muted-foreground">Expires in {otpTimer}s</span>
                  ) : (
                    <button 
                      onClick={handleSendOtp}
                      className="text-primary font-medium hover:underline"
                      disabled={isLoading}
                    >
                      Resend Code
                    </button>
                  )}
                </div>
              </div>
              <Button 
                onClick={handleVerify} 
                className="w-full h-14 font-bold text-lg rounded-xl shadow-lg shadow-primary/20"
                disabled={!otp || otp.length !== 6 || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setStep(1);
                  setOtp("");
                  setOtpTimer(0);
                }}
                className="w-full"
              >
                Change Phone Number
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
