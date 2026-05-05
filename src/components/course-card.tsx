import { Link } from "@tanstack/react-router";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Users, Clock } from "lucide-react";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail?: string;
  instructor: string;
  level: string;
  duration: number;
  rating: number;
  students: number;
  enrolled?: boolean;
  onEnroll?: () => void;
}

const categoryColors: Record<string, string> = {
  technology: "bg-blue-100 text-blue-800",
  business: "bg-green-100 text-green-800",
  "life-skills": "bg-yellow-100 text-yellow-800",
  accessibility: "bg-purple-100 text-purple-800",
  creative: "bg-pink-100 text-pink-800",
};

const levelColors: Record<string, string> = {
  beginner: "bg-green-50 text-green-700 border-green-200",
  intermediate: "bg-yellow-50 text-yellow-700 border-yellow-200",
  advanced: "bg-red-50 text-red-700 border-red-200",
};

export function CourseCard({
  id,
  title,
  description,
  category,
  thumbnail,
  instructor,
  level,
  duration,
  rating,
  students,
  enrolled,
  onEnroll,
}: CourseCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
      {thumbnail && (
        <div className="aspect-video w-full overflow-hidden bg-muted">
          <img
            src={thumbnail}
            alt={title}
            className="h-full w-full object-cover hover:scale-105 transition-transform"
          />
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <Badge className={categoryColors[category] || "bg-gray-100 text-gray-800"}>
            {category.replace("-", " ")}
          </Badge>
          <Badge variant="outline" className={levelColors[level]}>
            {level}
          </Badge>
        </div>
        <h3 className="mt-3 font-semibold line-clamp-2 hover:line-clamp-none">{title}</h3>
      </CardHeader>

      <CardContent className="flex-1 pb-3">
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        <p className="mt-3 text-sm font-medium text-foreground">by {instructor}</p>

        <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{duration} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{students.toLocaleString()} students</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{rating.toFixed(1)}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="gap-2 border-t pt-3">
        <Link to={`/courses/${id}`} className="flex-1">
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>
        {onEnroll && (
          <Button onClick={onEnroll} disabled={enrolled} className="flex-1">
            {enrolled ? "Enrolled" : "Enroll"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
