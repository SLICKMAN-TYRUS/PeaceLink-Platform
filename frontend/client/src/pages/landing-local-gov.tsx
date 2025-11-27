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
  Map,
  Users2,
  Target,
  TrendingUp,
  Database,
  Share2,
  Lock,
} from "lucide-react";

const highlights = [
  {
    title: "Real-Time Risk Intelligence",
    description:
      "Monitor incident trends across payams with live heatmaps, keyword alerts, and severity filters. See emerging patterns before they escalate and coordinate rapid response with community leaders.",
    icon: Map,
  },
  {
    title: "Collaborative Response Hub",
    description:
      "Connect with partner organizations, share resources, assign tasks, and track joint interventions—all in one platform. Break down silos and multiply your impact through coordination.",
    icon: Users2,
  },
  {
    title: "Evidence-Ready Analytics",
    description:
      "Generate donor reports, impact assessments, and community dashboards with verified data. Export audit-ready spreadsheets, charts, and case studies that demonstrate measurable outcomes.",
    icon: BarChart3,
  },
];

const workflows = [
  {
    icon: Target,
    title: "Strategic Resource Allocation",
    description:
      "Use data-driven insights to deploy resources where they're needed most. Track distribution, measure effectiveness, and adjust strategies based on community feedback and impact metrics.",
  },
  {
    icon: TrendingUp,
    title: "Impact Measurement Suite",
    description:
      "Benchmark response times, track resolution rates, and monitor community sentiment. Visualize progress toward peacebuilding goals with customizable KPIs and automated trend analysis.",
  },
  {
    icon: Share2,
    title: "Multi-Partner Coordination",
    description:
      "Approve partner requests, delegate report reviews, and synchronize alerts across organizations. Shared visibility prevents duplication and ensures no incident falls through the cracks.",
  },
];

const features = [
  "📊 Live analytics dashboard with geographic heatmaps and trend visualization",
  "🔔 Configurable SMS/email alerts for high-priority incidents in your coverage area",
  "📁 Export verified reports with redacted personal information for donor compliance",
  "👥 Role-based access controls for teams with audit logs and permission management",
  "🌐 Multi-language support for community engagement in 7+ South Sudanese languages",
  "🔄 API access for integrating PeaceLink data into existing crisis dashboards",
];

const governance = [
  "Role-based permissions ensure sensitive data stays protected while enabling collaboration.",
  "Comprehensive audit trails log every action with timestamps and justifications for accountability.",
  "Secure export redaction removes personal identifiers while preserving incident context.",
  "Failover hosting and automated backups ensure 24/7 availability even during infrastructure disruptions.",
];

const testimonials = [
  {
    quote: "PeaceLink transformed how we coordinate with local NGOs. Real-time incident visibility helped us prevent three potential conflicts last month alone.",
    organization: "UN peacekeeping Mission",
    location: "Juba",
  },
  {
    quote: "The analytics dashboard makes donor reporting effortless. We can now show concrete evidence of community impact and response efficiency.",
    organization: "International Rescue Committee",
    location: "Yambio",
  },
];

