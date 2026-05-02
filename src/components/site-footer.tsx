import { Sparkles } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
          </span>
          <span>© {new Date().getFullYear()} LuminaLearn · Inclusive by design</span>
        </div>
        <p className="text-xs text-muted-foreground">
          WCAG 2.2 AA · Built with care for every learner
        </p>
      </div>
    </footer>
  );
}
