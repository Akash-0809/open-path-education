import { useState, useEffect } from "react";
import { CourseCard } from "./course-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCourses, searchCourses, enrollInCourse } from "@/lib/course.functions";
import { Loader2, Search } from "lucide-react";

const categories = [
  { value: "all", label: "All Courses" },
  { value: "technology", label: "Technology" },
  { value: "business", label: "Business" },
  { value: "life-skills", label: "Life Skills" },
  { value: "accessibility", label: "Accessibility" },
  { value: "creative", label: "Creative" },
];

export function CoursesCatalog() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [enrolling, setEnrolling] = useState<string | null>(null);

  useEffect(() => {
    loadCourses();
  }, [selectedCategory]);

  const loadCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getCourses({
        category: selectedCategory !== "all" ? selectedCategory : undefined,
        limit: 12,
        offset: 0,
      });
      setCourses(response.courses);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      loadCourses();
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await searchCourses({
        query: searchQuery,
        limit: 12,
      });
      setCourses(response.courses);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (courseId: string) => {
    setEnrolling(courseId);
    try {
      await enrollInCourse({ courseId });
      // Update UI to show enrolled
      setCourses(courses.map((c) => (c.id === courseId ? { ...c, enrolled: true } : c)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Enrollment failed");
    } finally {
      setEnrolling(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Courses</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Explore our collection of accessible, inclusive learning courses
          </p>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </form>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="grid w-full max-w-2xl grid-cols-3 lg:grid-cols-6">
            {categories.map((cat) => (
              <TabsTrigger key={cat.value} value={cat.value} className="text-xs sm:text-sm">
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((cat) => (
            <TabsContent key={cat.value} value={cat.value}>
              {error && (
                <div className="mb-6 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
                  {error}
                </div>
              )}

              {loading ? (
                <div className="flex min-h-96 items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : courses.length === 0 ? (
                <div className="flex min-h-96 items-center justify-center">
                  <div className="text-center">
                    <p className="text-muted-foreground">No courses found</p>
                  </div>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {courses.map((course) => (
                    <CourseCard
                      key={course.id}
                      {...course}
                      enrolled={course.enrolled}
                      onEnroll={enrolling === course.id ? undefined : () => handleEnroll(course.id)}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
