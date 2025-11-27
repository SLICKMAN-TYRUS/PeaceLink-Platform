import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  MapPin,
  Shield,
  Radio,
  Sparkles,
  Users,
  TrendingUp,
  Heart,
  BookOpen,
  Megaphone,
  Star,
} from "lucide-react";

const highlights = [
  {
    title: "Your Voice, Your Power",
    description:
      "Report incidents via voice, text, or SMS—anonymously or with your name. Track your reports in real-time from submission to resolution with complete transparency.",
    icon: Megaphone,
  },
  {
    title: "Connect & Collaborate",
    description:
      "Join youth-led forums moderated by trusted elders. Share ideas, find allies, organize peace initiatives, and shape solutions with peers across South Sudan.",
    icon: Users,
  },
  {
    title: "Resources That Matter",
    description:
      "Access verified legal guides, mental health support, job opportunities, and peacebuilding workshops—all vetted by community partners and available in your language.",
    icon: BookOpen,
  },
];

const impact = [
  {
    icon: TrendingUp,
    title: "Track Your Impact",
    description:
      "See how your reports drive change: view status updates, community responses, and resolution timelines. Every voice counts—watch your contributions make a difference.",
  },
  {
    icon: Heart,
    title: "Safe & Supported",
    description:
      "Your safety is our priority. Benefit from elder-moderated spaces, anonymous reporting options, and direct connections to verified support services when you need them most.",
  },
  {
    icon: Star,
    title: "Build Your Profile",
    description:
      "Earn trust badges for active participation, help others find resources, and become a recognized peacebuilder in your Boma. Your contributions shape your community's future.",
  },
];

const features = [
  "🔔 Real-time SMS alerts in your language about issues affecting your community",
  "📊 Personal dashboard showing your reports, forum activity, and community impact",
  "🎙️ Voice-to-text reporting for when typing isn't convenient or safe",
  "🔍 Search resources by topic, location, or language with instant results",
  "👥 Connect with youth mentors and elder advisors for guidance and support",
  "📱 Works offline with SMS fallback—no smartphone or Wi-Fi required",
];

const testimonials = [
  {
    quote: "I reported a conflict brewing in our area. Within 24 hours, elders reached out and helped mediate before it escalated. PeaceLink saved lives.",
    author: "David M.",
    location: "Juba",
  },
  {
    quote: "The forum helped me find other youth working on education access. Together we organized workshops that reached 200+ kids in our payam.",
    author: "Grace A.",
    location: "Yei",
  },
];

export default function YouthLanding() {
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

      <section className="relative overflow-hidden rounded-b-[3rem] bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.2),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.15),_transparent_50%)]" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-28 space-y-12 text-center">
          <div className="animate-in fade-in slide-in-from-top-4 duration-700">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/15 backdrop-blur-sm px-5 py-2 text-sm font-bold uppercase tracking-wider shadow-lg">
              <Sparkles className="h-5 w-5" /> Youth Changemakers
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-black leading-tight drop-shadow-2xl animate-in fade-in slide-in-from-top-6 duration-700 delay-100">
            Your Voice. <br />Your Community. <br />Your Peace.
          </h1>
          <p className="mx-auto max-w-3xl text-xl md:text-2xl text-white/95 leading-relaxed font-medium animate-in fade-in slide-in-from-top-8 duration-700 delay-200">
            PeaceLink empowers South Sudanese youth to report safely, connect with trusted leaders, track real impact, and access resources that transform communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <Link href="/signup?role=youth" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-white text-blue-600 hover:bg-blue-50 h-16 px-10 rounded-2xl font-bold shadow-2xl text-lg transition-all hover:scale-105">
                Start Building Peace <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </Link>
            <Link href="/report" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-white/70 text-white hover:bg-white/20 hover:border-white h-16 px-10 rounded-2xl font-bold text-lg backdrop-blur-sm transition-all hover:scale-105">
                Submit Your First Report
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
                className="group rounded-3xl border-2 border-blue-100 bg-gradient-to-br from-white via-blue-50/50 to-white p-8 shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl hover:border-blue-300 animate-in fade-in slide-in-from-bottom-4 duration-500"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg group-hover:scale-110 transition-transform">
                  <item.icon className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-heading font-bold text-blue-900 mb-3">
                  {item.title}
                </h2>
                <p className="text-base text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Impact Section */}
          <section className="rounded-4xl border-2 bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 p-10 md:p-14 shadow-xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
                How You Make an Impact
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Every action you take on PeaceLink contributes to a safer, more connected South Sudan.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {impact.map((item) => (
                <div key={item.title} className="flex flex-col items-center text-center space-y-4">
                  <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-lg">
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

          {/* Features List */}
          <section className="rounded-3xl border-2 border-slate-200 bg-white p-10 md:p-12 shadow-lg">
            <div className="flex items-start gap-6 mb-8">
              <div className="inline-flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md">
                <Radio className="h-7 w-7" />
              </div>
              <div>
                <h2 className="text-3xl font-heading font-bold text-slate-900 mb-2">
                  Everything You Need to Lead Change
                </h2>
                <p className="text-slate-600">
                  PeaceLink provides powerful tools designed specifically for youth changemakers.
                </p>
              </div>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {features.map((feature, i) => (
                <div key={i} className="flex gap-4 items-start p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 hover:shadow-md transition-shadow">
                  <span className="mt-0.5 text-2xl">{feature.split(' ')[0]}</span>
                  <p className="text-sm text-slate-700 leading-relaxed font-medium">
                    {feature.split(' ').slice(1).join(' ')}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Testimonials */}
          <section className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-heading font-bold text-slate-900 mb-3">
                Stories from Youth Peacebuilders
              </h2>
              <p className="text-lg text-slate-600">
                Real impact from young people using PeaceLink every day.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {testimonials.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl border-2 border-purple-200 bg-gradient-to-br from-white to-purple-50 p-8 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <MessageCircle className="h-10 w-10 text-purple-600 mb-4" />
                  <p className="text-lg text-slate-700 leading-relaxed mb-6 italic">
                    "{item.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
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
          <section className="rounded-4xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white p-12 md:p-16 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1),_transparent_70%)]" />
            <div className="relative z-10 space-y-6">
              <h2 className="text-4xl md:text-5xl font-heading font-black leading-tight">
                Ready to Make Your Mark?
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Join thousands of South Sudanese youth building peace, one voice at a time.
              </p>
              <Link href="/signup?role=youth" className="inline-block">
                <Button size="lg" className="w-full sm:w-auto bg-white text-blue-600 hover:bg-blue-50 h-16 px-12 rounded-2xl font-bold text-lg shadow-2xl transition-all hover:scale-105">
                  Join PeaceLink Today <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </main>

      <footer className="w-full px-6 py-10 text-center text-sm text-slate-500 bg-slate-50 border-t">
        <p className="font-medium">Built with youth at the heart • PeaceLink Platform © 2024</p>
        <p className="mt-2">Empowering communities across South Sudan</p>
      </footer>
    </div>
  );
}
