import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import mapBackground from "@assets/generated_images/map_of_south_sudan_with_pins.png";
import {
  ArrowRight,
  CheckCircle2,
  Shield,
  Users,
  Globe2,
  Building2,
  Mic,
  BarChart3,
  ShieldHalf,
  ServerCog,
} from "lucide-react";

type RolePortal = {
  title: string;
  description: string;
  href: string;
  icon: any;
  badgeClass: string;
  external?: boolean;
  ctaHref?: string;
  ctaLabel?: string;
};

const ROLE_PORTALS: RolePortal[] = [
  {
    title: "Youth Hub",
    description: "Report issues, join forums, and earn trust badges with elder endorsements.",
    href: "/landing/youth",
    icon: Users,
    badgeClass: "bg-primary/10 text-primary",
  },
  {
    title: "Community Elders",
    description: "Review reports with voice tools and guide youth-led dialogues.",
    href: "/landing/elder",
    icon: Mic,
    badgeClass: "bg-amber-100 text-amber-700",
  },
  {
    title: "Local Government",
    description: "Coordinate partners, analytics, and verified alerts in one place.",
    href: "/landing/local-government",
    icon: BarChart3,
    badgeClass: "bg-slate-900/10 text-slate-900",
  },
  {
    title: "Moderation Team",
    description: "Manage translation queues, auto-hide pipelines, and safety workflows.",
    href: "/landing/moderator",
    icon: ShieldHalf,
    badgeClass: "bg-emerald-100 text-emerald-700",
    ctaHref: "/login?role=moderator",
    ctaLabel: "Moderator Login",
  },
  {
    title: "Admin Console",
    description: "Configure roles, policies, and infrastructure resilience settings.",
    href: "http://127.0.0.1:8000/admin/",
    icon: ServerCog,
    badgeClass: "bg-slate-800/10 text-slate-900",
    external: true,
  },
];

