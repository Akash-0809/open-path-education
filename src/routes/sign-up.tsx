import { createFileRoute } from "@tanstack/react-router";
import { SignUp } from "@/components/sign-up";

export const Route = createFileRoute("/sign-up")({
  head: () => ({
    meta: [
      { title: "Sign Up — LuminaLearn" },
      {
        name: "description",
        content: "Create your LuminaLearn account",
      },
    ],
  }),
  component: SignUpPage,
});

function SignUpPage() {
  return <SignUp />;
}
