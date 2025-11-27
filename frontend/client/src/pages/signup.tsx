import type { ChangeEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  Check,
  User,
  Shield,
  Building2,
  Upload,
  MapPin,
  IdCard,
  Phone,
  BadgeCheck,
  X,
  FileText,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useAuth, UserRole } from "@/lib/auth-context";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import youthImg from "@assets/generated_images/portrait_of_a_smiling_south_sudanese_youth.png";
import elderImg from "@assets/generated_images/portrait_of_a_south_sudanese_elder.png";
import ngoImg from "@assets/generated_images/portrait_of_an_ngo_worker.png";

const FOCUS_AREAS = [
  { value: "water", label: "Water Access & Sanitation" },
  { value: "livelihoods", label: "Livelihoods & Economic Development" },
  { value: "education", label: "Education & Literacy" },
  { value: "health", label: "Health & Nutrition" },
  { value: "security", label: "Community Security & Safety" },
  { value: "infrastructure", label: "Infrastructure & Roads" },
  { value: "agriculture", label: "Agriculture & Food Security" },
  { value: "conflict", label: "Conflict Resolution & Peacebuilding" },
  { value: "governance", label: "Governance & Accountability" },
  { value: "environment", label: "Environment & Climate" },
  { value: "other", label: "Other" },
] as const;

const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "ar", label: "Arabic" },
  { value: "din", label: "Dinka" },
  { value: "juba", label: "Juba Arabic" },
  { value: "nus", label: "Nuer" },
  { value: "shk", label: "Shiluk" },
  { value: "bari", label: "Bari" },
] as const;

const AGE_BRACKETS = [
  { value: "13-17", label: "13-17 years" },
  { value: "18-24", label: "18-24 years" },
  { value: "25-35", label: "25-35 years" },
] as const;

const COMMUNITY_ROLES = [
  { value: "student", label: "Student" },
  { value: "farmer", label: "Farmer" },
  { value: "trader", label: "Small Business Owner/Trader" },
  { value: "employed", label: "Employed" },
  { value: "unemployed", label: "Unemployed/Job Seeking" },
  { value: "volunteer", label: "Community Volunteer" },
  { value: "other", label: "Other" },
] as const;

const ACCESSIBILITY_NEEDS = [
  { value: "none", label: "None" },
  { value: "vision", label: "Vision impairment" },
  { value: "hearing", label: "Hearing impairment" },
  { value: "low-literacy", label: "Low literacy (prefer audio/visual)" },
  { value: "physical", label: "Physical disability" },
  { value: "other", label: "Other" },
] as const;

const LEADERSHIP_ROLES = [
  { value: "chief", label: "Chief / Paramount Chief" },
  { value: "elder", label: "Community Elder" },
  { value: "youth-patron", label: "Youth Patron / Mentor" },
  { value: "religious", label: "Religious Leader (Pastor/Imam/Priest)" },
  { value: "women-leader", label: "Women's Leader / Advocate" },
  { value: "peace-committee", label: "Peace Committee Member" },
  { value: "traditional-authority", label: "Traditional Authority" },
  { value: "clan-leader", label: "Clan/Family Leader" },
  { value: "boma-chief", label: "Boma Chief" },
  { value: "payam-leader", label: "Payam Administrator" },
  { value: "other", label: "Other (Specify)" },
] as const;

const LEADERSHIP_EXPERIENCE = [
  { value: "0-2", label: "Less than 2 years" },
  { value: "2-5", label: "2-5 years" },
  { value: "5-10", label: "5-10 years" },
  { value: "10-20", label: "10-20 years" },
  { value: "20+", label: "20+ years" },
] as const;

const AREAS_OF_INFLUENCE = [
  { value: "conflict-resolution", label: "Conflict Resolution & Mediation" },
  { value: "youth-mentorship", label: "Youth Mentorship & Development" },
  { value: "women-protection", label: "Women & Child Protection" },
  { value: "resource-management", label: "Resource Management & Distribution" },
  { value: "cultural-preservation", label: "Cultural Preservation & Traditions" },
  { value: "education", label: "Education & Literacy" },
  { value: "security", label: "Community Security" },
  { value: "spiritual", label: "Spiritual Guidance" },
  { value: "governance", label: "Local Governance" },
  { value: "other", label: "Other" },
] as const;

const ORGANIZATION_TYPES = [
  { value: "local-govt", label: "Local Government / County Office" },
  { value: "state-govt", label: "State Government Ministry" },
  { value: "national-govt", label: "National Government Agency" },
  { value: "international-ngo", label: "International NGO" },
  { value: "local-ngo", label: "Local/National NGO" },
  { value: "faith-based", label: "Faith-Based Organization" },
  { value: "un-agency", label: "UN Agency" },
  { value: "community-org", label: "Community-Based Organization" },
  { value: "other", label: "Other" },
] as const;

