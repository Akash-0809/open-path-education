import { createFileRoute } from "@tanstack/react-router";
import { Account } from "@/components/account";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Account Settings — LuminaLearn" },
      {
        name: "description",
        content: "Manage your LuminaLearn account settings",
      },
    ],
  }),
  component: AccountPage,
});

function AccountPage() {
  return <Account />;
}
