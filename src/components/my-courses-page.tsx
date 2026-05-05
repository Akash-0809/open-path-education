import { useState, useEffect } from "react";
import { useRouter, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { getUserEnrollments } from "@/lib/course.functions";
import { getCurrentUser } from "@/lib/auth.functions";
import { Loader2, BookOpen, CheckCircle } from "lucide-react";

export function MyCoursesPage() {
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Check if user is authenticated
      const userResponse = await getCurrentUser();
      if (!userResponse.success || !userResponse.user) {
        router.navigate({ to: "/sign-in" });
        return;
      }
      setUser(userResponse.user);

      // Load enrollments
      const response = await getUserEnrollments();
      setEnrollments(response.enrollments || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const completedCourses = enrollments.filter((e) => e.completed_at);
  const inProgressCourses = enrollments.filter((e) => !e.completed_at);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">My Courses</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Track your learning progress and continue where you left off
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        {enrollments.length === 0 ? (
          <Card>
            <CardContent className="pt-12 pb-12">
              <div className="text-center">
                <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold mb-2">No courses enrolled yet</h2>
                <p className="text-muted-foreground mb-6">
                  Start your learning journey by exploring our course catalog
                </p>
                <Link to="/courses">
                  <Button>Browse Courses</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {/* In Progress */}
            {inProgressCourses.length > 0 && (
              <div>
                <h2 className="mb-4 text-2xl font-bold">In Progress</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {inProgressCourses.map((enrollment) => (
                    <Card key={enrollment.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="line-clamp-2">
                          {enrollment.courses?.title || "Course"}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {enrollment.courses?.thumbnail && (
                          <img
                            src={enrollment.courses.thumbnail}
                            alt={enrollment.courses.title}
                            className="h-40 w-full object-cover rounded-md"
                          />
                        )}

                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Progress</span>
                            <span className="text-sm text-muted-foreground">
                              {enrollment.progress || 0}%
                            </span>
                          </div>
                          <Progress value={enrollment.progress || 0} className="h-2" />
                        </div>

                        <div className="text-sm text-muted-foreground">
                          <p>by {enrollment.courses?.instructor}</p>
                        </div>

                        <Link to={`/courses/${enrollment.course_id}`}>
                          <Button variant="outline" className="w-full">
                            Continue Learning
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Completed */}
            {completedCourses.length > 0 && (
              <div>
                <h2 className="mb-4 text-2xl font-bold">Completed</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {completedCourses.map((enrollment) => (
                    <Card
                      key={enrollment.id}
                      className="hover:shadow-lg transition-shadow border-green-200"
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between gap-2">
                          <CardTitle className="line-clamp-2">
                            {enrollment.courses?.title || "Course"}
                          </CardTitle>
                          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {enrollment.courses?.thumbnail && (
                          <img
                            src={enrollment.courses.thumbnail}
                            alt={enrollment.courses.title}
                            className="h-40 w-full object-cover rounded-md"
                          />
                        )}

                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Progress</span>
                            <Badge className="bg-green-100 text-green-800">100%</Badge>
                          </div>
                          <Progress value={100} className="h-2" />
                        </div>

                        <div className="text-sm text-muted-foreground">
                          <p>by {enrollment.courses?.instructor}</p>
                          {enrollment.completed_at && (
                            <p className="mt-2">
                              Completed on {new Date(enrollment.completed_at).toLocaleDateString()}
                            </p>
                          )}
                        </div>

                        <Link to={`/courses/${enrollment.course_id}`}>
                          <Button variant="outline" className="w-full">
                            View Course
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
