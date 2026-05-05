import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-semibold">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
            <Sparkles className="h-5 w-5" aria-hidden="true" />
          </span>
          <span>
            Lumina<span className="text-primary">Learn</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 text-sm font-medium md:flex">
          <a
            href="#features"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </a>
          <a
            href="#tutor"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            AI Tutor
          </a>
          <Link
            to="/courses"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Courses
          </Link>
          <Link
            to="/my-courses"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            My Courses
          </Link>
          <a
            href="#impact"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Impact
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/sign-in"
            className="hidden rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground shadow-soft transition-colors hover:bg-accent sm:inline-flex"
          >
            Sign in
          </Link>
          <a
            href="#tutor"
            className="inline-flex items-center justify-center rounded-full bg-gradient-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
          >
            Try free
          </a>
        </div>
      </div>
    </header>
  );
}
