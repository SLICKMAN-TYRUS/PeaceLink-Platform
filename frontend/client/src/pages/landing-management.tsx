import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  Shield,
  Users,
  Settings,
  Activity,
  Eye,
  ListChecks,
  Languages,
  ShieldHalf,
  ServerCog,
  Workflow,
  LockKeyhole,
  Zap,
} from "lucide-react";

const highlights = [
  {
    title: "Unified Moderation Queue",
    description:
      "Review incident reports, forum posts, and resource updates from one intelligent triage board. AI-assisted priority sorting with SLA timers ensures nothing critical is missed.",
    icon: ListChecks,
  },
  {
    title: "System Administration Control",
    description:
      "Assign roles, configure policies, tune auto-hide thresholds, and orchestrate verification pipelines—all without touching code. Full DevOps observability built in.",
    icon: Workflow,
  },
  {
    title: "Trust & Safety Arsenal",
    description:
      "Auto-hide harmful content, flag elder endorsements, escalate urgent items, and maintain comprehensive audit trails. Security-first controls protect users and data at every level.",
    icon: ShieldHalf,
  },
];

const workflows = [
  {
    icon: Eye,
    title: "Content Review Workflow",
    description:
      "Filter queues by region, language, or verification status for faster assignments. Respond with localized templates so community members understand what to fix or celebrate.",
  },
  {
    icon: Users,
    title: "User & Role Management",
    description:
      "Approve partner requests, manage elder verifications, suspend accounts, and track user activity. Multi-factor authentication and permission hierarchies keep access secure.",
  },
  {
    icon: Activity,
    title: "Platform Health Monitoring",
    description:
      "Monitor sync success rates, queue backlogs, and failover status with real-time alerts. Heat maps show where moderator staffing needs adjustment for peak demand.",
  },
];

const features = [
  "⚡ AI-powered content triage prioritizes high-risk reports automatically",
  "🌍 Translation workspace with memory reuse and cultural review flagging",
  "📊 Real-time analytics dashboard showing moderation KPIs and system health",
  "⌨️ Keyboard shortcuts and offline draft notes for productivity on limited bandwidth",
  "🔐 Comprehensive audit logs capture every decision with justifications and timestamps",
  "🔗 Escalation ladder connects moderators, elders, and admins in one tap",
  "🛡️ Role-based access controls with granular permission management",
  "🔄 API keys for integrating PeaceLink into existing crisis dashboards",
];

const governance = [
  {
    title: "Audit-Ready Transparency",
    description:
      "Every moderator decision, elder endorsement, and partner export is logged with reasons, timestamps, and user attribution for complete accountability.",
  },
  {
    title: "Configurable Safety Policies",
    description:
      "Set region-specific language defaults, translation memory retention rules, and auto-hide thresholds that adapt to community needs without code changes.",
  },
  {
    title: "Enterprise Security",
    description:
      "Multi-factor admin logins, encrypted exports with automatic PII redaction, scheduled backups, and webhook notifications for incident escalation.",
  },
];

const stats = [
  { value: "99.9%", label: "Platform Uptime" },
  { value: "<2min", label: "Average Response Time" },
  { value: "7+", label: "Languages Supported" },
  { value: "24/7", label: "Monitoring & Support" },
];

