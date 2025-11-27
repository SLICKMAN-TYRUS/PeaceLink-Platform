import { BottomNav, Header } from "@/components/layout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Camera, MapPin, Loader2, Mic, Info, X, FileAudio, Play, Square, Pause, Users, Link, FileText, Phone } from "lucide-react";
import { useState, useRef } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";

const formSchema = z.object({
  category: z.string().min(1, "Please select a category"),
  location: z.string().min(2, "Location is required"),
  description: z.string().min(10, "Please provide more details"),
  language: z.string().min(1, "Please select a language"),
  incidentDate: z.string().optional(),
  urgency: z.string().optional(),
  anonymousReport: z.boolean().default(false),
  peopleAffected: z.string().optional(),
  nearestLandmark: z.string().optional(),
  contactPreference: z.string().optional(),
  contactNumber: z.string().optional(),
  relatedReportId: z.string().optional(),
});

export default function Report() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioURL, setAudioURL] = useState<string>("");
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      location: "",
      description: "",
      language: "en",
      incidentDate: "",
      urgency: "medium",
      anonymousReport: false,
      peopleAffected: "",
      nearestLandmark: "",
      contactPreference: "phone",
      contactNumber: "",
      relatedReportId: "",
    },
  });

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioBlob(audioBlob);
        setAudioURL(audioUrl);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (error) {
      toast({
        title: "Microphone Access Denied",
        description: "Please allow microphone access to record audio.",
        variant: "destructive",
      });
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "paused") {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const deleteAudio = () => {
    setAudioBlob(null);
    setAudioURL("");
    setRecordingTime(0);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    setFilePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to submit a report.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    api.createReport(values, uploadedFiles, audioBlob || undefined)
      .then((response) => {
        toast({
          title: "Report Submitted Successfully",
          description: "Your report has been submitted for review by moderators.",
        });
        form.reset();
        setUploadedFiles([]);
        setFilePreviews([]);
        deleteAudio();
      })
      .catch((error) => {
        console.error('Failed to submit report:', error);
        toast({
          title: "Submission Failed",
          description: "Could not submit your report. Please try again.",
          variant: "destructive",
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <div className="mobile-container pb-20 bg-gradient-to-br from-background via-background to-primary/5">
      <Header title="Report Issue" />
      
      <main className="p-4 space-y-4">
        <Alert className="mb-6 bg-gradient-to-r from-blue-50 to-blue-100/50 border-blue-200 text-blue-900 shadow-sm">
           <Info className="h-4 w-4 text-blue-600" />
           <AlertTitle className="font-bold">Moderation Process</AlertTitle>
           <AlertDescription className="text-xs">
             All reports are verified by community elders or moderators before becoming public to ensure safety and accuracy.
           </AlertDescription>
        </Alert>

        <div className="bg-card p-6 rounded-2xl border-2 border-border shadow-lg">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="rounded-xl border-2 border-border bg-gradient-to-br from-accent/30 to-accent/10 p-5 space-y-4">
                <h3 className="font-semibold text-base flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary" />
                  Basic Information
                </h3>
                
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Language / Duong</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-background">
                          <SelectValue placeholder="Select your language" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="en">🇬🇧 English</SelectItem>
                        <SelectItem value="ar">🇸🇩 Arabic / عربي</SelectItem>
                        <SelectItem value="dik">Dinka / Thuɔŋjäŋ</SelectItem>
                        <SelectItem value="juba">Juba Arabic</SelectItem>
                        <SelectItem value="nuer">Nuer / Thok Naath</SelectItem>
                        <SelectItem value="shiluk">Shiluk / Dhøcøllø</SelectItem>
                        <SelectItem value="bari">Bari / Kutuk na Bari</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Issue Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-background">
                          <SelectValue placeholder="What type of issue?" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="conflict">Conflict / Dispute</SelectItem>
                        <SelectItem value="infrastructure">Infrastructure</SelectItem>
                        <SelectItem value="health">Health / Sanitation</SelectItem>
                        <SelectItem value="security">Security Concern</SelectItem>
                        <SelectItem value="livelihoods">Livelihoods / Employment</SelectItem>
                        <SelectItem value="education">Education / School Issues</SelectItem>
                        <SelectItem value="environment">Environment / Water Access</SelectItem>
                        <SelectItem value="gender">Gender-Based Violence</SelectItem>
                        <SelectItem value="resources">Resource Access / Aid</SelectItem>
                        <SelectItem value="alerts">Emergency / Alerts</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              </div>

              <div className="rounded-xl border-2 border-border bg-gradient-to-br from-orange-50/50 to-amber-50/30 p-5 space-y-4">
                <h3 className="font-semibold text-base flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-orange-600" />
                  Location & Timing
                </h3>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="incidentDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>When did this happen?</FormLabel>
                      <FormControl>
                        <Input type="date" className="bg-background" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="urgency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Urgency</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-background">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="critical">🔴 Critical</SelectItem>
                          <SelectItem value="high">🟠 High</SelectItem>
                          <SelectItem value="medium">🟡 Medium</SelectItem>
                          <SelectItem value="low">🟢 Low</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="e.g. Market Road, Bor" className="pl-9 bg-background" {...field} />
                        <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1 h-8 w-8">
                           <MapPin className="h-4 w-4 text-primary" />
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <Textarea 
                          placeholder="Describe what you observed..." 
                          className="min-h-[100px] bg-background"
                          {...field} 
                        />
                        
                        {/* Voice Recording Section */}
                        <div className="border-2 border-dashed rounded-lg p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <FileAudio className="h-5 w-5 text-muted-foreground" />
                              <span className="text-sm font-medium">Voice Recording</span>
                              {form.watch("language") && (
                                <Badge variant="secondary" className="text-xs">
                                  {form.watch("language").toUpperCase()}
                                </Badge>
                              )}
                            </div>
                            {recordingTime > 0 && (
                              <span className="text-sm font-mono text-muted-foreground">
                                {formatTime(recordingTime)}
                              </span>
                            )}
                          </div>
                          
                          {!isRecording && !audioURL && (
                            <Button 
                              type="button" 
                              onClick={startRecording}
                              variant="outline"
                              className="w-full"
                              disabled={!form.watch("language")}
                            >
                              <Mic className="mr-2 h-4 w-4" />
                              {form.watch("language") ? "Start Recording" : "Select Language First"}
                            </Button>
                          )}

                          {isRecording && (
                            <div className="flex gap-2">
                              {!isPaused ? (
                                <Button 
                                  type="button" 
                                  onClick={pauseRecording}
                                  variant="outline"
                                  className="flex-1"
                                >
                                  <Pause className="mr-2 h-4 w-4" />
                                  Pause
                                </Button>
                              ) : (
                                <Button 
                                  type="button" 
                                  onClick={resumeRecording}
                                  variant="outline"
                                  className="flex-1"
                                >
                                  <Play className="mr-2 h-4 w-4" />
                                  Resume
                                </Button>
                              )}
                              <Button 
                                type="button" 
                                onClick={stopRecording}
                                variant="destructive"
                                className="flex-1"
                              >
                                <Square className="mr-2 h-4 w-4" />
                                Stop
                              </Button>
                            </div>
                          )}

                          {audioURL && (
                            <div className="space-y-2">
                              <audio src={audioURL} controls className="w-full" />
                              <Button 
                                type="button" 
                                onClick={deleteAudio}
                                variant="ghost"
                                size="sm"
                                className="w-full text-destructive"
                              >
                                <X className="mr-2 h-4 w-4" />
                                Delete Recording
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nearestLandmark"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nearest Landmark (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Near the water tower, behind school" className="bg-background" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              </div>

              <FormField
                control={form.control}
                name="peopleAffected"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>People Affected (Approximate)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Users className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="number" placeholder="0" min="0" className="pl-9 bg-background" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="rounded-xl border-2 border-border bg-gradient-to-br from-primary/5 to-primary/10 p-5 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Phone className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-base">Contact Information</h3>
                </div>
                
                <FormField
                  control={form.control}
                  name="contactPreference"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Contact Method</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-background">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="phone">📞 Phone Call</SelectItem>
                          <SelectItem value="whatsapp">💬 WhatsApp</SelectItem>
                          <SelectItem value="in-person">🤝 In-Person</SelectItem>
                          <SelectItem value="none">🚫 Do Not Contact</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.watch("contactPreference") !== "none" && form.watch("contactPreference") !== "in-person" && (
                  <FormField
                    control={form.control}
                    name="contactNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {form.watch("contactPreference") === "whatsapp" ? "WhatsApp Number" : "Phone Number"}
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input 
                              placeholder="+211 ..." 
                              className="pl-9 bg-background" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                
                {!form.watch("anonymousReport") && (
                  <p className="text-xs text-muted-foreground mt-2">
                    💡 We'll only contact you for critical updates or to clarify details
                  </p>
                )}
              </div>

              <FormField
                control={form.control}
                name="relatedReportId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Related Report ID (Optional)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Link className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="If this connects to a previous report" className="pl-9" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-2 space-y-3">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*,video/*"
                  multiple
                  className="hidden"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-dashed border-2 h-24 flex flex-col gap-2 hover:bg-accent/5"
                >
                  <Camera className="h-6 w-6 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Add Photo / Video Evidence</span>
                </Button>

                {uploadedFiles.length > 0 && (
                  <div className="grid grid-cols-2 gap-3">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square rounded-lg overflow-hidden border-2 border-border bg-muted">
                          {file.type.startsWith('image/') ? (
                            <img 
                              src={filePreviews[index]} 
                              alt={file.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <video 
                              src={filePreviews[index]} 
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeFile(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                        <span className="absolute bottom-1 left-1 right-1 text-[10px] bg-black/50 text-white px-1 py-0.5 rounded truncate">
                          {file.name}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <FormField
                control={form.control}
                name="anonymousReport"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-xl border-2 border-border p-4 bg-gradient-to-r from-slate-50 to-slate-100/50">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="cursor-pointer font-semibold">
                        Submit Anonymously
                      </FormLabel>
                      <p className="text-xs text-muted-foreground">
                        Your identity will be hidden from the public but visible to moderators for verification.
                      </p>
                    </div>
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full mt-6 h-14 text-lg font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all" 
                size="lg" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit for Review"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
