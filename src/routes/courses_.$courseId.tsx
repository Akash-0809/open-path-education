import { createFileRoute } from "@tanstack/react-router";
import { CourseDetail } from "@/components/course-detail";

export const Route = createFileRoute("/courses_/$courseId")({
  head: ({ params }) => ({
    meta: [
      { title: "Course Details — LuminaLearn" },
      {
        name: "description",
        content: "View course details and enroll",
      },
    ],
  }),
  component: CourseDetailPage,
});

function CourseDetailPage() {
  const { courseId } = Route.useParams();
  return <CourseDetail courseId={courseId} />;
}
