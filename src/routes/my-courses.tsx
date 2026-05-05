import { createFileRoute } from "@tanstack/react-router";
import { MyCoursesPage } from "@/components/my-courses-page";

export const Route = createFileRoute("/my-courses")({
  head: () => ({
    meta: [
      { title: "My Courses — LuminaLearn" },
      {
        name: "description",
        content: "View your enrolled courses and track your learning progress",
      },
    ],
  }),
  component: MyCourses,
});

function MyCourses() {
  return <MyCoursesPage />;
}
