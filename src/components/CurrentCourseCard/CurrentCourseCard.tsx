// src/components/dashboard/CurrentCourseCard.tsx
import React from "react";
import { CourseSummary } from "../../types/dashboard";
import ProgressBar from "../ProgressBar/ProgressBar.tsx";

interface CurrentCourseCardProps {
  course: CourseSummary | null;
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
      <section className="card card-glass text-light">
        <div className="card-body">
          <h2 className="card-title h6 mb-2 text-dark">Continue learning</h2>
          <p className="text-muted small mb-3">
            You haven&apos;t started any course yet. Browse the catalog to
            begin.
          </p>
          <button
            className="btn btn-primary btn-sm"
            onClick={onBrowseCourses}
          >
            Browse courses
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="card card-glass text-light">
      <div className="card-body">
        <h2 className="card-title h6 mb-1 text-dark">Continue learning</h2>
        <p className="text-muted small mb-3">
          Pick up where you left off:
        </p>

        <h3 className="h6 mb-2 text-muted">{course.courseTitle}</h3>
        <div className="d-flex align-items-center gap-2 mb-3">
          <div className="flex-grow-1">
            <ProgressBar value={course.progressPercent} />
          </div>
          <span className="small text-muted">
            {course.progressPercent}% complete
          </span>
        </div>

        <button
          className="btn btn-primary btn-sm"
          onClick={() => onContinue && onContinue(course.courseId)}
        >
          Continue course
        </button>
      </div>
    </section>
  );
};

export default CurrentCourseCard;