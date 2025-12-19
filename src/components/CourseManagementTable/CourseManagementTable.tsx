import React from "react";
import { ManagedCourse, CoursesTableMode } from "../../types/courses.ts";
import "./CourseManagementTable.css";

interface Props {
  mode: CoursesTableMode;
  courses: ManagedCourse[];
  onOpenCourse?: (courseId: string) => void;
  onTogglePublish?: (course: ManagedCourse) => void;
  onOpenReview?: (course: ManagedCourse) => void;
  onEditCourse?: (course: ManagedCourse) => void;
  onSubmitForReview?: (course: ManagedCourse) => void;
}

const CoursesManagementTable: React.FC<Props> = ({
                                                   mode,
                                                   courses,
                                                   onOpenCourse,
                                                   onTogglePublish,
                                                   onOpenReview,
                                                   onEditCourse,
                                                   onSubmitForReview,
                                                 }) => {
  const showInstructorCol = mode === "admin";

  const renderActions = (course: ManagedCourse) => {
    if (mode === "admin") {
      return (
        <div className="cm-actions">
          {course.status !== "PENDING_REVIEW" && (
            <button
              type="button"
              className="btn btn-xxs btn-outline-light me-1"
              onClick={() => onTogglePublish && onTogglePublish(course)}
            >
              {course.status === "PUBLISHED" ? "Unpublish" : "Publish"}
            </button>
          )}
          {course.status === "PENDING_REVIEW" && (
            <button
              type="button"
              className="btn btn-xxs btn-primary"
              onClick={() => onOpenReview && onOpenReview(course)}
            >
              Review
            </button>
          )}
        </div>
      );
    }

    // mode === "instructor"
    return (
      <div className="cm-actions">
        <button
          type="button"
          className="btn btn-xxs btn-outline-light me-1"
          onClick={() => onEditCourse && onEditCourse(course)}
        >
          Edit
        </button>
        {course.status === "DRAFT" && (
          <button
            type="button"
            className="btn btn-xxs btn-primary"
            onClick={() => onSubmitForReview && onSubmitForReview(course)}
          >
            Submit
          </button>
        )}
      </div>
    );
  };

  return (
    <section className="card card-glass text-light admin-course-table">
      <div className="card-body">
        {/* header... can also vary by mode if you want */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div>
            <h2 className="card-title h6 mb-0 text-light">
              {mode === "admin" ? "All Courses" : "My Courses"}
            </h2>
            <p className="small text-muted mb-0">
              {mode === "admin"
                ? "Review and manage all courses on the platform."
                : "Manage the courses you author on LearnSphere."}
            </p>
          </div>
          <span className="badge bg-secondary-subtle text-secondary-emphasis">
            {courses.length} courses
          </span>
        </div>

        {courses.length === 0 ? (
          <p className="text-muted small mb-0">
            {mode === "admin"
              ? "No courses found yet."
              : "You haven’t created any courses yet."}
          </p>
        ) : (
          <div className="admin-table-scroll">
            <table className="table table-sm align-middle mb-0 admin-table">
              <thead>
              <tr>
                <th scope="col">Course</th>
                {showInstructorCol && (
                  <th scope="col" className="text-center">
                    Instructor
                  </th>
                )}
                <th scope="col" className="text-center">
                  Enrolled
                </th>
                <th scope="col" className="text-center">
                  Status
                </th>
                <th scope="col" className="text-center">
                  Updated
                </th>
                <th scope="col" className="text-end">
                  Actions
                </th>
              </tr>
              </thead>
              <tbody>
              {courses.map((course) => (
                <tr
                  key={course.courseId}
                  onClick={() =>
                    onOpenCourse && onOpenCourse(course.courseId)
                  }
                  style={{ cursor: onOpenCourse ? "pointer" : "default" }}
                >
                  <td className="fw-semibold small admin-cell-course">
                    {course.title}
                    <div className="small admin-cell-muted">
                      {course.category}
                    </div>
                  </td>

                  {showInstructorCol && (
                    <td className="small text-center admin-cell-muted">
                      {course.instructorName || "—"}
                    </td>
                  )}

                  <td className="small text-center">{course.enrolledCount}</td>

                  <td className="small text-center">
                    {/* reuse your status pill CSS */}
                    <span
                      className={[
                        "admin-status-pill",
                        course.status === "PUBLISHED"
                          ? "admin-status-pill--published"
                          : "admin-status-pill--draft",
                      ].join(" ")}
                    >
                        {course.status}
                      </span>
                  </td>

                  <td className="small text-center admin-cell-muted">
                    {new Date(course.lastUpdatedAt).toLocaleDateString()}
                  </td>

                  <td className="small text-end">{renderActions(course)}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default CoursesManagementTable;