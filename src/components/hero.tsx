import heroImg from "@/assets/hero-inclusive.jpg";
import { ArrowRight, Volume2, Hand, Captions } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      <div
        aria-hidden="true"
        className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/15 blur-3xl animate-float"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -right-20 h-[28rem] w-[28rem] rounded-full bg-secondary/15 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:py-28">
        <div className="flex flex-col justify-center">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-3 py-1 text-xs font-medium text-primary">
            <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
            WCAG 2.2 AA · AI-powered accessibility
          </span>

          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Learning that{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              listens, signs and adapts
            </span>{" "}
            to every learner.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground text-balance">
            LuminaLearn is a smart inclusive education platform for visually and hearing‑impaired
            students. Real-time captions, sign-language interpretation, adaptive lessons and an AI
            tutor — all in one calm, accessible workspace.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#tutor"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
            >
              Talk to the AI tutor
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
            <a
              href="#features"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-base font-medium text-foreground shadow-soft transition-colors hover:bg-accent"
            >
              Explore features
            </a>
          </div>

          <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-border/60 pt-6 text-sm">
            <div>
              <dt className="text-muted-foreground">Languages</dt>
              <dd className="mt-1 text-2xl font-display font-semibold">40+</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Accessibility</dt>
              <dd className="mt-1 text-2xl font-display font-semibold">WCAG AA</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Learners</dt>
              <dd className="mt-1 text-2xl font-display font-semibold">12k+</dd>
            </div>
          </dl>
        </div>

        <div className="relative">
          <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card shadow-glow">
            <img
              src={heroImg}
              alt="Three diverse learners — one using a white cane, one signing, one wearing headphones — connected by flowing teal ribbons representing inclusive learning"
              width={1536}
              height={1024}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Floating accessibility chips */}
          <div className="absolute -left-4 top-8 flex items-center gap-2 rounded-2xl border border-border bg-card/95 px-4 py-3 shadow-soft backdrop-blur animate-float">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-soft text-primary">
              <Captions className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="text-xs">
              <p className="font-semibold">Live captions</p>
              <p className="text-muted-foreground">99.2% accuracy</p>
            </div>
          </div>

          <div className="absolute -right-2 bottom-10 flex items-center gap-2 rounded-2xl border border-border bg-card/95 px-4 py-3 shadow-soft backdrop-blur">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-warm/30 text-warm-foreground">
              <Hand className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="text-xs">
              <p className="font-semibold">Sign language</p>
              <p className="text-muted-foreground">AI interpreter</p>
            </div>
          </div>

          <div className="absolute -bottom-4 left-12 flex items-center gap-2 rounded-2xl border border-border bg-card/95 px-4 py-3 shadow-soft backdrop-blur">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/15 text-secondary">
              <Volume2 className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="text-xs">
              <p className="font-semibold">Read aloud</p>
              <p className="text-muted-foreground">Natural voice</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