const SECTOR_FOCUS = [
  { value: "peacebuilding", label: "Peacebuilding & Conflict Resolution" },
  { value: "humanitarian", label: "Humanitarian Aid & Relief" },
  { value: "protection", label: "Protection (GBV, Child, etc.)" },
  { value: "livelihoods", label: "Livelihoods & Economic Development" },
  { value: "education", label: "Education & Training" },
  { value: "health", label: "Health & Nutrition" },
  { value: "wash", label: "Water, Sanitation & Hygiene (WASH)" },
  { value: "governance", label: "Governance & Rule of Law" },
  { value: "infrastructure", label: "Infrastructure & Development" },
  { value: "food-security", label: "Food Security & Agriculture" },
  { value: "other", label: "Other" },
] as const;

const ORGANIZATION_SIZE = [
  { value: "small", label: "Small (1-20 staff)" },
  { value: "medium", label: "Medium (21-100 staff)" },
  { value: "large", label: "Large (100+ staff)" },
] as const;

const ROLE_OPTIONS = [
  {
    id: "youth" as UserRole,
    label: "Youth",
    description: "Raise issues, join forums, and access verified resources.",
    icon: User,
    image: youthImg,
    accent: "bg-primary/10 text-primary",
  },
  {
    id: "leader" as UserRole,
    label: "Community Elder",
    description: "Endorse reports, calm tensions, and mentor young mediators.",
    icon: Shield,
    image: elderImg,
    accent: "bg-amber-100 text-amber-700",
  },
  {
    id: "ngo" as UserRole,
    label: "Local Government / NGO Partner",
    description: "Coordinate analytics, upload resources, and send verified alerts.",
    icon: Building2,
    image: ngoImg,
    accent: "bg-slate-900/10 text-slate-900",
  },
] as const;

const ROLE_DETAILS: Record<Exclude<UserRole, null>, { blurb: string; checklist: string[] }> = {
  youth: {
    blurb: "Youth accounts get rapid access to reporting, forums, and localized learning hubs.",
    checklist: [
      "Offline-first issue reporting with audio notes and photos",
      "Localized alerts in the language you choose",
      "Impact trail that captures elder endorsements and moderator feedback",
    ],
  },
  leader: {
    blurb: "Elder accounts unlock voice-to-text workflows and stewardship controls.",
    checklist: [
      "Review incident queues with one-tap approvals or pauses",
      "Post audio guidance that auto-translates for youth audiences",
      "Assign trusted helpers and record cultural considerations",
    ],
  },
  ngo: {
    blurb: "Local government and NGO partner workspaces surface cross-county analytics, upload peacebuilding resources, and coordinate verified interventions.",
    checklist: [
      "Heat maps, export-ready briefs, and SLA tracking",
      "Upload guides, training modules, and verified resources",
      "Role-based access with audit logs for every download",
      "Multi-channel alert composer with translation previews",
    ],
  },
  elder: { blurb: "", checklist: [] },
  moderator: { blurb: "", checklist: [] },
  admin: { blurb: "", checklist: [] },
};

