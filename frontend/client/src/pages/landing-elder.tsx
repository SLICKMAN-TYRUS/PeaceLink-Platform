import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  Mic,
  Users,
  ShieldCheck,
  BookOpen,
  Waves,
  Heart,
  MessageSquare,
  Scale,
  Lightbulb,
  Crown,
  Feather,
} from "lucide-react";

const highlights = [
  {
    title: "Voice-First Mediation Tools",
    description:
      "Record verbal guidance, approve reports with voice commands, and moderate forums with audio-first workflows designed for community elders. Your wisdom guides every conversation.",
    icon: Mic,
  },
  {
    title: "Youth Mentorship Dashboard",
    description:
      "Track youth peacebuilders you mentor, endorse their reports, assign helpers, and provide guidance through every step of their journey. Build the next generation of leaders.",
    icon: Users,
  },
  {
    title: "Cultural Preservation Center",
    description:
      "Share traditional conflict resolution practices, document cultural knowledge, and ensure modern peacebuilding respects ancestral wisdom. Your heritage shapes our future.",
    icon: BookOpen,
  },
];

const workflows = [
  {
    icon: Scale,
    title: "Conflict Mediation Workflow",
    description:
      "Review incident reports flagged for elder attention. Use voice notes to provide context, approve community responses, or escalate to partner organizations. All actions are logged with your endorsement seal.",
  },
  {
    icon: MessageSquare,
    title: "Forum Moderation Suite",
    description:
      "Pause heated discussions, highlight constructive dialogue, and assign youth helpers to organize in-person follow-ups. SMS templates help you respond quickly in multiple languages.",
  },
  {
    icon: Lightbulb,
    title: "Resource Validation",
    description:
      "Review and endorse resources before youth access them. Flag culturally sensitive content, suggest local alternatives, and ensure all guidance aligns with community values.",
  },
];

const support = [
  "🎙️ Audio-first navigation—no reading required for core workflows",
  "📞 SMS templates in 7+ South Sudanese languages with translation memory",
  "👥 Assign trusted youth helpers to assist with in-person follow-ups",
  "🌍 Area-of-influence filters show only reports from your payam or county",
  "📜 Automatic transcription of voice guidance for audit and transparency",
  "🛡️ Safety filters hide harmful content while preserving elder oversight",
];

const testimonials = [
  {
    quote: "As an elder, I can now guide youth conflict resolution from my boma without traveling to offices. My voice recordings reach the right people at the right time.",
    author: "Chief Joseph K.",
    location: "Torit County",
  },
  {
    quote: "I've mentored 12 youth peacebuilders this year. Seeing their reports get resolved because of our guidance makes every conversation worthwhile.",
    author: "Mama Rebecca D.",
    location: "Yambio",
  },
];

