import {
  Mic,
  Captions,
  Hand,
  BookOpen,
  Languages,
  Heart,
  Trophy,
  BarChart3,
  Wifi,
} from "lucide-react";

const FEATURES = [
  {
    icon: Mic,
    title: "Voice navigation",
    desc: "Move through lessons hands-free with natural voice commands and gesture cues.",
  },
  {
    icon: Captions,
    title: "Real-time captions",
    desc: "Every video, lecture and conversation is captioned in 40+ languages, instantly.",
  },
  {
    icon: Hand,
    title: "AI sign language",
    desc: "Generate sign-language interpretation for any text or audio content on demand.",
  },
  {
    icon: BookOpen,
    title: "Adaptive learning",
    desc: "Difficulty, pace and format adapt to performance, learning speed and access needs.",
  },
  {
    icon: Languages,
    title: "Auto format conversion",
    desc: "Turn text into audio, video into captions, slides into braille-ready text.",
  },
  {
    icon: Heart,
    title: "Emotion-aware feedback",
    desc: "Detects frustration or confusion and offers a kinder pace and encouragement.",
  },
  {
    icon: Trophy,
    title: "Gamified progress",
    desc: "Badges, XP and inclusive leaderboards keep motivation high without pressure.",
  },
  {
    icon: BarChart3,
    title: "Analytics dashboards",
    desc: "Students and instructors see clear progress signals and accessibility usage.",
  },
  {
    icon: Wifi,
    title: "Offline & multi-language",
    desc: "Download lessons, captions and audio for low-bandwidth or offline study.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Platform
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Built for every way you learn
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-balance">
            Nine intelligent capabilities that work together to make every lesson genuinely
            accessible.
          </p>
        </div>

        <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <li
              key={title}
              className="group rounded-3xl border border-border/70 bg-card p-7 shadow-soft transition-all hover:-translate-y-1 hover:shadow-glow"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