export default function SignUp() {
  const { login } = useAuth();
  const { toast } = useToast();
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [supportingDocument, setSupportingDocument] = useState<File | null>(null);
  const [idDocument, setIdDocument] = useState<File | null>(null);
  const [documentPreviewUrl, setDocumentPreviewUrl] = useState<string | null>(null);
  const [idPreviewUrl, setIdPreviewUrl] = useState<string | null>(null);

  const [youthFocus, setYouthFocus] = useState("");
  const [youthLanguage, setYouthLanguage] = useState("");
  const [youthAge, setYouthAge] = useState("");
  const [youthRole, setYouthRole] = useState("");
  const [youthAccessibility, setYouthAccessibility] = useState("");
  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [emergencyContactPhone, setEmergencyContactPhone] = useState("");
  const [elderReferral, setElderReferral] = useState("");
  const [consentData, setConsentData] = useState(false);
  const [consentAlerts, setConsentAlerts] = useState(false);
  const [consentGuidelines, setConsentGuidelines] = useState(false);
  
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [isResending, setIsResending] = useState(false);

  const [elderTitle, setElderTitle] = useState("");
  const [elderTitleOther, setElderTitleOther] = useState("");
  const [elderCommunity, setElderCommunity] = useState("");
  const [elderExperience, setElderExperience] = useState("");
  const [elderAreaOfInfluence, setElderAreaOfInfluence] = useState("");
  const [elderAchievement, setElderAchievement] = useState("");
  const [elderReference, setElderReference] = useState("");
  const [elderReferencePhone, setElderReferencePhone] = useState("");
  const [elderLanguages, setElderLanguages] = useState("");

  const [partnerDepartment, setPartnerDepartment] = useState("");
  const [partnerOrgType, setPartnerOrgType] = useState("");
  const [partnerOrgTypeOther, setPartnerOrgTypeOther] = useState("");
  const [partnerSector, setPartnerSector] = useState("");
  const [partnerOrgSize, setPartnerOrgSize] = useState("");
  const [partnerJobTitle, setPartnerJobTitle] = useState("");
  const [partnerEmail, setPartnerEmail] = useState("");
  const [partnerWebsite, setPartnerWebsite] = useState("");
  const [partnerRegistrationNo, setPartnerRegistrationNo] = useState("");
  const [partnerMandate, setPartnerMandate] = useState("");
  const [partnerCoverage, setPartnerCoverage] = useState("");
  const [partnerSupervisorName, setPartnerSupervisorName] = useState("");
  const [partnerSupervisorContact, setPartnerSupervisorContact] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const requestedRole = params.get("role") as UserRole | null;
    if (requestedRole && ROLE_OPTIONS.some((option) => option.id === requestedRole)) {
      setSelectedRole(requestedRole);
      setStep(2);
    }
  }, []);

  const roleInfo = useMemo(() => {
    if (!selectedRole) return null;
    return ROLE_OPTIONS.find((role) => role.id === selectedRole) ?? null;
  }, [selectedRole]);

  const selectedRoleDetails = selectedRole ? ROLE_DETAILS[selectedRole] : null;

  const syncRoleQueryParam = (role: UserRole | null) => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    if (role) {
      url.searchParams.set("role", role);
    } else {
      url.searchParams.delete("role");
    }
    window.history.replaceState({}, "", url.toString());
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setStep(2);
    syncRoleQueryParam(role);
  };

  const handleDocumentChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setSupportingDocument(file);
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setDocumentPreviewUrl(url);
    } else {
      setDocumentPreviewUrl(null);
    }
  };

  const handleIdDocumentChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setIdDocument(file);
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setIdPreviewUrl(url);
    } else {
      setIdPreviewUrl(null);
    }
  };

  const removeDocument = () => {
    setSupportingDocument(null);
    if (documentPreviewUrl) {
      URL.revokeObjectURL(documentPreviewUrl);
      setDocumentPreviewUrl(null);
    }
  };

  const removeIdDocument = () => {
    setIdDocument(null);
    if (idPreviewUrl) {
      URL.revokeObjectURL(idPreviewUrl);
      setIdPreviewUrl(null);
    }
  };

  useEffect(() => {
    return () => {
      if (documentPreviewUrl) URL.revokeObjectURL(documentPreviewUrl);
      if (idPreviewUrl) URL.revokeObjectURL(idPreviewUrl);
    };
  }, [documentPreviewUrl, idPreviewUrl]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  const sendOtp = async () => {
    if (!phone || phone.length < 10) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid phone number",
        variant: "destructive",
      });
      return;
    }

    setIsResending(true);
    // Generate 6-digit OTP
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    
    // Simulate SMS sending (In production, call your SMS API here)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setOtpSent(true);
    setOtpTimer(120); // 2 minutes
    setIsResending(false);
    
    toast({
      title: "OTP Sent!",
      description: `Verification code sent to ${phone}. Code: ${newOtp} (Demo mode)`,
    });
  };

  const verifyOtp = () => {
    if (otp === generatedOtp) {
      setOtpVerified(true);
      toast({
        title: "Phone Verified!",
        description: "Your phone number has been verified successfully.",
      });
    } else {
      toast({
        title: "Invalid OTP",
        description: "The code you entered is incorrect. Please try again.",
        variant: "destructive",
      });
    }
  };

  const roleRequirementsMet = () => {
    switch (selectedRole) {
      case "youth":
        return Boolean(
          youthFocus.trim() && 
          youthLanguage.trim() && 
          youthAge.trim() && 
          youthRole.trim() && 
          youthAccessibility.trim() &&
          emergencyContactName.trim() && 
          emergencyContactPhone.trim() &&
          consentData && 
          consentAlerts && 
          consentGuidelines
        );
      case "leader":
        const titleValid = elderTitle === "other" ? elderTitleOther.trim() : elderTitle.trim();
        return Boolean(
          titleValid && 
          elderCommunity.trim() && 
          elderExperience.trim() && 
          elderAreaOfInfluence.trim() && 
          elderReference.trim() && 
          elderReferencePhone.trim()
        );
      case "ngo":
        const orgTypeValid = partnerOrgType === "other" ? partnerOrgTypeOther.trim() : partnerOrgType.trim();
        return Boolean(
          partnerDepartment.trim() && 
          orgTypeValid && 
          partnerSector.trim() && 
          partnerJobTitle.trim() && 
          partnerEmail.trim() && 
          partnerMandate.trim() && 
          partnerCoverage.trim() && 
          partnerSupervisorName.trim() && 
          partnerSupervisorContact.trim()
        );
      default:
        return true;
    }
  };

  const handleComplete = () => {
    if (!name || !selectedRole || !phone || !location || !nationalId) {
      toast({
        title: "Missing information",
        description: "Please complete the required identity fields before continuing.",
        variant: "destructive",
      });
      return;
    }

    if (!otpVerified) {
      toast({
        title: "Phone not verified",
        description: "Please verify your phone number with OTP before continuing.",
        variant: "destructive",
      });
      return;
    }

    if (!roleRequirementsMet()) {
      toast({
        title: "Role details needed",
        description: "Tell us a bit more so we can tailor your workspace.",
        variant: "destructive",
      });
      return;
    }

    const userId = Math.random().toString(36).substring(2, 9);
    const userData = {
      id: userId,
      name,
      role: selectedRole,
      location,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
      verified: selectedRole === "ngo",
      phone,
      nationalId,
      residenceProof: supportingDocument?.name,
    };

    // Save user to localStorage for login verification
    const registeredUsers = JSON.parse(localStorage.getItem('peacelink_users') || '[]');
    registeredUsers.push(userData);
    localStorage.setItem('peacelink_users', JSON.stringify(registeredUsers));

    login(userData);

    toast({
      title: "Application submitted",
      description: selectedRole === "ngo"
        ? "Your workspace unlocks once verification is complete."
        : "You now have limited access while we verify your details.",
    });
  };

  const renderRoleSpecificFields = () => {
    switch (selectedRole) {
      case "youth":
        return (
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="youth-age">Age bracket</Label>
              <Select value={youthAge} onValueChange={setYouthAge}>
                <SelectTrigger id="youth-age" className="h-12">
                  <SelectValue placeholder="Select your age" />
                </SelectTrigger>
                <SelectContent>
                  {AGE_BRACKETS.map((age) => (
                    <SelectItem key={age.value} value={age.value}>
                      {age.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="youth-role">Community role</Label>
              <Select value={youthRole} onValueChange={setYouthRole}>
                <SelectTrigger id="youth-role" className="h-12">
                  <SelectValue placeholder="What do you do?" />
                </SelectTrigger>
                <SelectContent>
                  {COMMUNITY_ROLES.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="youth-focus">What will you focus on?</Label>
              <Select value={youthFocus} onValueChange={setYouthFocus}>
                <SelectTrigger id="youth-focus" className="h-12">
                  <SelectValue placeholder="Select your focus area" />
                </SelectTrigger>
                <SelectContent>
                  {FOCUS_AREAS.map((area) => (
                    <SelectItem key={area.value} value={area.value}>
                      {area.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="youth-language">Preferred language for alerts</Label>
              <Select value={youthLanguage} onValueChange={setYouthLanguage}>
                <SelectTrigger id="youth-language" className="h-12">
                  <SelectValue placeholder="Select your preferred language" />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="youth-accessibility">Accessibility needs</Label>
              <Select value={youthAccessibility} onValueChange={setYouthAccessibility}>
                <SelectTrigger id="youth-accessibility" className="h-12">
                  <SelectValue placeholder="Select if you need assistance" />
                </SelectTrigger>
                <SelectContent>
                  {ACCESSIBILITY_NEEDS.map((need) => (
                    <SelectItem key={need.value} value={need.value}>
                      {need.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-xl border border-border bg-muted/20 p-4 space-y-3">
              <h4 className="font-semibold text-sm">Emergency Contact</h4>
              <div className="space-y-2">
                <Label htmlFor="emergency-name">Contact name</Label>
                <Input
                  id="emergency-name"
                  placeholder="Parent, guardian, or trusted person"
                  className="h-11"
                  value={emergencyContactName}
                  onChange={(e) => setEmergencyContactName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergency-phone">Contact phone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="emergency-phone"
                    placeholder="+211 ..."
                    className="h-11 pl-10"
                    value={emergencyContactPhone}
                    onChange={(e) => setEmergencyContactPhone(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="elder-referral">Elder/mentor referral (optional)</Label>
              <Input
                id="elder-referral"
                placeholder="Name of elder or mentor who can vouch for you"
                className="h-11"
                value={elderReferral}
                onChange={(e) => setElderReferral(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="id-document">National ID / Passport photo</Label>
              {idDocument ? (
                <div className="relative rounded-lg border-2 border-border bg-muted/20 overflow-hidden">
                  {idPreviewUrl ? (
                    <div className="relative group">
                      <img 
                        src={idPreviewUrl} 
                        alt="ID preview" 
                        className="w-full h-48 object-contain bg-black/5"
                      />
                      <button
                        onClick={removeIdDocument}
                        className="absolute top-2 right-2 p-2 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                        aria-label="Remove document"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="relative group p-4 flex items-center gap-3">
                      <FileText className="h-10 w-10 text-muted-foreground" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{idDocument.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(idDocument.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                      <button
                        onClick={removeIdDocument}
                        className="p-2 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Remove document"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <label
                  htmlFor="id-document"
                  className="border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-accent/5 transition-colors cursor-pointer"
                >
                  <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
                  <span className="text-sm font-medium text-primary">
                    Upload ID or Passport photo
                  </span>
                  <span className="text-xs text-muted-foreground mt-1">JPG, PNG, or PDF • Max 5MB</span>
                  <input
                    id="id-document"
                    type="file"
                    accept="image/*,.pdf"
                    className="hidden"
                    onChange={handleIdDocumentChange}
                  />
                </label>
              )}
            </div>

            <div className="rounded-xl border border-border bg-muted/20 p-4 space-y-3">
              <h4 className="font-semibold text-sm mb-3">Consent & Agreements</h4>
              <div className="flex items-start gap-3">
                <Checkbox 
                  id="consent-data" 
                  checked={consentData}
                  onCheckedChange={(checked) => setConsentData(checked as boolean)}
                  className="mt-0.5"
                />
                <Label htmlFor="consent-data" className="text-sm leading-relaxed cursor-pointer">
                  I consent to PeaceLink storing my data securely and sharing it only with verified authorities when necessary for safety.
                </Label>
              </div>
              <div className="flex items-start gap-3">
                <Checkbox 
                  id="consent-alerts" 
                  checked={consentAlerts}
                  onCheckedChange={(checked) => setConsentAlerts(checked as boolean)}
                  className="mt-0.5"
                />
                <Label htmlFor="consent-alerts" className="text-sm leading-relaxed cursor-pointer">
                  I agree to receive SMS alerts about incidents, resources, and community updates.
                </Label>
              </div>
              <div className="flex items-start gap-3">
                <Checkbox 
                  id="consent-guidelines" 
                  checked={consentGuidelines}
                  onCheckedChange={(checked) => setConsentGuidelines(checked as boolean)}
                  className="mt-0.5"
                />
                <Label htmlFor="consent-guidelines" className="text-sm leading-relaxed cursor-pointer">
                  I have read and agree to follow the <span className="text-primary font-medium">Community Guidelines</span> and use PeaceLink responsibly.
                </Label>
              </div>
            </div>
          </div>
        );
      case "leader":
        return (
          <div className="grid gap-5">
            <div className="rounded-xl border-2 border-amber-200 bg-gradient-to-br from-amber-50/80 to-orange-50/50 p-5 space-y-4">
              <h3 className="font-semibold text-base flex items-center gap-2">
                <Shield className="h-5 w-5 text-amber-700" />
                Leadership Position
              </h3>
              
              <div className="space-y-2">
                <Label htmlFor="elder-title">Leadership Role</Label>
                <Select value={elderTitle} onValueChange={setElderTitle}>
                  <SelectTrigger id="elder-title" className="h-12 bg-background">
                    <SelectValue placeholder="Select your leadership role" />
                  </SelectTrigger>
                  <SelectContent>
                    {LEADERSHIP_ROLES.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {elderTitle === "other" && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                  <Label htmlFor="elder-title-other">Specify Your Role</Label>
                  <Input
                    id="elder-title-other"
                    placeholder="Enter your leadership role"
                    className="h-11 bg-background"
                    value={elderTitleOther}
                    onChange={(e) => setElderTitleOther(e.target.value)}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="elder-experience">Years of Leadership Experience</Label>
                <Select value={elderExperience} onValueChange={setElderExperience}>
                  <SelectTrigger id="elder-experience" className="h-12 bg-background">
                    <SelectValue placeholder="How long have you served?" />
                  </SelectTrigger>
                  <SelectContent>
                    {LEADERSHIP_EXPERIENCE.map((exp) => (
                      <SelectItem key={exp.value} value={exp.value}>
                        {exp.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-xl border-2 border-border bg-gradient-to-br from-blue-50/50 to-indigo-50/30 p-5 space-y-4">
              <h3 className="font-semibold text-base flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                Community & Influence
              </h3>

              <div className="space-y-2">
                <Label htmlFor="elder-community">Community / Payam / County</Label>
                <Input
                  id="elder-community"
                  placeholder="e.g. Bor County, Kolnyang Payam"
                  className="h-11 bg-background"
                  value={elderCommunity}
                  onChange={(e) => setElderCommunity(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="elder-area">Primary Area of Influence</Label>
                <Select value={elderAreaOfInfluence} onValueChange={setElderAreaOfInfluence}>
                  <SelectTrigger id="elder-area" className="h-12 bg-background">
                    <SelectValue placeholder="What do you focus on?" />
                  </SelectTrigger>
                  <SelectContent>
                    {AREAS_OF_INFLUENCE.map((area) => (
                      <SelectItem key={area.value} value={area.value}>
                        {area.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="elder-languages">Languages Spoken</Label>
                <Input
                  id="elder-languages"
                  placeholder="e.g. Dinka, English, Juba Arabic"
                  className="h-11 bg-background"
                  value={elderLanguages}
                  onChange={(e) => setElderLanguages(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Important for mediating multi-ethnic disputes</p>
              </div>
            </div>

            <div className="rounded-xl border-2 border-border bg-gradient-to-br from-green-50/50 to-emerald-50/30 p-5 space-y-4">
              <h3 className="font-semibold text-base flex items-center gap-2">
                <BadgeCheck className="h-5 w-5 text-green-600" />
                Achievements & References
              </h3>

              <div className="space-y-2">
                <Label htmlFor="elder-achievement">Notable Achievement or Contribution</Label>
                <Textarea
                  id="elder-achievement"
                  placeholder="Describe a conflict you helped resolve, a project you led, or your impact on the community..."
                  className="min-h-[100px] resize-none bg-background"
                  value={elderAchievement}
                  onChange={(e) => setElderAchievement(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="elder-reference">Reference Name</Label>
                <Input
                  id="elder-reference"
                  placeholder="Name of commissioner, church leader, or senior elder"
                  className="h-11 bg-background"
                  value={elderReference}
                  onChange={(e) => setElderReference(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="elder-reference-phone">Reference Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="elder-reference-phone"
                    placeholder="+211 ..."
                    className="h-11 pl-10 bg-background"
                    value={elderReferencePhone}
                    onChange={(e) => setElderReferencePhone(e.target.value)}
                  />
                </div>
                <p className="text-xs text-muted-foreground">We'll verify your role through this contact</p>
              </div>
            </div>
          </div>
        );
      case "ngo":
        return (
          <div className="grid gap-5">
            <div className="rounded-xl border-2 border-slate-200 bg-gradient-to-br from-slate-50/80 to-gray-50/50 p-5 space-y-4">
              <h3 className="font-semibold text-base flex items-center gap-2">
                <Building2 className="h-5 w-5 text-slate-700" />
                Organization Information
              </h3>
              
              <div className="space-y-2">
                <Label htmlFor="partner-department">Organization / Department Name</Label>
                <Input
                  id="partner-department"
                  placeholder="e.g. Ministry of Peacebuilding, UNMISS, World Vision"
                  className="h-12 bg-background"
                  value={partnerDepartment}
                  onChange={(e) => setPartnerDepartment(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="partner-org-type">Organization Type</Label>
                <Select value={partnerOrgType} onValueChange={setPartnerOrgType}>
                  <SelectTrigger id="partner-org-type" className="h-12 bg-background">
                    <SelectValue placeholder="Select organization type" />
                  </SelectTrigger>
                  <SelectContent>
                    {ORGANIZATION_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {partnerOrgType === "other" && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                  <Label htmlFor="partner-org-type-other">Specify Organization Type</Label>
                  <Input
                    id="partner-org-type-other"
                    placeholder="Enter your organization type"
                    className="h-11 bg-background"
                    value={partnerOrgTypeOther}
                    onChange={(e) => setPartnerOrgTypeOther(e.target.value)}
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="partner-sector">Primary Sector</Label>
                  <Select value={partnerSector} onValueChange={setPartnerSector}>
                    <SelectTrigger id="partner-sector" className="h-12 bg-background">
                      <SelectValue placeholder="Sector focus" />
                    </SelectTrigger>
                    <SelectContent>
                      {SECTOR_FOCUS.map((sector) => (
                        <SelectItem key={sector.value} value={sector.value}>
                          {sector.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="partner-size">Organization Size</Label>
                  <Select value={partnerOrgSize} onValueChange={setPartnerOrgSize}>
                    <SelectTrigger id="partner-size" className="h-12 bg-background">
                      <SelectValue placeholder="Team size" />
                    </SelectTrigger>
                    <SelectContent>
                      {ORGANIZATION_SIZE.map((size) => (
                        <SelectItem key={size.value} value={size.value}>
                          {size.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="partner-registration">Registration / License Number (Optional)</Label>
                <Input
                  id="partner-registration"
                  placeholder="Official registration number"
                  className="h-11 bg-background"
                  value={partnerRegistrationNo}
                  onChange={(e) => setPartnerRegistrationNo(e.target.value)}
                />
              </div>
            </div>

            <div className="rounded-xl border-2 border-border bg-gradient-to-br from-blue-50/50 to-cyan-50/30 p-5 space-y-4">
              <h3 className="font-semibold text-base flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                Your Role & Contact
              </h3>

              <div className="space-y-2">
                <Label htmlFor="partner-job-title">Your Job Title / Position</Label>
                <Input
                  id="partner-job-title"
                  placeholder="e.g. Program Manager, Peacebuilding Officer, Director"
                  className="h-11 bg-background"
                  value={partnerJobTitle}
                  onChange={(e) => setPartnerJobTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="partner-email">Official Email Address</Label>
                <Input
                  id="partner-email"
                  type="email"
                  placeholder="name@organization.org or name@gov.ss"
                  className="h-11 bg-background"
                  value={partnerEmail}
                  onChange={(e) => setPartnerEmail(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Must be an official organizational email</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="partner-website">Organization Website (Optional)</Label>
                <Input
                  id="partner-website"
                  placeholder="https://..."
                  className="h-11 bg-background"
                  value={partnerWebsite}
                  onChange={(e) => setPartnerWebsite(e.target.value)}
                />
              </div>
            </div>

            <div className="rounded-xl border-2 border-border bg-gradient-to-br from-green-50/50 to-emerald-50/30 p-5 space-y-4">
              <h3 className="font-semibold text-base flex items-center gap-2">
                <MapPin className="h-5 w-5 text-green-600" />
                Mandate & Coverage
              </h3>

              <div className="space-y-2">
                <Label htmlFor="partner-mandate">Organizational Mandate</Label>
                <Textarea
                  id="partner-mandate"
                  placeholder="Describe your organization's mission and the type of support you provide..."
                  className="min-h-[100px] resize-none bg-background"
                  value={partnerMandate}
                  onChange={(e) => setPartnerMandate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="partner-coverage">Geographic Coverage</Label>
                <Textarea
                  id="partner-coverage"
                  placeholder="List the counties, states, payams, or bomas you serve (e.g. Jonglei State, Bor County, Unity State)"
                  className="min-h-[80px] resize-none bg-background"
                  value={partnerCoverage}
                  onChange={(e) => setPartnerCoverage(e.target.value)}
                />
              </div>
            </div>

            <div className="rounded-xl border-2 border-border bg-gradient-to-br from-purple-50/50 to-violet-50/30 p-5 space-y-4">
              <h3 className="font-semibold text-base flex items-center gap-2">
                <BadgeCheck className="h-5 w-5 text-purple-600" />
                Supervisor Verification
              </h3>

              <div className="space-y-2">
                <Label htmlFor="partner-supervisor-name">Supervisor / Director Name</Label>
                <Input
                  id="partner-supervisor-name"
                  placeholder="Name of your immediate supervisor or org director"
                  className="h-11 bg-background"
                  value={partnerSupervisorName}
                  onChange={(e) => setPartnerSupervisorName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="partner-supervisor-contact">Supervisor Contact (Email or Phone)</Label>
                <Input
                  id="partner-supervisor-contact"
                  placeholder="supervisor@org.org or +211 ..."
                  className="h-11 bg-background"
                  value={partnerSupervisorContact}
                  onChange={(e) => setPartnerSupervisorContact(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">We'll verify your role through this contact</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans flex flex-col">
      <div className="p-4 flex justify-between items-center">
        <Link href="/landing">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        {step === 2 && (
          <div className="text-xs font-medium text-muted-foreground">Step 2 of 2</div>
        )}
      </div>

      <div className="flex-1 flex flex-col px-6 pb-10 max-w-xl mx-auto w-full">
        <div className="mb-6">
          <h1 className="text-3xl font-heading font-bold mb-2">
            {step === 1 ? "Choose your role" : "Verify identity"}
          </h1>
          <p className="text-muted-foreground">
            {step === 1
              ? "Tell us how you plan to use PeaceLink so we can tailor the experience."
              : "We keep communities safe by verifying every account. These details are protected."}
          </p>
        </div>

        {step === 1 ? (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {ROLE_OPTIONS.map((role) => (
              <button
                key={role.id}
                onClick={() => handleRoleSelect(role.id)}
                className="w-full text-left group relative overflow-hidden rounded-2xl border border-border bg-card p-4 hover:border-primary/50 transition-all active:scale-[0.98] shadow-sm hover:shadow-md"
              >
                <div className="flex items-center gap-4 z-10 relative">
                  <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
                    <img src={role.image} alt={role.label} className="h-full w-full object-cover" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                      {role.label}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-snug">{role.description}</p>
                  </div>
                  <div className={cn("ml-auto p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity", role.accent)}>
                    <role.icon className="h-5 w-5" />
                  </div>
                </div>
              </button>
            ))}
            <div className="text-center pt-4">
              <Link href="/login" className="text-sm text-primary font-medium hover:underline">
                Already have an account? Login
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
            {roleInfo && (
              <div className="flex flex-col gap-4 rounded-2xl border border-secondary bg-secondary/20 p-4">
                <div className="flex items-center gap-3">
                  <div className={cn("h-12 w-12 rounded-full flex items-center justify-center", roleInfo.accent)}>
                    <roleInfo.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Signing up as</span>
                    <p className="font-bold text-lg text-foreground">{roleInfo.label}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setStep(1);
                      syncRoleQueryParam(null);
                    }}
                    className="ml-auto text-xs"
                  >
                    Change
                  </Button>
                </div>
                {selectedRoleDetails?.blurb && (
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedRoleDetails.blurb}
                  </p>
                )}
                {selectedRoleDetails?.checklist.length ? (
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {selectedRoleDetails.checklist.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <BadgeCheck className="mt-0.5 h-4 w-4 text-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            )}

            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full name (as on ID)</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    className="h-12"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nid">National ID / Passport no.</Label>
                  <div className="relative">
                    <IdCard className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="nid"
                      placeholder="ID number"
                      className="h-12 pl-10"
                      value={nationalId}
                      onChange={(e) => setNationalId(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Residence location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="e.g. Juba, Munuki Block C"
                    className="h-12 pl-10"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone number (for OTP verification)</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="phone"
                      placeholder="+211 ..."
                      className="h-12 pl-10"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        setOtpSent(false);
                        setOtpVerified(false);
                      }}
                      disabled={otpVerified}
                    />
                  </div>
                  {!otpVerified && (
                    <Button
                      type="button"
                      onClick={sendOtp}
                      disabled={!phone || phone.length < 10 || (otpSent && otpTimer > 0) || isResending}
                      className="h-12 px-6 font-semibold"
                    >
                      {isResending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : otpSent && otpTimer > 0 ? (
                        `${otpTimer}s`
                      ) : (
                        "Send OTP"
                      )}
                    </Button>
                  )}
                  {otpVerified && (
                    <div className="h-12 px-4 bg-green-100 text-green-700 rounded-lg flex items-center gap-2 font-medium">
                      <Check className="h-5 w-5" />
                      Verified
                    </div>
                  )}
                </div>
                
                {otpSent && !otpVerified && (
                  <div className="mt-3 p-4 rounded-xl border-2 border-primary/20 bg-primary/5 space-y-3 animate-in fade-in slide-in-from-top-2">
                    <p className="text-sm font-medium text-foreground">Enter the 6-digit code sent to {phone}</p>
                    <div className="flex gap-2">
                      <Input
                        placeholder="000000"
                        className="h-11 text-center text-lg font-mono tracking-widest"
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      />
                      <Button
                        type="button"
                        onClick={verifyOtp}
                        disabled={otp.length !== 6}
                        className="h-11 px-6 font-semibold"
                      >
                        Verify
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Didn't receive it? {otpTimer > 0 ? `Resend in ${otpTimer}s` : (
                        <button 
                          onClick={sendOtp} 
                          className="text-primary font-medium hover:underline"
                          type="button"
                        >
                          Resend OTP
                        </button>
                      )}
                    </p>
                  </div>
                )}
              </div>

              {renderRoleSpecificFields()}

              <div className="space-y-2">
                <Label htmlFor="support-doc">Supporting document (optional)</Label>
                {supportingDocument ? (
                  <div className="relative rounded-lg border-2 border-border bg-muted/20 overflow-hidden">
                    {documentPreviewUrl ? (
                      <div className="relative group">
                        <img 
                          src={documentPreviewUrl} 
                          alt="Document preview" 
                          className="w-full h-48 object-contain bg-black/5"
                        />
                        <button
                          onClick={removeDocument}
                          className="absolute top-2 right-2 p-2 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                          aria-label="Remove document"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="relative group p-4 flex items-center gap-3">
                        <FileText className="h-10 w-10 text-muted-foreground" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{supportingDocument.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(supportingDocument.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                        <button
                          onClick={removeDocument}
                          className="p-2 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label="Remove document"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <label
                    htmlFor="support-doc"
                    className="border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-accent/5 transition-colors cursor-pointer"
                  >
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <span className="text-sm font-medium text-primary">
                      Tap to upload PDF or image
                    </span>
                    <span className="text-xs text-muted-foreground mt-1">Max 5MB • JPG, PNG or PDF</span>
                    <input
                      id="support-doc"
                      type="file"
                      accept="image/*,.pdf"
                      className="hidden"
                      onChange={handleDocumentChange}
                    />
                  </label>
                )}
              </div>
            </div>

            <Button
              onClick={handleComplete}
              className="w-full h-16 text-lg font-bold rounded-xl mt-4 shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Submit for verification <Check className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
