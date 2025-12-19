export type CourseStatus = "PUBLISHED" | "DRAFT" | "PENDING_REVIEW";

export interface ManagedCourse {
  courseId: string;
  title: string;
  category: string;
  instructorName?: string;
  status: CourseStatus;
  enrolledCount: number;
  createdAt: string;
  lastUpdatedAt: string;
}

export type CoursesTableMode = "admin" | "instructor";

export interface CoursesManagementTableProps {
  mode: CoursesTableMode;
  courses: ManagedCourse[];

  // shared: open details
  onOpenCourse?: (courseId: string) => void;

  // admin-only actions
  onTogglePublish?: (course: ManagedCourse) => void;
  onOpenReview?: (course: ManagedCourse) => void;

  // instructor-only actions
  onEditCourse?: (course: ManagedCourse) => void;
  onSubmitForReview?: (course: ManagedCourse) => void;
}