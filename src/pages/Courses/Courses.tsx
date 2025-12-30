import React, { useEffect, useMemo, useState } from "react";
import "./Courses.css";
import CoursesToolbar, {StatusOption, SortOption} from "../../components/CoursesToolbar/CoursesToolbar.tsx";
import CoursesTable from "../../components/CourseManagementTable/CourseManagementTable.tsx";
import { ManagedCourse, CourseStatus } from "../../types/courses.ts";
import CourseCategoryManager, {
  CourseCategory,
  CourseTag,
} from '../../components/CourseCategoryManager/CourseCategoryManager.tsx';
import CourseMetadataDrawer from '../../components/CourseMetadataDrawer/CourseMetadataDrawer.tsx';

export type AdminCourseStatus = CourseStatus;

export type AdminCourse = ManagedCourse;

// --- TEMP MOCK DATA (courses) ---
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
    tags: ["Java", "Spring Boot"],
  },
  {
    courseId: "JAVA_DSA_101",
    title: "Java & DSA Foundations",
    category: "Programming",
    instructorName: "Rohit Kumar",
    status: "PUBLISHED",
    enrolledCount: 128,
    createdAt: "2025-11-01T10:15:00Z",
    lastUpdatedAt: "2025-12-15T08:10:00Z",
    tags: ["Java", "Spring Boot"],
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
    tags: ["Java", "Python"],
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
    tags: ["Java", "Python"],
  },
];

// --- TEMP MOCK DATA (categories / tags) ---
const INITIAL_CATEGORIES: CourseCategory[] = [
  { id: "cat_programming", name: "Programming" },
  { id: "cat_backend", name: "Backend" },
  { id: "cat_algorithms", name: "Algorithms" },
];

const INITIAL_TAGS: CourseTag[] = [
  { id: "tag_java", name: "Java", categoryId: "cat_programming" },
  { id: "tag_spring", name: "Spring Boot", categoryId: "cat_backend" },
  { id: "tag_dsa", name: "Data Structures", categoryId: "cat_algorithms" },
  { id: "tag_interview", name: "Interview Prep" },
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

  // categories & tags
  const [categories, setCategories] = useState<CourseCategory[]>(
    INITIAL_CATEGORIES
  );
  const [tags, setTags] = useState<CourseTag[]>(INITIAL_TAGS);
  const [isCategoryManagerOpen, setIsCategoryManagerOpen] =
    useState<boolean>(false);

  // For categories and tags
  const [editingCourse, setEditingCourse] = useState<AdminCourse | null>(null);

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

    if (searchTerm.trim()) {
      const q = searchTerm.trim().toLowerCase();
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.courseId.toLowerCase().includes(q)
        // later you can add instructorName / tags here
      );
    }

    if (statusFilter !== "ALL") {
      list = list.filter((c) => c.status === statusFilter);
    }

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
    const found = allCourses.find((c) => c.courseId === courseId);
    if (found) {
      setEditingCourse(found);
    }
  };

  const handleSaveCourseMetadata = (updated: AdminCourse) => {
    setAllCourses((prev) =>
      prev.map((c) => (c.courseId === updated.courseId ? updated : c))
    );
  };

  const handleTogglePublish = (course: AdminCourse) => {
    console.log(
      course.status === "PUBLISHED" ? "Unpublish course:" : "Publish course:",
      course.courseId
    );

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
  };

  const handleCreateCourseClick = () => {
    console.log("Go to create course wizard");
  };

  // ---- category & tag handlers (front-end only) ----
  const handleCreateCategory = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;

    setCategories((prev) => [
      ...prev,
      { id: `cat_${Date.now()}`, name: trimmed },
    ]);
  };

  const handleDeleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    setTags((prev) =>
      prev.map((t) =>
        t.categoryId === id ? { ...t, categoryId: undefined } : t
      )
    );
  };

  const handleCreateTag = (name: string, categoryId?: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;

    setTags((prev) => [
      ...prev,
      { id: `tag_${Date.now()}`, name: trimmed, categoryId },
    ]);
  };

  const handleDeleteTag = (id: string) => {
    setTags((prev) => prev.filter((t) => t.id !== id));
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

          <div className="admin-courses-header-actions mt-3 mt-md-0">
            <button
              type="button"
              className="btn btn-outline-light btn-sm admin-courses-manage-btn mb-2 mb-md-0 me-md-2"
              onClick={() => setIsCategoryManagerOpen(true)}
            >
              Manage categories
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm admin-courses-create-btn"
              onClick={handleCreateCourseClick}
            >
              + New course
            </button>
          </div>
        </div>

        {/* Combined card: toolbar + table */}
        <div className="row g-3">
          <div className="col-12">
            <section className="card card-glass admin-courses-card">
              <div className="card-body">
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

                <div className="mt-3">
                  <CoursesTable
                    mode="admin"
                    courses={filteredCourses}
                    onOpenCourse={handleOpenCourse}
                    onTogglePublish={handleTogglePublish}
                    onOpenReview={handleOpenReview}
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Side drawer for categories & tags */}
      <CourseCategoryManager
        open={isCategoryManagerOpen}
        onClose={() => setIsCategoryManagerOpen(false)}
        categories={categories}
        tags={tags}
        onCreateCategory={handleCreateCategory}
        onDeleteCategory={handleDeleteCategory}
        onCreateTag={handleCreateTag}
        onDeleteTag={handleDeleteTag}
      />

      {/* Adding tags to courses */}
      <CourseMetadataDrawer
        open={!!editingCourse}
        onClose={() => setEditingCourse(null)}
        course={editingCourse}
        categories={categories}
        tags={tags}
        onSave={handleSaveCourseMetadata}
      />

    </div>
  );
};

export default AdminCoursesPage;