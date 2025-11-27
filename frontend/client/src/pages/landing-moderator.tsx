import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  Languages,
  ShieldHalf,
  ListChecks,
  Split,
} from "lucide-react";

const highlights = [
  {
    title: "Unified moderation queue",
    description:
      "Review incident reports, forum posts, and resource updates from one triage board with SLA timers.",
    icon: ListChecks,
  },
  {
    title: "Translation workspace",
    description:
      "Assign translations, reuse memory, and flag content that needs cultural review.",
    icon: Languages,
  },
  {
    title: "Trust and safety controls",
    description:
      "Auto-hide harmful content, tag elder endorsements, and elevate urgent items to admins.",
    icon: ShieldHalf,
  },
];

const workflow = [
  "Filter queues by region, language, or verification status for faster assignments.",
  "Respond with localized templates so authors understand what to fix or celebrate.",
  "See heat maps of alerts and high-risk tags to plan moderator staffing.",
];

const support = [
  "Keyboard shortcuts and offline draft notes keep you productive on limited bandwidth.",
  "Audit-ready logs capture every decision with justifications and timestamps.",
  "Escalation ladder connects moderators, elders, and admins in one tap.",
];

export default function ModeratorLanding() {
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
            Moderator login
          </Button>
        </Link>
      </header>

      <section className="relative overflow-hidden rounded-b-[3rem] bg-gradient-to-br from-emerald-700 via-emerald-600 to-slate-900 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_55%)]" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 space-y-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest">
            Guardians of community safety
          </span>
          <h1 className="text-4xl md:text-6xl font-heading font-black leading-tight drop-shadow-md">
            Moderate with confidence, context, and care.
          </h1>
          <p className="mx-auto max-w-3xl text-lg md:text-xl text-white/90 leading-relaxed">
            PeaceLink equips moderators with automation, translation tools, and trust signals so every community voice is heard responsibly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup?role=moderator">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-white/90 h-14 px-8 rounded-2xl font-bold shadow-xl">
                Join the Moderator Team <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/moderation">
              <Button size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/15 h-14 px-8 rounded-2xl font-bold">
                Preview Queue View
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
                className="group rounded-3xl border border-emerald-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600/10 text-emerald-700">
                  <item.icon className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-heading font-bold text-emerald-700 mb-2">
                  {item.title}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <section className="rounded-3xl border border-emerald-200 bg-white/90 p-8 shadow-sm">
            <div className="flex items-start gap-3">
              <Eye className="mt-1 h-6 w-6 text-emerald-700" />
              <div>
                <h3 className="text-2xl font-heading font-bold text-emerald-800">Designed for fast, fair decisions</h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-600">
                  {workflow.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span className="mt-1 block h-2 w-2 rounded-full bg-emerald-600" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-emerald-200 bg-emerald-700/15 p-8">
            <h3 className="text-xl font-heading font-bold text-emerald-800 mb-4 flex items-center gap-2">
              <Split className="h-5 w-5" /> Backed by resilient tooling
            </h3>
            <ul className="space-y-3 text-sm text-slate-700">
              {support.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <span className="mt-1 block h-2 w-2 rounded-full bg-emerald-600" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>

      <footer className="px-6 pb-10 text-center text-xs text-muted-foreground">
        Moderators keep PeaceLink safe, multilingual, and welcoming.
      </footer>
    </div>
  );
}
