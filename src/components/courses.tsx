import { Code2, Briefcase, Sprout, Accessibility, Palette } from "lucide-react";

const COURSES = [
  { icon: Code2, name: "Technology", count: 124, color: "from-primary to-secondary" },
  { icon: Briefcase, name: "Business", count: 86, color: "from-secondary to-primary" },
  { icon: Sprout, name: "Life Skills", count: 58, color: "from-warm to-primary" },
  { icon: Accessibility, name: "Accessibility Training", count: 41, color: "from-primary to-warm" },
  { icon: Palette, name: "Creative Skills", count: 73, color: "from-secondary to-warm" },
];

export function Courses() {
  return (
    <section id="courses" className="bg-accent/40 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">Curriculum</span>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Structured learning across five domains
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Courses → modules → lessons → assessments. Every item ships with captions, audio,
              transcripts and sign-language clips by default.
            </p>
          </div>
          <a
            href="#tutor"
            className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium shadow-soft transition-colors hover:bg-background"
          >
            Browse catalog
          </a>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {COURSES.map(({ icon: Icon, name, count, color }) => (
            <li
              key={name}
              className="group relative overflow-hidden rounded-3xl border border-border/70 bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-glow"
            >
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${color}`} aria-hidden="true" />
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold">{name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{count} accessible courses</p>
              <p className="mt-4 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                Explore →
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
