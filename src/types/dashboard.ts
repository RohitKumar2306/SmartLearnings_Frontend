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

// ---------- ADMIN DASHBOARD TYPES ----------

export interface AdminKpiStats {
  totalLearners: number;
  activeLearners7d: number;
  totalCourses: number;
  publishedCourses: number;
  draftCourses: number;
}

export interface CoursePerformanceSummary {
  courseId: string;
  courseTitle: string;
  instructorName: string;
  enrolledLearners: number;
  completionRate: number;        // percentage 0–100
  averageQuizScore: number;      // percentage 0–100 (or avg progress)
  status: string;                // "PUBLISHED" | "UNPUBLISHED"
}

export interface EngagementPoint {
  date: string;          // ISO date string ("2025-12-10")
  activeLearners: number;
}

export interface CohortSummary {
  orgName: string;
  activeLearners: number;
  totalEnrollments: number;
}

export interface PendingCourseReviewSummary {
  courseId: number;
  courseTitle: string;
  instructorName: string;
  submittedAt: string;   // ISO datetime
}

export interface PendingInstructorRequestSummary {
  id: number;
  instructorName: string;
  requestedAt: string;
  status: string;
}

export interface FlaggedContentSummary {
  id: number;
  courseTitle: string;
  lessonTitle: string;
  reason: string;
  flaggedAt: string;
}

export interface EngagementSection {
  activityLast30d: EngagementPoint[];
  topOrgs: CohortSummary[];
  weeklySignups: EngagementPoint[];
}

export interface PendingActionsSection {
  coursesPendingReview: PendingCourseReviewSummary[];
  instructorRequests: PendingInstructorRequestSummary[];
  flaggedContent: FlaggedContentSummary[];
}

export interface AdminDashboardResponse {
  kpis: AdminKpiStats;
  coursePerformance: CoursePerformanceSummary[];
  engagement: EngagementSection;
  pendingActions: PendingActionsSection;
}