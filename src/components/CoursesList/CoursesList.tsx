import React from "react";
import { CourseSummary } from "../../types/dashboard";
import ProgressBar from "../ProgressBar/ProgressBar.tsx";
import "./CoursesList.css";

interface CoursesListProps {
  courses: CourseSummary[];
  onSelectCourse?: (courseId: string) => void;
}

const CoursesList: React.FC<CoursesListProps> = ({
                                                   courses,
                                                   onSelectCourse,
                                                 }) => (
  <section className="card courses-card">
    <div className="card-body">
      <h2 className="courses-card-title mb-3">Your Courses</h2>

      {courses.length === 0 ? (
        <p className="courses-empty small mb-0">
          You are not enrolled in any courses yet.
        </p>
      ) : (
        <div className="courses-scroll">
          <ul className="list-unstyled mb-0 overflow-y-auto">
            {courses.map((course) => (
              <li
                key={course.courseId}
                className="courses-item"
                style={{ cursor: onSelectCourse ? "pointer" : "default" }}
                onClick={() => onSelectCourse && onSelectCourse(course.courseId)}
              >
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span className="courses-item-title">
                    {course.courseTitle}
                  </span>
                  <span
                    className={`badge rounded-pill courses-status courses-status--${course.status.toLowerCase()}`}
                  >
                    {course.status.replace("_", " ")}
                  </span>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <div className="flex-grow-1">
                    <ProgressBar value={course.progressPercent} />
                  </div>
                  <span className="courses-item-progress small">
                    {course.progressPercent}%
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </section>
);

export default CoursesList;