export default function ElderLanding() {
  return (
    <div className="min-h-screen bg-background font-sans flex flex-col">
      <header className="w-full px-6 pt-6 flex items-center justify-between max-w-6xl mx-auto">
        <Link href="/landing">
          <Button variant="ghost" className="gap-2 text-white/90 hover:text-white hover:bg-white/10">
            <ArrowLeft className="h-4 w-4" /> Back to Overview
          </Button>
        </Link>
        <Link href="/login">
          <Button variant="ghost" className="hidden md:inline-flex text-white/90 hover:text-white hover:bg-white/10">
            Log in
          </Button>
        </Link>
      </header>

      <section className="relative overflow-hidden rounded-b-[3rem] bg-gradient-to-br from-amber-600 via-orange-500 to-amber-700 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.25),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.15),_transparent_50%)]" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-28 space-y-12 text-center">
          <div className="animate-in fade-in slide-in-from-top-4 duration-700">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/15 backdrop-blur-sm px-5 py-2 text-sm font-bold uppercase tracking-wider shadow-lg">
              <Crown className="h-5 w-5" /> Custodians of Community Trust
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-black leading-tight drop-shadow-2xl animate-in fade-in slide-in-from-top-6 duration-700 delay-100">
            Guide Every Voice <br />with Your Wisdom
          </h1>
          <p className="mx-auto max-w-3xl text-xl md:text-2xl text-white/95 leading-relaxed font-medium animate-in fade-in slide-in-from-top-8 duration-700 delay-200">
            PeaceLink empowers community elders to mediate conflicts, mentor youth peacebuilders, preserve cultural knowledge, and ensure every voice is heard responsibly.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <Link href="/signup?role=elder" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-white text-amber-700 hover:bg-amber-50 h-16 px-10 rounded-2xl font-bold shadow-2xl text-lg transition-all hover:scale-105">
                Join as Elder Leader <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </Link>
            <Link href="/forums" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-white/70 text-white hover:bg-white/20 hover:border-white h-16 px-10 rounded-2xl font-bold text-lg backdrop-blur-sm transition-all hover:scale-105">
                Explore Community Forums
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <main className="flex-1 px-6 py-20">
        <div className="max-w-6xl mx-auto space-y-20">
          {/* Main Highlights */}
          <div className="grid gap-8 md:grid-cols-3">
            {highlights.map((item, idx) => (
              <div
                key={item.title}
                className="group rounded-3xl border-2 border-amber-100 bg-gradient-to-br from-white via-amber-50/50 to-white p-8 shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl hover:border-amber-300 animate-in fade-in slide-in-from-bottom-4 duration-500"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-600 to-orange-600 text-white shadow-lg group-hover:scale-110 transition-transform">
                  <item.icon className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-heading font-bold text-amber-900 mb-3">
                  {item.title}
                </h2>
                <p className="text-base text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Workflows Section */}
          <section className="rounded-4xl border-2 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-10 md:p-14 shadow-xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-700 to-orange-600 mb-4">
                Your Stewardship Workflows
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                PeaceLink adapts to how elders work—voice-first, mobile-friendly, and deeply respectful of traditional wisdom.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {workflows.map((item) => (
                <div key={item.title} className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-white/80 shadow-md">
                  <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-600 to-amber-600 text-white shadow-lg">
                    <item.icon className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Support Features */}
          <section className="rounded-3xl border-2 border-slate-200 bg-white p-10 md:p-12 shadow-lg">
            <div className="flex items-start gap-6 mb-8">
              <div className="inline-flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-600 to-orange-600 text-white shadow-md">
                <Waves className="h-7 w-7" />
              </div>
              <div>
                <h2 className="text-3xl font-heading font-bold text-slate-900 mb-2">
                  Built for Elder Leadership
                </h2>
                <p className="text-slate-600">
                  Features designed to honor your role and make your wisdom accessible to everyone.
                </p>
              </div>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {support.map((feature, i) => (
                <div key={i} className="flex gap-4 items-start p-5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 hover:shadow-md transition-shadow">
                  <span className="mt-0.5 text-2xl">{feature.split(' ')[0]}</span>
                  <p className="text-sm text-slate-700 leading-relaxed font-medium">
                    {feature.split(' ').slice(1).join(' ')}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Cultural Preservation Callout */}
          <section className="rounded-4xl border-2 border-amber-200 bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-100 p-10 md:p-12 shadow-lg">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center text-white shadow-xl">
                  <Feather className="h-12 w-12" />
                </div>
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-heading font-bold text-amber-900 mb-3">
                  Preserve Cultural Wisdom
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-5">
                  Your traditional conflict resolution practices and cultural knowledge shape how PeaceLink operates. Document ancestral wisdom, share oral histories, and ensure modern tools respect timeless values.
                </p>
                <Link href="/resources" className="inline-block">
                  <Button variant="outline" className="w-full sm:w-auto border-2 border-amber-700 text-amber-700 hover:bg-amber-700 hover:text-white font-bold">
                    Explore Cultural Repository
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-heading font-bold text-slate-900 mb-3">
                Voices of Elder Leaders
              </h2>
              <p className="text-lg text-slate-600">
                Trusted community elders share their PeaceLink experiences.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {testimonials.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl border-2 border-amber-200 bg-gradient-to-br from-white to-amber-50 p-8 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <Heart className="h-10 w-10 text-amber-600 mb-4" />
                  <p className="text-lg text-slate-700 leading-relaxed mb-6 italic">
                    "{item.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center text-white font-bold text-lg">
                      {item.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{item.author}</p>
                      <p className="text-sm text-slate-600">{item.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="rounded-4xl bg-gradient-to-br from-amber-600 via-orange-600 to-amber-700 text-white p-12 md:p-16 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.15),_transparent_70%)]" />
            <div className="relative z-10 space-y-6">
              <h2 className="text-4xl md:text-5xl font-heading font-black leading-tight">
                Your Wisdom Shapes Our Future
              </h2>
              <p className="text-xl text-white/95 max-w-2xl mx-auto">
                Join PeaceLink as an elder leader and ensure every community voice receives the guidance and respect it deserves.
              </p>
              <Link href="/signup?role=elder" className="inline-block">
                <Button size="lg" className="w-full sm:w-auto bg-white text-amber-700 hover:bg-amber-50 h-16 px-12 rounded-2xl font-bold text-lg shadow-2xl transition-all hover:scale-105">
                  Register as Elder Leader <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </main>

      <footer className="w-full px-6 py-10 text-center text-sm text-slate-500 bg-slate-50 border-t">
        <p className="font-medium">Elders keep PeaceLink grounded in wisdom • PeaceLink Platform © 2024</p>
        <p className="mt-2">Honoring ancestral knowledge while building lasting peace</p>
      </footer>
    </div>
  );
}
