import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth-context";
import { ArrowLeft, Lock, Phone, Mail, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export default function Login() {
  const { login } = useAuth();
  const { toast } = useToast();
  
  // Phone-based login (Youth, Elder)
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [phoneStep, setPhoneStep] = useState<1 | 2>(1);
  
  // Email-based login (Admin, NGO/Partner)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [loginType, setLoginType] = useState<"phone" | "email">("phone");

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
    
    // Simulate SMS sending
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setPhoneStep(2);
    setOtpTimer(120);
    
    toast({
      title: "OTP Sent!",
      description: `Verification code sent to ${phone}. Code: ${newOtp} (Demo mode)`,
    });
  };

  const handleVerifyOtp = () => {
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
          description: `Logged in as ${userData.name}.`,
        });
      }
    }, 1000);
  };

  const handleEmailLogin = async () => {
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    if (!password || password.length < 6) {
      toast({
        title: "Invalid password",
        description: "Password must be at least 6 characters",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Check if user exists in localStorage
    const registeredUsers = JSON.parse(localStorage.getItem('peacelink_users') || '[]');
    const userData = registeredUsers.find((u: any) => 
      u.email === email && (u.role === 'admin' || u.role === 'moderator' || u.role === 'ngo')
    );
    
    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    
    if (!userData) {
      toast({
        title: "Invalid credentials",
        description: "No admin/partner account found with these credentials. Please check your email or contact support.",
        variant: "destructive",
      });
      return;
    }

    // In production, verify password hash. For demo, accept any password
    login({
      id: userData.id,
      name: userData.name,
      role: userData.role,
      location: userData.location,
      avatar: userData.avatar,
      verified: true,
      phone: userData.phone,
      email: userData.email,
    });
    
    toast({
      title: "Welcome back!",
      description: `Logged in as ${userData.name}.`,
    });
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
            Sign in to access your PeaceLink account
          </p>
        </div>

        <Tabs value={loginType} onValueChange={(v) => setLoginType(v as "phone" | "email")} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Phone Login
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Login
            </TabsTrigger>
          </TabsList>

          {/* Phone-based Login (Youth, Elder) */}
          <TabsContent value="phone" className="space-y-6 bg-card p-6 rounded-2xl border-2 border-border shadow-lg">
            {phoneStep === 1 ? (
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
                  <p className="text-xs text-muted-foreground">For Youth and Elder accounts</p>
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
              </div>
            ) : (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">Verification Code</Label>
                  <Input 
                    id="otp" 
                    placeholder="000000" 
                    className="text-center text-2xl font-mono tracking-widest h-14"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  />
                  {otpTimer > 0 && (
                    <p className="text-xs text-muted-foreground text-center">
                      Code expires in {Math.floor(otpTimer / 60)}:{String(otpTimer % 60).padStart(2, '0')}
                    </p>
                  )}
                </div>
                <Button 
                  onClick={handleVerifyOtp} 
                  className="w-full h-14 font-bold text-lg rounded-xl shadow-lg shadow-primary/20"
                  disabled={!otp || isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    "Verify & Login"
                  )}
                </Button>
                <div className="flex justify-between pt-2">
                  <Button 
                    variant="ghost" 
                    onClick={() => setPhoneStep(1)}
                    className="text-sm"
                  >
                    Change Phone
                  </Button>
                  {otpTimer === 0 && (
                    <Button 
                      variant="ghost" 
                      onClick={handleSendOtp}
                      className="text-sm text-primary font-medium"
                    >
                      Resend Code
                    </Button>
                  )}
                </div>
              </div>
            )}
            <div className="text-center pt-2">
              <Link href="/signup" className="text-sm text-primary font-medium hover:underline">
                Don't have an account? Sign up
              </Link>
            </div>
          </TabsContent>

          {/* Email-based Login (Admin, NGO/Partner) */}
          <TabsContent value="email" className="space-y-6 bg-card p-6 rounded-2xl border-2 border-border shadow-lg">
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input 
                    id="email" 
                    type="email"
                    placeholder="admin@peacelink.org" 
                    className="pl-10 h-12"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <p className="text-xs text-muted-foreground">For Admin, Moderator, and Partner accounts</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input 
                    id="password" 
                    type="password"
                    placeholder="••••••••" 
                    className="pl-10 h-12"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <Button 
                onClick={handleEmailLogin} 
                className="w-full h-14 font-bold text-lg rounded-xl shadow-lg shadow-primary/20"
                disabled={!email || !password || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>

              <div className="text-center pt-2">
                <button className="text-sm text-primary font-medium hover:underline">
                  Forgot password?
                </button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
