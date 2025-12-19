import React from "react";
import { ContinueLearningCard } from '../../types/dashboard';
import ProgressBar from "../ProgressBar/ProgressBar.tsx";
import "./CurrentCourseCard.css";

interface CurrentCourseCardProps {
  course: ContinueLearningCard | null;
  onContinue?: (courseId: string) => void;
  onBrowseCourses?: () => void;
}

const CurrentCourseCard: React.FC<CurrentCourseCardProps> = ({
                                                               course,
                                                               onContinue,
                                                               onBrowseCourses,
                                                             }) => {
  if (!course) {
    return (
      <section className="card current-course-card">
        <div className="card-body">
          <h2 className="current-course-title mb-2">Continue learning</h2>
          <p className="current-course-subtitle mb-3">
            You haven&apos;t started any course yet. Browse the catalog to
            begin.
          </p>
          <button
            className="btn btn-primary btn-sm current-course-btn"
            onClick={onBrowseCourses}
          >
            Browse courses
          </button>
        </div>
      </section>
    );
  }

  console.log(course);

  return (
    <section className="card current-course-card">
      <div className="card-body">
        <h2 className="current-course-title mb-1">Continue learning</h2>
        <p className="current-course-subtitle mb-3">
          Pick up where you left off:
        </p>

        <h3 className="current-course-name mb-2">{course.courseTitle}</h3>
        <div className="d-flex align-items-center gap-2 mb-3">
          <div className="flex-grow-1">
            <ProgressBar value={course.progressPercent} />
          </div>
          <span className="current-course-progress">
            {course.progressPercent}% complete
          </span>
        </div>

        <button
          className="btn btn-primary btn-sm current-course-btn"
          onClick={() => onContinue && onContinue(course.courseId)}
        >
          Continue course
        </button>
      </div>
    </section>
  );
};

export default CurrentCourseCard;