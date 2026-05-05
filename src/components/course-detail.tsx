import { useState, useEffect } from "react";
import { useRouter, useSearch } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { getCourseById, getCourseLessons, enrollInCourse } from "@/lib/course.functions";
import { Loader2, Star, Users, Clock, CheckCircle, Play } from "lucide-react";

interface CourseDetailProps {
  courseId: string;
}

export function CourseDetail({ courseId }: CourseDetailProps) {
  const [course, setCourse] = useState<any>(null);
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [enrolling, setEnrolling] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    loadCourseData();
  }, [courseId]);

  const loadCourseData = async () => {
    setLoading(true);
    setError(null);
    try {
      const courseResponse = await getCourseById({ id: courseId });
      setCourse(courseResponse.course);

      const lessonsResponse = await getCourseLessons({ courseId });
      setLessons(lessonsResponse.lessons);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load course");
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async () => {
    setEnrolling(true);
    setError(null);
    try {
      await enrollInCourse({ courseId });
      setEnrolled(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Enrollment failed");
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Course not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      {course.thumbnail && (
        <div className="relative h-96 w-full overflow-hidden bg-muted">
          <img src={course.thumbnail} alt={course.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-6 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        {/* Course Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-start gap-3 mb-4">
            <Badge className="bg-blue-100 text-blue-800">{course.category.replace("-", " ")}</Badge>
            <Badge variant="outline">{course.level}</Badge>
          </div>

          <h1 className="text-4xl font-bold tracking-tight mb-4">{course.title}</h1>

          <p className="mb-6 text-lg text-muted-foreground">{course.description}</p>

          <div className="mb-6 flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Instructor:</span>
              <span>{course.instructor}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>{course.duration} minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <span>{course.students.toLocaleString()} students</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span>{course.rating.toFixed(1)}/5</span>
            </div>
          </div>

          {!enrolled && (
            <Button
              size="lg"
              onClick={handleEnroll}
              disabled={enrolling}
              className="w-full sm:w-auto"
            >
              {enrolling ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enrolling...
                </>
              ) : (
                "Enroll in Course"
              )}
            </Button>
          )}
          {enrolled && (
            <div className="rounded-lg border border-green-200 bg-green-50 p-4">
              <div className="flex items-center gap-2 text-green-800">
                <CheckCircle className="h-5 w-5" />
                <span className="font-semibold">You are enrolled in this course</span>
              </div>
            </div>
          )}
        </div>

        {/* Course Content */}
        <Tabs defaultValue="lessons" className="mb-12">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="lessons">Lessons ({lessons.length})</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          <TabsContent value="lessons" className="mt-6">
            {lessons.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-muted-foreground">No lessons available yet</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {lessons.map((lesson, index) => (
                  <Card key={lesson.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="flex items-center gap-4 py-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">{lesson.title}</h3>
                        {lesson.description && (
                          <p className="text-sm text-muted-foreground truncate">
                            {lesson.description}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground flex-shrink-0">
                        <Clock className="h-4 w-4" />
                        <span>{lesson.duration} min</span>
                      </div>
                      {enrolled && (
                        <Button size="sm" variant="outline">
                          <Play className="h-4 w-4 mr-2" />
                          Start
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="about" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>About this Course</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">What you'll learn</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Comprehensive course material with step-by-step guidance</li>
                    <li>• Real-world applications and practical examples</li>
                    <li>• Interactive lessons with multimedia content</li>
                    <li>
                      • Full accessibility features including captions, sign language, and
                      transcripts
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Accessibility Features</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>✓ Full video captions</li>
                    <li>✓ Sign language interpretation</li>
                    <li>✓ Audio transcripts</li>
                    <li>✓ Screen reader optimized</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
