import { supabase } from "@/integrations/supabase/client";

/**
 * Get all courses with pagination
 */
export async function fetchCourses(limit = 12, offset = 0) {
  try {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .range(offset, offset + limit - 1)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
}

/**
 * Get courses by category
 */
export async function fetchCoursesByCategory(category: string, limit = 12, offset = 0) {
  try {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("category", category)
      .range(offset, offset + limit - 1)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching courses by category:", error);
    throw error;
  }
}

/**
 * Get course by ID
 */
export async function fetchCourseById(id: string) {
  try {
    const { data, error } = await supabase.from("courses").select("*").eq("id", id).single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching course:", error);
    throw error;
  }
}

/**
 * Get course lessons
 */
export async function fetchCourseLessons(courseId: string) {
  try {
    const { data, error } = await supabase
      .from("lessons")
      .select("*")
      .eq("course_id", courseId)
      .order("order", { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching lessons:", error);
    throw error;
  }
}

/**
 * Get lesson by ID
 */
export async function fetchLessonById(id: string) {
  try {
    const { data, error } = await supabase.from("lessons").select("*").eq("id", id).single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching lesson:", error);
    throw error;
  }
}

/**
 * Search courses
 */
export async function searchCourses(query: string, limit = 12) {
  try {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .or(`title.ilike.%${query}%,description.ilike.%${query}%,instructor.ilike.%${query}%`)
      .limit(limit);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error searching courses:", error);
    throw error;
  }
}

/**
 * Get course statistics
 */
export async function getCourseStats(courseId: string) {
  try {
    const { data, error } = await supabase
      .from("user_enrollments")
      .select("*")
      .eq("course_id", courseId);

    if (error) throw error;

    const enrollments = data || [];
    const completed = enrollments.filter((e) => e.completed_at).length;

    return {
      total_students: enrollments.length,
      completed: completed,
      in_progress: enrollments.length - completed,
      avg_progress:
        enrollments.length > 0
          ? enrollments.reduce((sum, e) => sum + (e.progress || 0), 0) / enrollments.length
          : 0,
    };
  } catch (error) {
    console.error("Error fetching course stats:", error);
    throw error;
  }
}

/**
 * Get most popular courses
 */
export async function getPopularCourses(limit = 6) {
  try {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("students", { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching popular courses:", error);
    throw error;
  }
}

/**
 * Get highest rated courses
 */
export async function getTopRatedCourses(limit = 6) {
  try {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("rating", { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching top rated courses:", error);
    throw error;
  }
}

/**
 * Get course count by category
 */
export async function getCourseCountByCategory() {
  try {
    const { data, error } = await supabase.from("courses").select("category");

    if (error) throw error;

    const counts = {
      technology: 0,
      business: 0,
      "life-skills": 0,
      accessibility: 0,
      creative: 0,
    };

    (data || []).forEach((course: any) => {
      if (course.category in counts) {
        counts[course.category as keyof typeof counts]++;
      }
    });

    return counts;
  } catch (error) {
    console.error("Error getting course counts:", error);
    throw error;
  }
}
