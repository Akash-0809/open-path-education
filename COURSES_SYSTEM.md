# Courses System Documentation

## Overview

The courses system is a comprehensive learning management platform that allows users to browse, enroll, and track their progress through structured courses. It includes course catalogs, detailed course pages, lesson management, and user progress tracking.

## Architecture

### Backend

- **Server Functions**: TanStack Start server functions for course operations
- **Database Utilities**: Helper functions for course and enrollment data
- **Search & Filtering**: Advanced search and category filtering

### Frontend

- **Components**: Reusable course components (cards, catalog, details)
- **Pages**: Course catalog, course details, and user enrollments
- **State Management**: React hooks for managing course data and enrollment

## File Structure

```
src/
├── components/
│   ├── course-card.tsx          # Reusable course card component
│   ├── courses-catalog.tsx      # Course listing and filtering
│   ├── course-detail.tsx        # Individual course details
│   ├── my-courses-page.tsx      # User's enrolled courses
│   ├── courses.tsx              # Hero section (updated)
│   └── site-header.tsx          # Navigation (updated)
├── routes/
│   ├── courses.tsx              # /courses - Course catalog
│   ├── courses_.$courseId.tsx   # /courses/{id} - Course details
│   └── my-courses.tsx           # /my-courses - User courses
├── lib/
│   ├── course.functions.ts      # Server functions
│   └── db.courses.ts            # Database utilities
```

## Database Schema

### Courses Table

