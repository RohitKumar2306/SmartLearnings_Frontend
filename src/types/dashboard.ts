// Overview stats (also used by StatsOverview)
export interface DashboardStats {
  coursesInProgress: number;
  lessonsCompleted: number;
  quizzesTaken: number;
}

export interface ContinueLearningCard {
  courseId: string;
  courseTitle: string;
  progressPercent: number;
}

export interface CourseSummary {
  courseId: string;
  courseTitle: string;
  status: string;
  progressPercent: number;
  lessonsCompleted: number;
  totalLessons: number;
}

export interface RecentActivityItem {
  type: string;         // e.g. "COURSE"
  title: string;
  description: string;
  timestamp: string;    // ISO string from backend
}

export interface StudentDashboardResponse {
  overview: DashboardStats;
  continueLearning: ContinueLearningCard | null;
  courses: CourseSummary[];
  recentActivity: RecentActivityItem[];
}