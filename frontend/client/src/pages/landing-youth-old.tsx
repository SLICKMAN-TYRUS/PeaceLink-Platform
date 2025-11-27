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
} from "lucide-react";

const highlights = [
  {
    title: "Instant Reporting",
    description:
      "Capture issues with photos, voice notes, or quick text – even when you are offline.",
    icon: MapPin,
  },
  {
    title: "Safe Dialogues",
    description:
      "Join moderated forums with elders and peers to co-create solutions that stick.",
    icon: MessageCircle,
  },
  {
    title: "Verified Support",
    description:
      "See which partners and elders have endorsed your report for quick follow-up.",
    icon: Shield,
  },
];

const journey = [
  "Submit a report with voice or text and track it through review to resolution.",
  "Stay informed with localized alerts, translated into the language you choose.",
  "Build your impact record – earn trust badges when elders endorse your actions.",
];

const assistance = [
  "Youth resource hub with job leads, wellness guides, and civic education modules.",
  "Audio explainers for low-data situations and offline-first saving of everything you read.",
  "SMS fallback so friends without smartphones still get notified when plans change.",
];

export default function YouthLanding() {
  return (
    <div className="min-h-screen bg-background font-sans flex flex-col">
      <header className="w-full px-6 pt-6 flex items-center justify-between max-w-6xl mx-auto">
        <Link href="/landing">
          <Button variant="ghost" className="gap-2 text-white/90 hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Back to Overview
          </Button>
        </Link>
        <Link href="/login">
          <Button variant="ghost" className="hidden md:inline-flex text-white/90 hover:text-white">
            Already joined? Login
          </Button>
        </Link>
      </header>

      <section className="relative overflow-hidden rounded-b-[3rem] bg-gradient-to-br from-primary via-primary/90 to-primary/70 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_55%)]" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 space-y-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="h-3 w-3" /> For Youth Changemakers
          </span>
          <h1 className="text-4xl md:text-6xl font-heading font-black leading-tight drop-shadow-md">
            Raise your voice. Build peace in your boma.
          </h1>
          <p className="mx-auto max-w-3xl text-lg md:text-xl text-white/85 leading-relaxed">
            PeaceLink keeps your reports safe, your discussions constructive, and your community connected – even when the network drops or languages shift.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup?role=youth">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 h-14 px-8 rounded-2xl font-bold shadow-xl">
                Sign up as Youth <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/forums">
              <Button size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/15 h-14 px-8 rounded-2xl font-bold">
                Explore Peace Talks
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <main className="flex-1 px-6 py-16">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="grid gap-6 md:grid-cols-3">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="group rounded-3xl border border-primary/15 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <item.icon className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-heading font-bold text-primary-foreground/90 mb-2">
                  {item.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <section className="rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-sm">
            <div className="flex items-start gap-3">
              <Radio className="mt-1 h-6 w-6 text-primary" />
              <div>
                <h3 className="text-2xl font-heading font-bold text-slate-900">How PeaceLink supports your journey</h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-600">
                  {journey.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span className="mt-1 block h-2 w-2 rounded-full bg-primary/70" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-slate-50/70 p-8">
            <h3 className="text-xl font-heading font-bold text-slate-900 mb-4">Always-on assistance</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              {assistance.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <span className="mt-1 block h-2 w-2 rounded-full bg-primary" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>

      <footer className="px-6 pb-10 text-center text-xs text-muted-foreground">
        Built with youth at the heart of every decision.
      </footer>
    </div>
  );
}
