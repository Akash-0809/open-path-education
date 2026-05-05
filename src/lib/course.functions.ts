import { createServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { getCurrentUser } from "./auth.functions";
import { coursesData } from "./sample-data";

// Types for courses
export interface Course {
  id: string;
  title: string;
  description: string;
  category: "technology" | "business" | "life-skills" | "accessibility" | "creative";
  thumbnail: string;
  instructor: string;
  duration: number; // in minutes
  level: "beginner" | "intermediate" | "advanced";
  rating: number;
  students: number;
  created_at: string;
  updated_at: string;
}

export interface Lesson {
  id: string;
  course_id: string;
  title: string;
  description: string;
  content: string;
  video_url?: string;
  transcript?: string;
  duration: number;
  order: number;
  created_at: string;
}

export interface UserEnrollment {
  id: string;
  user_id: string;
  course_id: string;
  enrolled_at: string;
  completed_at?: string;
  progress: number;
}

// Get all courses
export const getCourses = createServerFn({ method: "GET" })
  .inputValidator((input: { category?: string; limit?: number; offset?: number }) => input)
  .handler(async ({ data }) => {
    try {
      const { category, limit = 12, offset = 0 } = data;
      
      let filtered = coursesData.courses;
      if (category && category !== "all") {
        filtered = filtered.filter(c => c.category === category);
      }
      
      return {
        success: true,
        courses: filtered.slice(offset, offset + limit),
      };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Failed to fetch courses");
    }
  });

// Get single course
export const getCourseById = createServerFn({ method: "GET" })
  .inputValidator((input: { id: string }) => input)
  .handler(async ({ data }) => {
    try {
      const course = coursesData.courses.find(c => c.id === data.id);
      
      if (!course) throw new Error("Course not found");

      return {
        success: true,
        course,
      };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Failed to fetch course");
    }
  });

// Get course lessons
export const getCourseLessons = createServerFn({ method: "GET" })
  .inputValidator((input: { courseId: string }) => input)
  .handler(async ({ data }) => {
    try {
      const course = coursesData.courses.find(c => c.id === data.courseId);
      const lessons = course?.lessons || [];
      
      return {
        success: true,
        lessons: lessons,
      };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Failed to fetch lessons");
    }
  });

// Get single lesson
export const getLessonById = createServerFn({ method: "GET" })
  .inputValidator((input: { id: string }) => input)
  .handler(async ({ data }) => {
    try {
      const { data: lesson, error } = await supabase
        .from("lessons")
        .select("*")
        .eq("id", data.id)
        .single();

      if (error) throw error;

      return {
        success: true,
        lesson,
      };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Failed to fetch lesson");
    }
  });

// Enroll user in course
export const enrollInCourse = createServerFn({ method: "POST" })
  .inputValidator((input: { courseId: string }) => input)
  .handler(async ({ data }) => {
    try {
      const user = await getCurrentUser();
      if (!user.success || !user.user) {
        throw new Error("User not authenticated");
      }

      // Check if already enrolled
      const { data: existing } = await supabase
        .from("user_enrollments")
        .select("id")
        .eq("user_id", user.user.id)
        .eq("course_id", data.courseId)
        .single();

      if (existing) {
        throw new Error("Already enrolled in this course");
      }

      const { data: enrollment, error } = await supabase
        .from("user_enrollments")
        .insert({
          user_id: user.user.id,
          course_id: data.courseId,
          progress: 0,
        })
        .select()
        .single();

      if (error) throw error;

      return {
        success: true,
        enrollment,
      };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Enrollment failed");
    }
  });

// Get user enrollments
export const getUserEnrollments = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const user = await getCurrentUser();
    if (!user.success || !user.user) {
      throw new Error("User not authenticated");
    }

    const { data: enrollments, error } = await supabase
      .from("user_enrollments")
      .select("*, courses(*)")
      .eq("user_id", user.user.id)
      .order("enrolled_at", { ascending: false });

    if (error) throw error;

    return {
      success: true,
      enrollments: enrollments || [],
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Failed to fetch enrollments");
  }
});

// Update lesson progress
export const updateLessonProgress = createServerFn({ method: "POST" })
  .inputValidator((input: { courseId: string; completed: boolean }) => input)
  .handler(async ({ data }) => {
    try {
      const user = await getCurrentUser();
      if (!user.success || !user.user) {
        throw new Error("User not authenticated");
      }

      // Get total lessons in course
      const { data: lessons, error: lessonsError } = await supabase
        .from("lessons")
        .select("id")
        .eq("course_id", data.courseId);

      if (lessonsError) throw lessonsError;

      const totalLessons = lessons?.length || 0;
      if (totalLessons === 0) {
        throw new Error("Course has no lessons");
      }

      // Calculate progress (simplified - in production would track per-lesson)
      const progress = data.completed ? 100 : 50;

      const { data: updated, error } = await supabase
        .from("user_enrollments")
        .update({ progress })
        .eq("user_id", user.user.id)
        .eq("course_id", data.courseId)
        .select()
        .single();

      if (error) throw error;

      return {
        success: true,
        enrollment: updated,
      };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Failed to update progress");
    }
  });

// Complete course
export const completeCourse = createServerFn({ method: "POST" })
  .inputValidator((input: { courseId: string }) => input)
  .handler(async ({ data }) => {
    try {
      const user = await getCurrentUser();
      if (!user.success || !user.user) {
        throw new Error("User not authenticated");
      }

      const { data: updated, error } = await supabase
        .from("user_enrollments")
        .update({
          progress: 100,
          completed_at: new Date().toISOString(),
        })
        .eq("user_id", user.user.id)
        .eq("course_id", data.courseId)
        .select()
        .single();

      if (error) throw error;

      return {
        success: true,
        enrollment: updated,
        message: "Course completed!",
      };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Failed to complete course");
    }
  });

// Create course (admin)
export const createCourse = createServerFn({ method: "POST" })
  .inputValidator(
    (input: {
      title: string;
      description: string;
      category: string;
      instructor: string;
      level: string;
      duration?: number;
      thumbnail?: string;
    }) => input,
  )
  .handler(async ({ data }) => {
    try {
      const { data: course, error } = await supabase
        .from("courses")
        .insert({
          title: data.title,
          description: data.description,
          category: data.category,
          instructor: data.instructor,
          level: data.level,
          duration: data.duration || 0,
          thumbnail: data.thumbnail || "",
          rating: 0,
          students: 0,
        })
        .select()
        .single();

      if (error) throw error;

      return {
        success: true,
        course,
      };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Failed to create course");
    }
  });

// Search courses
export const searchCourses = createServerFn({ method: "GET" })
  .inputValidator((input: { query: string; limit?: number }) => input)
  .handler(async ({ data }) => {
    try {
      const query = data.query.toLowerCase();
      const courses = coursesData.courses.filter(c => 
        c.title.toLowerCase().includes(query) || 
        c.description.toLowerCase().includes(query) || 
        c.instructor.toLowerCase().includes(query)
      ).slice(0, data.limit || 12);

      return {
        success: true,
        courses: courses,
      };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Search failed");
    }
  });
