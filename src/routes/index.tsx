import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { Courses } from "@/components/courses";
import { AITutor } from "@/components/ai-tutor";
import { Impact } from "@/components/impact";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LuminaLearn — Smart Inclusive Education for Every Learner" },
      {
        name: "description",
        content:
          "Adaptive AI learning platform with real-time captions, sign language, voice control and an AI tutor — designed for visually and hearing-impaired learners.",
      },
      { property: "og:title", content: "LuminaLearn — Smart Inclusive Education" },
      {
        property: "og:description",
        content:
          "Adaptive AI learning with captions, sign language and voice — inclusive by design.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Features />
        <Courses />
        <AITutor />
        <Impact />
      </main>
      <SiteFooter />
    </div>
  );
}
