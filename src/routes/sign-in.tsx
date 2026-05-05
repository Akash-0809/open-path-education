import { createFileRoute } from "@tanstack/react-router";
import { SignIn } from "@/components/sign-in";

export const Route = createFileRoute("/sign-in")({
  head: () => ({
    meta: [
      { title: "Sign In — LuminaLearn" },
      {
        name: "description",
        content: "Sign in to your LuminaLearn account",
      },
    ],
  }),
  component: SignInPage,
});

function SignInPage() {
  return <SignIn />;
}
