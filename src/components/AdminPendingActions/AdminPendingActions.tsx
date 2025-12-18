import React from "react";
import { PendingActionsSection } from "../../types/dashboard";
import "./AdminPendingActions.css"

interface AdminPendingActionsProps {
  pending: PendingActionsSection;
}

const AdminPendingActions: React.FC<AdminPendingActionsProps> = ({ pending }) => {
  const courses = pending.coursesPendingReview || [];

  return (
    <section className="card card-glass admin-section-card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div>
            <h2 className="card-title h6 mb-0 text-light">Pending actions</h2>
            <p className="admin-section-subtitle mb-0">
              Items that may need your attention.
            </p>
          </div>
          <span className="badge admin-pill-badge admin-pill-badge--soft">
            {courses.length}
          </span>
        </div>

        {/* Courses pending review */}
        <div className="admin-subsection">
          <h3 className="admin-mini-title mb-1">Courses awaiting review</h3>

          {courses.length === 0 ? (
            <div className="admin-empty-state">
              <p className="small mb-0">
                No courses are currently pending review.
              </p>
            </div>
          ) : (
            <ul className="list-unstyled mb-0 small admin-pending-list">
              {courses.map((c) => (
                <li
                  key={c.courseId}
                  className="admin-pending-item"
                >
                  <div className="d-flex justify-content-between">
                    <span className="fw-semibold">{c.courseTitle}</span>
                    <span className="text-white-50">
                      {new Date(c.submittedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-white-50">
                    Instructor: {c.instructorName || "Unknown"}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* (Future) instructorRequests & flaggedContent sections can live here */}
      </div>
    </section>
  );
};

export default AdminPendingActions;