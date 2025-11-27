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
} from "lucide-react";

const highlights = [
  {
    title: "Voice-first reporting",
    description:
      "Record your message and PeaceLink will transcribe, translate, and route it to the right moderators.",
    icon: Mic,
  },
  {
    title: "Community stewardship",
    description:
      "Endorse trusted stories, calm tensions, and guide youth discussions with your wisdom.",
    icon: Users,
  },
  {
    title: "Safety filters",
    description:
      "Flag harmful language instantly; see when moderators have reviewed and responded.",
    icon: ShieldCheck,
  },
];

const responsibilities = [
  "Approve or pause sensitive posts before they spread.",
  "Assign trusted youth to help with follow-ups in your payam.",
  "Share cultural guidance that appears alongside forum conversations.",
];

const support = [
  "Audio-first navigation with large buttons and offline playback for every alert.",
  "Quick SMS templates that pre-fill the information needed when connectivity fades.",
  "Translation memory keeps your Dinka, Nuer, or Bari phrases ready for future use.",
];

export default function ElderLanding() {
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
            Elders already verified? Login
          </Button>
        </Link>
      </header>

      <section className="relative overflow-hidden rounded-b-[3rem] bg-gradient-to-br from-amber-600 via-amber-500 to-orange-400 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.2),_transparent_55%)]" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 space-y-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest">
            Custodians of community trust
          </span>
          <h1 className="text-4xl md:text-6xl font-heading font-black leading-tight drop-shadow-md">
            Guide every conversation with your wisdom.
          </h1>
          <p className="mx-auto max-w-3xl text-lg md:text-xl text-white/90 leading-relaxed">
            PeaceLink honors elders by making it effortless to review reports, share advice, and activate rapid response when conflict threatens your village.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup?role=leader">
              <Button size="lg" className="bg-white text-amber-600 hover:bg-white/90 h-14 px-8 rounded-2xl font-bold shadow-xl">
                Become a Community Elder <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/forums">
              <Button size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/15 h-14 px-8 rounded-2xl font-bold">
                Review Active Discussions
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
                className="group rounded-3xl border border-amber-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-amber-600 border border-amber-200">
                  <item.icon className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-heading font-bold text-amber-700 mb-2">
                  {item.title}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <section className="rounded-3xl border border-amber-200 bg-white/90 p-8 shadow-sm">
            <div className="flex items-start gap-3">
              <BookOpen className="mt-1 h-6 w-6 text-amber-600" />
              <div>
                <h3 className="text-2xl font-heading font-bold text-amber-700">Stewardship made simple</h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-600">
                  {responsibilities.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span className="mt-1 block h-2 w-2 rounded-full bg-amber-500" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-amber-200 bg-amber-50/80 p-8">
            <h3 className="text-xl font-heading font-bold text-amber-700 mb-4">Support that meets you where you are</h3>
            <ul className="space-y-3 text-sm text-slate-700">
              {support.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <Waves className="mt-0.5 h-4 w-4 text-amber-500" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>

      <footer className="px-6 pb-10 text-center text-xs text-muted-foreground">
        Elders keep PeaceLink grounded in local truths.
      </footer>
    </div>
  );
}