```sql
CREATE TABLE courses (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(50),
  thumbnail VARCHAR(500),
  instructor VARCHAR(255),
  duration INTEGER,
  level VARCHAR(50),
  rating DECIMAL(3,2),
  students INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Lessons Table

```sql
CREATE TABLE lessons (
  id UUID PRIMARY KEY,
  course_id UUID REFERENCES courses(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  content TEXT,
  video_url VARCHAR(500),
  transcript TEXT,
  duration INTEGER,
  order INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### User Enrollments Table

```sql
CREATE TABLE user_enrollments (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  course_id UUID REFERENCES courses(id),
  enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP,
  progress INTEGER DEFAULT 0,
  UNIQUE(user_id, course_id)
);
```

## Features

### 1. Course Catalog (`/courses`)

- Browse all courses or filter by category
- Search courses by title, description, or instructor
- Display course cards with:
  - Thumbnail image
  - Title and description
  - Instructor name
  - Duration and student count
  - Rating and level badge
  - Enroll button

**Categories:**

- Technology
- Business
- Life Skills
- Accessibility
- Creative

**Levels:**

- Beginner
- Intermediate
- Advanced

### 2. Course Details (`/courses/{courseId}`)

- Full course information
- Course thumbnail/hero image
- Lessons list with:
  - Lesson order number
  - Title and description
  - Duration
  - Play button for enrolled users
- About section with:
  - Learning objectives
  - Accessibility features
- Enroll/Continue Learning buttons
- Progress tracking for enrolled users

### 3. My Courses (`/my-courses`)

- View all enrolled courses
- Separate sections for:
  - In Progress courses
  - Completed courses
- Course cards show:
  - Thumbnail
  - Title and instructor
  - Progress bar
  - Completion status
  - Completion date (for completed)
  - Continue/View buttons
- Empty state with link to browse courses

## Server Functions

### Course Operations

#### `getCourses(category?, limit, offset)`

Fetch all courses with optional filtering.

```typescript
const response = await getCourses({
  category: "technology", // Optional
  limit: 12,
  offset: 0,
});
// Returns: { success: true, courses: [...] }
```

#### `getCourseById(id)`

Get a single course by ID.

```typescript
const response = await getCourseById({ id: "course-id" });
// Returns: { success: true, course: {...} }
```

#### `getCourseLessons(courseId)`

Get all lessons for a course.

```typescript
const response = await getCourseLessons({ courseId: "course-id" });
// Returns: { success: true, lessons: [...] }
```

#### `getLessonById(id)`

Get a single lesson by ID.

```typescript
const response = await getLessonById({ id: "lesson-id" });
// Returns: { success: true, lesson: {...} }
```

### Enrollment Operations

#### `enrollInCourse(courseId)`

Enroll current user in a course.

```typescript
const response = await enrollInCourse({ courseId: "course-id" });
// Returns: { success: true, enrollment: {...} }
```

#### `getUserEnrollments()`

Get all courses user is enrolled in.

```typescript
const response = await getUserEnrollments();
// Returns: { success: true, enrollments: [...] }
```

#### `updateLessonProgress(courseId, completed)`

Update user's progress in a course.

```typescript
const response = await updateLessonProgress({
  courseId: "course-id",
  completed: true,
});
// Returns: { success: true, enrollment: {...} }
```

#### `completeCourse(courseId)`

Mark a course as completed.

```typescript
const response = await completeCourse({ courseId: "course-id" });
// Returns: { success: true, enrollment: {...}, message: "Course completed!" }
```

### Search & Discovery

#### `searchCourses(query, limit)`

Search for courses by title, description, or instructor.

```typescript
const response = await searchCourses({
  query: "python",
  limit: 12,
});
// Returns: { success: true, courses: [...] }
```

#### `createCourse(...)`

Create a new course (admin).

```typescript
const response = await createCourse({
  title: "Python Basics",
  description: "Learn Python from scratch",
  category: "technology",
  instructor: "John Doe",
  level: "beginner",
  duration: 480,
  thumbnail: "https://...",
});
// Returns: { success: true, course: {...} }
```

## Database Utilities

Located in `src/lib/db.courses.ts`:

- `fetchCourses(limit, offset)` - Get paginated courses
- `fetchCoursesByCategory(category, limit, offset)` - Filter by category
- `fetchCourseById(id)` - Get single course
- `fetchCourseLessons(courseId)` - Get lessons for course
- `fetchLessonById(id)` - Get single lesson
- `searchCourses(query, limit)` - Search courses
- `getCourseStats(courseId)` - Get enrollment statistics
- `getPopularCourses(limit)` - Get top courses by enrollment
- `getTopRatedCourses(limit)` - Get highest rated courses
- `getCourseCountByCategory()` - Get category statistics

## Usage Examples

### Browsing Courses

```typescript
import { CoursesCatalog } from "@/components/courses-catalog";

export function CoursesPage() {
  return <CoursesCatalog />;
}
```

### Viewing Course Details

```typescript
import { useRouter } from "@tanstack/react-router";
import { getCourseById } from "@/lib/course.functions";

function CourseDetail({ courseId }: { courseId: string }) {
  const [course, setCourse] = useState(null);

  useEffect(() => {
    getCourseById({ id: courseId }).then(res => {
      setCourse(res.course);
    });
  }, [courseId]);

  return <div>{course?.title}</div>;
}
```

### Enrolling in a Course

```typescript
import { enrollInCourse } from "@/lib/course.functions";

async function handleEnroll(courseId: string) {
  try {
    const response = await enrollInCourse({ courseId });
    if (response.success) {
      console.log("Enrolled successfully");
    }
  } catch (error) {
    console.error("Enrollment failed:", error);
  }
}
```

### Viewing My Courses

```typescript
import { MyCoursesPage } from "@/components/my-courses-page";

export function MyCoursesRoute() {
  return <MyCoursesPage />;
}
```

## Routes

| Route                       | Description                                  |
| --------------------------- | -------------------------------------------- |
| `/courses`                  | Browse all courses with filtering and search |
| `/courses/{courseId}`       | View course details and lessons              |
| `/my-courses`               | View user's enrolled courses and progress    |
| `/courses` (header link)    | Navigate to courses catalog                  |
| `/my-courses` (header link) | Navigate to user's courses                   |

## Accessibility Features

The courses system includes:

- ✓ Full keyboard navigation
- ✓ ARIA labels and descriptions
- ✓ Semantic HTML
- ✓ Screen reader optimized
- ✓ Video captions support
- ✓ Sign language interpretation support
- ✓ Audio transcripts support

## State Management

### Course Catalog

- `courses` - Array of course objects
- `loading` - Loading state
- `selectedCategory` - Active category filter
- `searchQuery` - Search term
- `enrolling` - Course being enrolled in

### Course Details

- `course` - Current course object
- `lessons` - Array of lesson objects
- `loading` - Loading state
- `enrolled` - Enrollment status

### My Courses

- `enrollments` - User's course enrollments
- `loading` - Loading state
- `user` - Current user object

## Error Handling

All functions include comprehensive error handling:

- Network errors
- Authentication errors
- Not found errors
- Validation errors

Errors are displayed to users with helpful messages.

## Future Enhancements

1. **Lesson Completion Tracking** - Track individual lesson completion
2. **Quiz/Assessments** - Add course assessments and quizzes
3. **Certificates** - Generate completion certificates
4. **Ratings & Reviews** - User course ratings and reviews
5. **Discussion Forums** - Course discussion communities
6. **Course Analytics** - Detailed progress analytics
7. **Recommendations** - ML-based course recommendations
8. **Live Sessions** - Instructor-led live learning sessions
9. **Mobile App** - Native mobile course experience
10. **Offline Access** - Download courses for offline viewing

## Security Considerations

1. **Row Level Security (RLS)** - Database access controlled by user roles
2. **Authentication** - Enrollment requires authentication
3. **Authorization** - Users can only see their own enrollments
4. **Data Validation** - Input validation on all endpoints
5. **Rate Limiting** - API rate limiting for search and enrollment

## Performance

- **Pagination** - Large datasets paginated
- **Caching** - Course data cached client-side
- **Image Optimization** - Thumbnails optimized
- **Lazy Loading** - Lessons loaded on demand
- **Database Indexes** - Key fields indexed for fast queries

## Testing

To test the courses system:

1. Navigate to `/courses` to browse courses
2. Click on a course to view details
3. Click "Enroll" to enroll in a course
4. Navigate to `/my-courses` to view enrollments
5. Click "Continue Learning" or "View Course"
6. Use search to find specific courses
7. Filter by category to browse