export default function LocalGovLanding() {
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
            Partner Login
          </Button>
        </Link>
      </header>

      <section className="relative overflow-hidden rounded-b-[3rem] bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.3),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(148,163,184,0.2),_transparent_50%)]" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-28 space-y-12 text-center">
          <div className="animate-in fade-in slide-in-from-top-4 duration-700">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/40 bg-blue-500/15 backdrop-blur-sm px-5 py-2 text-sm font-bold uppercase tracking-wider shadow-lg">
              <Building2 className="h-5 w-5" /> Local Government & Partner Control Room
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-black leading-tight drop-shadow-2xl animate-in fade-in slide-in-from-top-6 duration-700 delay-100">
            Coordinate Response <br />with Trusted Intelligence
          </h1>
          <p className="mx-auto max-w-3xl text-xl md:text-2xl text-white/95 leading-relaxed font-medium animate-in fade-in slide-in-from-top-8 duration-700 delay-200">
            PeaceLink provides local governments and NGO partners with real-time risk intelligence, collaborative workflows, and evidence-ready analytics to drive accountable, community-centered peacebuilding.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <Link href="/signup?role=ngo" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-white text-slate-900 hover:bg-slate-100 h-16 px-10 rounded-2xl font-bold shadow-2xl text-lg transition-all hover:scale-105">
                Request Partner Access <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </Link>
            <Link href="/analytics" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-white/70 text-white hover:bg-white/20 hover:border-white h-16 px-10 rounded-2xl font-bold text-lg backdrop-blur-sm transition-all hover:scale-105">
                View Platform Insights
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
                className="group rounded-3xl border-2 border-blue-100 bg-gradient-to-br from-white via-slate-50/50 to-white p-8 shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl hover:border-blue-300 animate-in fade-in slide-in-from-bottom-4 duration-500"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-slate-700 text-white shadow-lg group-hover:scale-110 transition-transform">
                  <item.icon className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-heading font-bold text-slate-900 mb-3">
                  {item.title}
                </h2>
                <p className="text-base text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Workflows Section */}
          <section className="rounded-4xl border-2 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 p-10 md:p-14 shadow-xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-blue-700 mb-4">
                Coordination Workflows That Scale
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                PeaceLink streamlines multi-partner collaboration with tools designed for accountable governance and rapid response.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {workflows.map((item) => (
                <div key={item.title} className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-white/90 shadow-md">
                  <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-700 to-blue-600 text-white shadow-lg">
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
              <div className="inline-flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-slate-700 to-blue-600 text-white shadow-md">
                <Database className="h-7 w-7" />
              </div>
              <div>
                <h2 className="text-3xl font-heading font-bold text-slate-900 mb-2">
                  Enterprise-Grade Partnership Tools
                </h2>
                <p className="text-slate-600">
                  Professional features built for local governments and international NGO partners.
                </p>
              </div>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {features.map((feature, i) => (
                <div key={i} className="flex gap-4 items-start p-5 rounded-2xl bg-gradient-to-r from-slate-50 to-blue-50 border border-slate-200 hover:shadow-md transition-shadow">
                  <span className="mt-0.5 text-2xl">{feature.split(' ')[0]}</span>
                  <p className="text-sm text-slate-700 leading-relaxed font-medium">
                    {feature.split(' ').slice(1).join(' ')}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Governance & Security */}
          <section className="rounded-4xl border-2 border-slate-300 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white p-10 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.2),_transparent_50%)]" />
            <div className="relative z-10">
              <div className="flex items-start gap-6 mb-8">
                <div className="inline-flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-blue-500/20 border-2 border-blue-400/30 text-blue-300 shadow-lg">
                  <Lock className="h-7 w-7" />
                </div>
                <div>
                  <h2 className="text-3xl font-heading font-bold mb-2">
                    Built for Accountable Governance
                  </h2>
                  <p className="text-white/80">
                    Security, transparency, and compliance at every level.
                  </p>
                </div>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                {governance.map((point, i) => (
                  <div key={i} className="flex gap-3 items-start p-5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                    <span className="mt-1 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    <p className="text-sm text-white/90 leading-relaxed">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-heading font-bold text-slate-900 mb-3">
                Trusted by Leading Partners
              </h2>
              <p className="text-lg text-slate-600">
                Organizations using PeaceLink to drive measurable impact across South Sudan.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {testimonials.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl border-2 border-blue-200 bg-gradient-to-br from-white to-blue-50 p-8 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <FileSpreadsheet className="h-10 w-10 text-blue-600 mb-4" />
                  <p className="text-lg text-slate-700 leading-relaxed mb-6 italic">
                    "{item.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-600 to-slate-700 flex items-center justify-center text-white font-bold text-lg">
                      {item.organization.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{item.organization}</p>
                      <p className="text-sm text-slate-600">{item.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="rounded-4xl bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white p-12 md:p-16 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.2),_transparent_70%)]" />
            <div className="relative z-10 space-y-6">
              <h2 className="text-4xl md:text-5xl font-heading font-black leading-tight">
                Ready to Coordinate Smarter?
              </h2>
              <p className="text-xl text-white/95 max-w-2xl mx-auto">
                Join the growing network of local governments and NGO partners building peace through data-driven collaboration.
              </p>
              <Link href="/signup?role=ngo" className="inline-block">
                <Button size="lg" className="w-full sm:w-auto bg-white text-slate-900 hover:bg-slate-100 h-16 px-12 rounded-2xl font-bold text-lg shadow-2xl transition-all hover:scale-105">
                  Apply for Partner Access <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </main>

      <footer className="w-full px-6 py-10 text-center text-sm text-slate-500 bg-slate-50 border-t">
        <p className="font-medium">Built for accountable governance • PeaceLink Platform © 2024</p>
        <p className="mt-2">Empowering coordination across South Sudan</p>
      </footer>
    </div>
  );
}
