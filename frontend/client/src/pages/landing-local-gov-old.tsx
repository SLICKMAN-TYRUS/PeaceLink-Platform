import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  BarChart3,
  FileSpreadsheet,
  BellRing,
  ShieldAlert,
} from "lucide-react";

const highlights = [
  {
    title: "Single view of local risk",
    description:
      "See real-time heat maps of disputes, infrastructure breakdowns, and humanitarian needs across your counties.",
    icon: BarChart3,
  },
  {
    title: "Evidence-ready exports",
    description:
      "Download CSV snapshots or partner-ready briefs that redact personal identifiers by default.",
    icon: FileSpreadsheet,
  },
  {
    title: "Coordinated alerts",
    description:
      "Publish trusted announcements across SMS, WhatsApp, and push channels in the language each area expects.",
    icon: BellRing,
  },
];

const actions = [
  "Approve local partners and track response commitments from a single dashboard.",
  "Benchmark time-to-review for incidents and assign moderators where capacity is low.",
  "Share verified resources with chiefs, youth leaders, and humanitarian partners instantly.",
];

const assurances = [
  "Role-based controls ensure sensitive data never leaves your official workspace.",
  "Audit logs track every export, endorsement, and policy change for accountability.",
  "Failover-ready hosting keeps analytics and alerts online even during outages.",
];

export default function LocalGovLanding() {
  return (
    <div className="min-h-screen bg-background font-sans flex flex-col">
      <header className="w-full px-6 pt-6 flex items-center justify-between max-w-6xl mx-auto">
        <Link href="/landing">
          <Button variant="ghost" className="gap-2 text-white/90 hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Back to Overview
          </Button>
        </Link>
        <Link href="/local-government-login">
          <Button variant="ghost" className="hidden md:inline-flex text-white/90 hover:text-white">
            Already verified? Login
          </Button>
        </Link>
      </header>

      <section className="relative overflow-hidden rounded-b-[3rem] bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.25),_transparent_55%)]" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 space-y-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest">
            Local Government & Partner Control Room
          </span>
          <h1 className="text-4xl md:text-6xl font-heading font-black leading-tight drop-shadow-md">
            Coordinate response with community insight you can trust.
          </h1>
          <p className="mx-auto max-w-3xl text-lg md:text-xl text-white/85 leading-relaxed">
            PeaceLink aggregates citizen reports, elder endorsements, and moderator actions so your teams can deploy resources faster and measure impact transparently.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/local-government-signup">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-white/90 h-14 px-8 rounded-2xl font-bold shadow-xl">
                Request Partner Access <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/analytics">
              <Button size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/15 h-14 px-8 rounded-2xl font-bold">
                Preview Analytics
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
                className="group rounded-3xl border border-slate-700/30 bg-white/90 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900/10 text-blue-600">
                  <item.icon className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-heading font-bold text-slate-800 mb-2">
                  {item.title}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <section className="rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-sm">
            <div className="flex items-start gap-3">
              <Building2 className="mt-1 h-6 w-6 text-blue-700" />
              <div>
                <h3 className="text-2xl font-heading font-bold text-slate-900">Operational clarity built in</h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-600">
                  {actions.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span className="mt-1 block h-2 w-2 rounded-full bg-blue-600/80" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-slate-900/90 p-8 text-white">
            <h3 className="text-xl font-heading font-bold mb-4 flex items-center gap-2">
              <ShieldAlert className="h-5 w-5" /> Assurance you can rely on
            </h3>
            <ul className="space-y-3 text-sm text-white/80">
              {assurances.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <span className="mt-1 block h-2 w-2 rounded-full bg-white/80" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>

      <footer className="px-6 pb-10 text-center text-xs text-muted-foreground">
        Built for accountable governance alongside community voices.
      </footer>
    </div>
  );
}
