export type CourseStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";

export interface CourseSummary {
  id: number;
  title: string;
  progress: number; // 0–100
  status: CourseStatus;
}

export interface ActivityItem {
  id: number;
  description: string;
  timestamp: string; // simple string for now
}

export interface DashboardStats {
  coursesInProgress: number;
  lessonsCompleted: number;
  quizzesTaken: number;
}