export default function Landing() {
  const [, setLocation] = useLocation();
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      {/* Navbar */}
      <nav className="absolute top-0 left-0 right-0 z-50 px-6 pt-6 flex justify-between items-center max-w-6xl mx-auto w-full">
        <div className="relative inline-flex items-center">
          <span className="absolute inset-0 -z-10 rounded-2xl bg-white/15 blur-xl opacity-70 rotate-[-3deg]"></span>
          <span className="font-heading font-black text-3xl md:text-5xl uppercase tracking-[0.35em] text-transparent bg-gradient-to-r from-white via-accent to-white bg-clip-text drop-shadow-[0_6px_18px_rgba(0,0,0,0.5)] transform -rotate-2 px-5 py-2">
            PeaceLink
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/local-government-login">
            <Button size="lg" variant="ghost" className="hidden md:inline-flex text-white/90 hover:text-white hover:bg-white/10 font-semibold h-14 px-7 rounded-2xl border border-white/25 text-base">
              <Building2 className="mr-2 h-5 w-5" /> Local Government Login
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" className="bg-white/25 hover:bg-white text-white hover:text-primary font-bold h-14 px-7 rounded-2xl backdrop-blur border border-white/50 shadow-xl text-base">
              Login
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative min-h-[78vh] w-full overflow-hidden rounded-b-[3rem] shadow-2xl z-10 bg-primary">
        <img
          src={mapBackground}
          alt="South Sudan map"
          className="absolute inset-0 h-full w-full object-contain object-center opacity-65 transform scale-125 md:scale-115"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/35 via-primary/80 to-primary/98 flex flex-col justify-center items-center p-6 pt-40 pb-32 text-center">
          <div className="max-w-5xl mx-auto w-full space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white/90 text-xs font-medium border border-white/20 mx-auto">
              <Globe2 className="h-3 w-3" />
              <span>South Sudan's First Digital Peace Platform</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white leading-tight tracking-tight drop-shadow-sm">
              Connect.
              <br />
              <span className="text-accent inline-block transform hover:scale-105 transition-transform">Resolve.</span>
              <br />
              Build Peace.
            </h1>
            
            <p className="text-white/85 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
              Join thousands of youth, leaders, and partners building a safer, more connected South Sudan.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <Link href="/signup">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-bold text-lg h-14 rounded-xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all px-8 w-full sm:w-auto">
                  Join Community <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/local-government-signup">
                <Button size="lg" variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white/10 font-bold text-lg h-14 rounded-xl hover:-translate-y-1 transition-all px-8 w-full sm:w-auto">
                  Local Government Access
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="flex-1 px-6 py-16 bg-background pt-20">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-3">Why PeaceLink?</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">Designed for our communities, powered by you.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="group p-6 rounded-3xl bg-card border border-border shadow-sm hover:shadow-md transition-all hover:border-primary/30">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-7 w-7" />
              </div>
              <h3 className="font-bold text-foreground text-xl mb-2">Safe Reporting</h3>
              <p className="text-muted-foreground leading-relaxed">Report issues anonymously. Your safety is our priority.</p>
            </div>

            <div className="group p-6 rounded-3xl bg-card border border-border shadow-sm hover:shadow-md transition-all hover:border-accent/30">
              <div className="h-14 w-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-4 text-accent group-hover:scale-110 transition-transform duration-300">
                <Users className="h-7 w-7" />
              </div>
              <h3 className="font-bold text-foreground text-xl mb-2">Dialogue</h3>
              <p className="text-muted-foreground leading-relaxed">Discuss local issues directly with elders and youth leaders.</p>
            </div>

            <div className="group p-6 rounded-3xl bg-card border border-border shadow-sm hover:shadow-md transition-all hover:border-green-500/30">
              <div className="h-14 w-14 rounded-2xl bg-green-500/10 flex items-center justify-center mb-4 text-green-600 group-hover:scale-110 transition-transform duration-300">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <h3 className="font-bold text-foreground text-xl mb-2">Verified Info</h3>
              <p className="text-muted-foreground leading-relaxed">Access trusted news and resources without rumors.</p>
            </div>
          </div>
          
          <section className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-heading font-bold text-foreground">Choose your path</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Every role has a tailored workspace. Pick the experience that matches how you serve.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {ROLE_PORTALS.map((portal) => (
                portal.external ? (
                  <a 
                    key={portal.title} 
                    href={portal.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col rounded-3xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${portal.badgeClass}`}>
                      <portal.icon className="h-6 w-6" />
                    </div>
                    <h4 className="text-xl font-heading font-semibold text-foreground mb-2">
                      {portal.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">{portal.description}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                      Explore <ArrowRight className="h-4 w-4" />
                    </span>
                  </a>
                ) : (
                  <div
                    key={portal.title}
                    className="flex h-full flex-col rounded-3xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
                  >
                    <Link href={portal.href} className="group flex flex-1 flex-col focus:outline-none">
                      <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${portal.badgeClass}`}>
                        <portal.icon className="h-6 w-6" />
                      </div>
                      <h4 className="text-xl font-heading font-semibold text-foreground mb-2">
                        {portal.title}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed flex-1">{portal.description}</p>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                        Explore <ArrowRight className="h-4 w-4" />
                      </span>
                    </Link>
                    {portal.ctaHref && portal.ctaLabel && (
                      <Button
                        type="button"
                        size="sm"
                        className="mt-4 w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
                        onClick={() => setLocation(portal.ctaHref!)}
                      >
                        {portal.ctaLabel}
                      </Button>
                    )}
                  </div>
                )
              ))}
            </div>
          </section>

          <div className="md:hidden mt-12 bg-slate-50 rounded-2xl p-6 text-center border border-slate-100">
            <Building2 className="h-8 w-8 text-slate-400 mx-auto mb-3" />
            <h3 className="font-bold text-slate-800 mb-1">Local Government & Partners</h3>
            <p className="text-sm text-slate-500 mb-4">Coordinate humanitarian response with verified community data.</p>
            <Link href="/local-government-login">
              <Button variant="outline" className="w-full">Sign in</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-8 text-center text-sm text-muted-foreground border-t border-border/40 bg-secondary/20">
        <p className="font-medium mb-2">© 2024 PeaceLink South Sudan</p>
        <p>Built for peace, built for us.</p>
      </div>
    </div>
  );
}