export default function ManagementLanding() {
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
            Admin Login
          </Button>
        </Link>
      </header>

      <section className="relative overflow-hidden rounded-b-[3rem] bg-gradient-to-br from-emerald-700 via-slate-800 to-emerald-900 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.25),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(71,85,105,0.2),_transparent_50%)]" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-28 space-y-12 text-center">
          <div className="animate-in fade-in slide-in-from-top-4 duration-700">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/15 backdrop-blur-sm px-5 py-2 text-sm font-bold uppercase tracking-wider shadow-lg">
              <Shield className="h-5 w-5" /> Platform Management Console
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-black leading-tight drop-shadow-2xl animate-in fade-in slide-in-from-top-6 duration-700 delay-100">
            Govern with Confidence. <br />Moderate with Care.
          </h1>
          <p className="mx-auto max-w-3xl text-xl md:text-2xl text-white/95 leading-relaxed font-medium animate-in fade-in slide-in-from-top-8 duration-700 delay-200">
            PeaceLink equips administrators and moderators with intelligent automation, translation tools, trust signals, and full system control to keep communities safe and voices heard responsibly.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <Link href="/signup?role=admin" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-white text-emerald-700 hover:bg-emerald-50 h-16 px-10 rounded-2xl font-bold shadow-2xl text-lg transition-all hover:scale-105">
                Request Admin Access <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </Link>
            <Link href="/analytics" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-white/70 text-white hover:bg-white/20 hover:border-white h-16 px-10 rounded-2xl font-bold text-lg backdrop-blur-sm transition-all hover:scale-105">
                View Platform Health
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
                className="group rounded-3xl border-2 border-emerald-100 bg-gradient-to-br from-white via-emerald-50/50 to-white p-8 shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl hover:border-emerald-300 animate-in fade-in slide-in-from-bottom-4 duration-500"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-slate-700 text-white shadow-lg group-hover:scale-110 transition-transform">
                  <item.icon className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-heading font-bold text-emerald-900 mb-3">
                  {item.title}
                </h2>
                <p className="text-base text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Stats Bar */}
          <section className="rounded-3xl border-2 border-emerald-200 bg-gradient-to-r from-emerald-50 to-slate-50 p-8 shadow-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-4xl md:text-5xl font-heading font-black text-emerald-700 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-600 font-medium uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Workflows Section */}
          <section className="rounded-4xl border-2 bg-gradient-to-br from-slate-50 via-emerald-50 to-slate-50 p-10 md:p-14 shadow-xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-slate-800 mb-4">
                Command Center Workflows
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Comprehensive tools for content moderation, user management, and platform administration.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {workflows.map((item) => (
                <div key={item.title} className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-white/90 shadow-md border-2 border-emerald-100/50">
                  <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-700 to-emerald-600 text-white shadow-lg">
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

          {/* Features Grid */}
          <section className="rounded-3xl border-2 border-slate-200 bg-white p-10 md:p-12 shadow-lg">
            <div className="flex items-start gap-6 mb-8">
              <div className="inline-flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-slate-700 text-white shadow-md">
                <Zap className="h-7 w-7" />
              </div>
              <div>
                <h2 className="text-3xl font-heading font-bold text-slate-900 mb-2">
                  Professional Management Tools
                </h2>
                <p className="text-slate-600">
                  Enterprise-grade features for administrators and moderators maintaining platform integrity.
                </p>
              </div>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {features.map((feature, i) => (
                <div key={i} className="flex gap-4 items-start p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-slate-50 border border-emerald-100 hover:shadow-md transition-shadow">
                  <span className="mt-0.5 text-2xl">{feature.split(' ')[0]}</span>
                  <p className="text-sm text-slate-700 leading-relaxed font-medium">
                    {feature.split(' ').slice(1).join(' ')}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Governance Section */}
          <section className="rounded-4xl border-2 border-slate-300 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white p-10 md:p-14 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.2),_transparent_50%)]" />
            <div className="relative z-10">
              <div className="text-center mb-12">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 border-2 border-emerald-400/30 text-emerald-300 shadow-lg mb-4">
                  <LockKeyhole className="h-8 w-8" />
                </div>
                <h2 className="text-4xl md:text-5xl font-heading font-black mb-4">
                  Built for Accountable Governance
                </h2>
                <p className="text-white/80 max-w-2xl mx-auto text-lg">
                  Security, transparency, and compliance engineered into every layer of the platform.
                </p>
              </div>
              <div className="grid gap-8 md:grid-cols-3">
                {governance.map((item, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                    <h3 className="text-xl font-heading font-bold mb-3 text-emerald-300">
                      {item.title}
                    </h3>
                    <p className="text-sm text-white/90 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Tooling Callout */}
          <section className="rounded-4xl border-2 border-slate-200 bg-gradient-to-br from-slate-100 via-emerald-50 to-slate-100 p-10 md:p-12 shadow-lg">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-emerald-600 to-slate-700 flex items-center justify-center text-white shadow-xl">
                  <ServerCog className="h-12 w-12" />
                </div>
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-heading font-bold text-slate-900 mb-3">
                  DevOps-Ready Infrastructure
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-5">
                  Health checks, retry strategies, observability, and configurable SLAs surface when review deadlines slip beyond agreed windows. API access integrates PeaceLink data into existing crisis dashboards securely.
                </p>
                <Link href="/resources" className="inline-block">
                  <Button variant="outline" className="w-full sm:w-auto border-2 border-emerald-700 text-emerald-700 hover:bg-emerald-700 hover:text-white font-bold">
                    View API Documentation
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="rounded-4xl bg-gradient-to-br from-emerald-700 via-slate-800 to-emerald-900 text-white p-12 md:p-16 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.2),_transparent_70%)]" />
            <div className="relative z-10 space-y-6">
              <h2 className="text-4xl md:text-5xl font-heading font-black leading-tight">
                Keep PeaceLink Safe & Trusted
              </h2>
              <p className="text-xl text-white/95 max-w-2xl mx-auto">
                Request access to the management console and join the team ensuring every community voice is heard responsibly.
              </p>
              <Link href="/signup?role=admin" className="inline-block">
                <Button size="lg" className="w-full sm:w-auto bg-white text-emerald-700 hover:bg-emerald-50 h-16 px-12 rounded-2xl font-bold text-lg shadow-2xl transition-all hover:scale-105">
                  Apply for Management Access <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </main>

      <footer className="w-full px-6 py-10 text-center text-sm text-slate-500 bg-slate-50 border-t">
        <p className="font-medium">Guardians of community safety • PeaceLink Platform © 2024</p>
        <p className="mt-2">Protecting voices, ensuring accountability</p>
      </footer>
    </div>
  );
}
