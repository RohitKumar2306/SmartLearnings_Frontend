import React from "react";
import { CoursePerformanceSummary } from "../../types/dashboard";
import "./AdminCoursePerformanceTable.css";

interface AdminCoursePerformanceTableProps {
  courses: CoursePerformanceSummary[];
}

const AdminCoursePerformanceTable: React.FC<AdminCoursePerformanceTableProps> = ({
                                                                                   courses,
                                                                                 }) => (
  <section className="card card-glass text-light admin-course-table admin-section-card">
    <div className="card-body">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div>
          <h2 className="card-title h6 mb-0 text-light">Course Performance</h2>
          <p className="small text-muted mb-0 text-white-50">
            Track enrollment, completion, and performance.
          </p>
        </div>
        <span className="badge bg-secondary-subtle text-secondary-emphasis">
          {courses.length} courses
        </span>
      </div>

      {courses.length === 0 ? (
        <p className="text-muted small mb-0">
          No courses found yet. Once instructors start publishing, stats will
          appear here.
        </p>
      ) : (
        <div className="admin-table-scroll">
          <table className="admin-table table-sm align-middle mb-0">
            <thead>
            <tr>
              <th scope="col">Course</th>
              <th scope="col" className="text-center">Instructor</th>
              <th scope="col" className="text-center">Enrolled</th>
              <th scope="col" className="text-center">Completion</th>
              <th scope="col" className="text-center">Avg. Score</th>
              <th scope="col" className="text-center">Status</th>
            </tr>
            </thead>
            <tbody>
            {courses.map((course) => (
              <tr key={course.courseId}>
                <td className="fw-semibold small">{course.courseTitle}</td>
                <td className="small text-center">
                  {course.instructorName || "—"}
                </td>
                <td className="small text-center">
                  {course.enrolledLearners}
                </td>
                <td className="small text-center">
                  {course.completionRate.toFixed(1)}%
                </td>
                <td className="small text-center">
                  {course.averageQuizScore.toFixed(1)}%
                </td>
                <td className="small text-center">
                    <span
                      className={`badge rounded-pill admin-status-badge ${
                        course.status === "PUBLISHED"
                          ? "admin-status-published"
                          : "admin-status-unpublished"
                      }`}
                    >
                      {course.status}
                    </span>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </section>
);

export default AdminCoursePerformanceTable;