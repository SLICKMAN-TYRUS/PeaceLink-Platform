import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  ServerCog,
  Workflow,
  LockKeyhole,
  Activity,
  Cpu,
} from "lucide-react";

const highlights = [
  {
    title: "Role & policy orchestration",
    description:
      "Assign roles, tune auto-hide policies, and configure verification pipelines without code.",
    icon: Workflow,
  },
  {
    title: "System health at a glance",
    description:
      "Monitor sync success, queue backlogs, and failover status with contextual alerts.",
    icon: Activity,
  },
  {
    title: "Security-first controls",
    description:
      "Multi-factor admin logins, audit trails, and export redaction defaults keep data protected.",
    icon: LockKeyhole,
  },
];

const governance = [
  "See every moderator decision, elder endorsement, and partner export with reasons attached.",
  "Configure translation memory retention and region-specific language defaults.",
  "Schedule automated backups and webhook notifications for incident escalation.",
];

const tooling = [
  "DevOps-ready stack: health checks, retry strategies, and observability baked in.",
  "Configurable SLAs surface when review deadlines slip beyond agreed windows.",
  "API keys for integrating PeaceLink data into existing crisis dashboards securely.",
];

export default function AdminLanding() {
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
            Admin login
          </Button>
        </Link>
      </header>

      <section className="relative overflow-hidden rounded-b-[3rem] bg-gradient-to-br from-slate-900 via-neutral-900 to-slate-700 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_55%)]" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 space-y-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest">
            Platform administration console
          </span>
          <h1 className="text-4xl md:text-6xl font-heading font-black leading-tight drop-shadow-md">
            Govern PeaceLink with clarity and control.
          </h1>
          <p className="mx-auto max-w-3xl text-lg md:text-xl text-white/85 leading-relaxed">
            Administrators keep the ecosystem resilient. Configure access, monitor system health, and ensure every workflow meets South Sudan’s data protection expectations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup?role=admin">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-white/90 h-14 px-8 rounded-2xl font-bold shadow-xl">
                Request Admin Credentials <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/analytics">
              <Button size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/15 h-14 px-8 rounded-2xl font-bold">
                View Platform Insights
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
                className="group rounded-3xl border border-slate-800/40 bg-white/90 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900/15 text-white">
                  <item.icon className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-heading font-bold text-slate-900 mb-2">
                  {item.title}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <section className="rounded-3xl border border-slate-300 bg-white/95 p-8 shadow-sm">
            <div className="flex items-start gap-3">
              <ServerCog className="mt-1 h-6 w-6 text-slate-900" />
              <div>
                <h3 className="text-2xl font-heading font-bold text-slate-900">Governance without guesswork</h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-600">
                  {governance.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span className="mt-1 block h-2 w-2 rounded-full bg-slate-800" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-800/30 bg-slate-900/85 p-8 text-white">
            <h3 className="text-xl font-heading font-bold mb-4 flex items-center gap-2">
              <Cpu className="h-5 w-5" /> Infrastructure-grade tooling
            </h3>
            <ul className="space-y-3 text-sm text-white/80">
              {tooling.map((point) => (
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
        Admin tools built to uphold community trust and resilience.
      </footer>
    </div>
  );
}
