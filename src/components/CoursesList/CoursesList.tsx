// src/components/dashboard/CoursesList.tsx
import React from "react";
import { CourseSummary } from "../../types/dashboard";
import ProgressBar from "../ProgressBar/ProgressBar.tsx";

interface CoursesListProps {
  courses: CourseSummary[];
  onSelectCourse?: (courseId: number) => void;
}

const CoursesList: React.FC<CoursesListProps> = ({
                                                   courses,
                                                   onSelectCourse,
                                                 }) => (
  <section className="card card-glass text-light">
    <div className="card-body">
      <h2 className="card-title h6 mb-3 text-dark">Your Courses</h2>

      {courses.length === 0 ? (
        <p className="text-muted small mb-0 text-muted">
          You are not enrolled in any courses yet.
        </p>
      ) : (
        <ul className="list-unstyled mb-0">
          {courses.map((course) => (
            <li
              key={course.id}
              className="py-2 border-bottom border-secondary-subtle text-muted"
              style={{ cursor: onSelectCourse ? "pointer" : "default" }}
              onClick={() => onSelectCourse && onSelectCourse(course.id)}
            >
              <div className="d-flex justify-content-between align-items-center mb-1">
                <span className="fw-semibold small">{course.title}</span>
                <span
                  className={`badge rounded-pill text-capitalize ${
                    course.status === "IN_PROGRESS"
                      ? "bg-primary-subtle text-primary-emphasis"
                      : course.status === "COMPLETED"
                        ? "bg-success-subtle text-success-emphasis"
                        : "bg-secondary-subtle text-secondary-emphasis"
                  }`}
                >
                  {course.status.replace("_", " ")}
                </span>
              </div>

              <div className="d-flex align-items-center gap-2">
                <div className="flex-grow-1">
                  <ProgressBar value={course.progress} />
                </div>
                <span className="small text-muted">
                  {course.progress}%
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  </section>
);

export default CoursesList;
