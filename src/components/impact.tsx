const STATS = [
  { value: "1.3B", label: "people worldwide live with significant disability" },
  { value: "90%", label: "of disabled children in low-income areas are out of school" },
  { value: "4×", label: "higher engagement when content is multi-format" },
];

export function Impact() {
  return (
    <section id="impact" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-border bg-gradient-hero p-10 shadow-soft sm:p-16">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                Real-world impact
              </span>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                Education is a right — not a privilege of perfect senses.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground text-balance">
                LuminaLearn closes the accessibility gap by translating any lesson into the format a
                learner can perceive — voice, text, captions, or sign — and adapting in real time to
                how they're feeling and progressing.
              </p>
              <a
                href="#tutor"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
              >
                Start learning free
              </a>
            </div>

            <dl className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-border/60 bg-card/80 p-6 shadow-soft backdrop-blur"
                >
                  <dt className="font-display text-4xl font-semibold text-primary">{s.value}</dt>
                  <dd className="mt-2 text-sm text-muted-foreground">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
