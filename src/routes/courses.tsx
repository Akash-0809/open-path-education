import { createFileRoute } from "@tanstack/react-router";
import courses from "../data/coursesData.json";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Courses — LuminaLearn" },
      {
        name: "description",
        content: "Explore our collection of accessible, inclusive learning courses",
      },
    ],
  }),
  component: CoursesPage,
});

export default function CoursesPage() {
  return (
    <div className="container">
      <h1 className="title">Courses</h1>

      <div className="courses-grid">
        {courses.map((course) => (
          <div className="course-card" key={course.id}>
            <h2>{course.title}</h2>
            <p>{course.description}</p>

            <iframe
              src={course.video_url.replace("watch?v=", "embed/")}
              title={course.title}
            />

            <span className="level">{course.level}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

