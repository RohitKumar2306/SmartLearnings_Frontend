import React, { useEffect, useMemo, useState } from "react";
import "./Courses.css";
import CoursesToolbar, {StatusOption, SortOption} from "../../components/CoursesToolbar/CoursesToolbar.tsx";
import CoursesTable from "../../components/CourseManagementTable/CourseManagementTable.tsx";
import { ManagedCourse, CourseStatus } from "../../types/courses.ts";

export type AdminCourseStatus = CourseStatus;

export type AdminCourse = ManagedCourse;

// Temporary mock data – replace with API response later
const MOCK_COURSES: AdminCourse[] = [
  {
    courseId: "JAVA_DSA_101",
    title: "Java & DSA Foundations",
    category: "Programming",
    instructorName: "Rohit Kumar",
    status: "PUBLISHED",
    enrolledCount: 128,
    createdAt: "2025-11-01T10:15:00Z",
    lastUpdatedAt: "2025-12-15T08:10:00Z",
  },
  {
    courseId: "SPRING_BOOT_API",
    title: "Spring Boot REST APIs",
    category: "Backend",
    instructorName: "Ananya Gupta",
    status: "PENDING_REVIEW",
    enrolledCount: 42,
    createdAt: "2025-12-10T14:32:00Z",
    lastUpdatedAt: "2025-12-16T12:10:00Z",
  },
  {
    courseId: "ALGO_PATTERNS",
    title: "Algorithm Patterns for Interviews",
    category: "Algorithms",
    instructorName: "John Mathews",
    status: "DRAFT",
    enrolledCount: 0,
    createdAt: "2025-12-05T09:00:00Z",
    lastUpdatedAt: "2025-12-12T11:55:00Z",
  },
];

const STATUS_OPTIONS: StatusOption[] = [
  { value: "ALL", label: "All statuses" },
  { value: "PUBLISHED", label: "Published" },
  { value: "PENDING_REVIEW", label: "Pending review" },
  { value: "DRAFT", label: "Draft" },
];

const SORT_OPTIONS: SortOption[] = [
  { value: "recent", label: "Recently updated" },
  { value: "title", label: "Title (A–Z)" },
  { value: "enrolled", label: "Enrolled learners" },
];

type SortBy = "recent" | "title" | "enrolled";

const AdminCoursesPage: React.FC = () => {
  const [allCourses, setAllCourses] = useState<AdminCourse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<AdminCourseStatus | "ALL">(
    "ALL"
  );
  const [sortBy, setSortBy] = useState<SortBy>("recent");

  // Simulated fetch – plug in your real API here later
  useEffect(() => {
    setLoading(true);
    setError(null);

    // TODO: replace this with fetchAdminCourses()
    setTimeout(() => {
      setAllCourses(MOCK_COURSES);
      setLoading(false);
    }, 200);
  }, []);

  const filteredCourses = useMemo(() => {
    let list = [...allCourses];

    // Search filter
    if (searchTerm.trim()) {
      const q = searchTerm.trim().toLowerCase();
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.courseId.toLowerCase().includes(q) /*||
          c.instructorName.toLowerCase().includes(q)*/ // Add later when developing instructor copurses page
      );
    }

    // Status filter
    if (statusFilter !== "ALL") {
      list = list.filter((c) => c.status === statusFilter);
    }

    // Sorting
    list.sort((a, b) => {
      if (sortBy === "recent") {
        return (
          new Date(b.lastUpdatedAt).getTime() -
          new Date(a.lastUpdatedAt).getTime()
        );
      }
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === "enrolled") {
        return b.enrolledCount - a.enrolledCount;
      }
      return 0;
    });

    return list;
  }, [allCourses, searchTerm, statusFilter, sortBy]);

  const handleOpenCourse = (courseId: string) => {
    console.log("Open course detail:", courseId);
    // later: navigate(`/admin/courses/${courseId}`);
  };

  const handleTogglePublish = (course: AdminCourse) => {
    console.log(
      course.status === "PUBLISHED" ? "Unpublish course:" : "Publish course:",
      course.courseId
    );

    // Front-end only: optimistic toggle
    setAllCourses((prev) =>
      prev.map((c) =>
        c.courseId === course.courseId
          ? {
            ...c,
            status:
              c.status === "PUBLISHED"
                ? ("DRAFT" as AdminCourseStatus)
                : ("PUBLISHED" as AdminCourseStatus),
          }
          : c
      )
    );
  };

  const handleOpenReview = (course: AdminCourse) => {
    console.log("Open review drawer / modal for:", course.courseId);
    // later: open side panel/modal with full course info, accept/reject, notes, etc.
  };

  const handleCreateCourseClick = () => {
    console.log("Go to create course wizard");
    // later: navigate("/admin/courses/new")
  };

  if (loading) {
    return (
      <div className="dashboard-root admin-courses-root">
        <div className="container py-4">
          <p className="text-muted mb-0">Loading courses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-root admin-courses-root">
        <div className="container py-4">
          <div className="alert alert-danger mb-0">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-root admin-courses-root">
      <div className="container">
        {/* Header */}
        <div className="admin-courses-header d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
          <div>
            <h1 className="admin-courses-title mb-1">Courses</h1>
            <p className="admin-courses-subtitle mb-0">
              Manage all courses on LearnSphere – review, publish, and keep your
              catalog healthy.
            </p>
          </div>
          <button
            type="button"
            className="btn btn-primary btn-sm admin-courses-create-btn mt-3 mt-md-0"
            onClick={handleCreateCourseClick}
          >
            + New course
          </button>
        </div>

        {/* Toolbar (filters/search) */}
        <div className="row g-3 mb-3">
          <div className="col-12">
            <CoursesToolbar
              title="Manage courses"
              subtitle="Search, filter, and review all courses."
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              statusFilter={statusFilter}
              onStatusChange={(value) =>
                setStatusFilter(value as AdminCourseStatus | "ALL")
              }
              statusOptions={STATUS_OPTIONS}
              sortBy={sortBy}
              onSortChange={(value) => setSortBy(value as SortBy)}
              sortOptions={SORT_OPTIONS}
              totalCount={allCourses.length}
              visibleCount={filteredCourses.length}
            />
          </div>
        </div>

        {/* Table */}
        <div className="row g-3">
          <div className="col-12">
            <CoursesTable
              mode="admin"
              courses={filteredCourses}
              onOpenCourse={handleOpenCourse}
              onTogglePublish={handleTogglePublish}
              onOpenReview={handleOpenReview}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCoursesPage;