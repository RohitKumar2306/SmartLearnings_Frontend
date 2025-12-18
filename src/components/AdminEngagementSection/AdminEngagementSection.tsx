import React from "react";
import { EngagementSection } from "../../types/dashboard";
import "./AdminEngagementSection.css"

interface AdminEngagementSectionProps {
  engagement: EngagementSection;
}

const AdminEngagementSection: React.FC<AdminEngagementSectionProps> = ({
                                                                         engagement,
                                                                       }) => {
  const last30d = engagement.activityLast30d || [];
  const weeklySignups = engagement.weeklySignups || [];

  return (
    <section className="card card-glass admin-section-card h-100">
      <div className="card-body">
        <h2 className="card-title h6 mb-3 text-light">
          Engagement &amp; Growth
        </h2>

        <div className="row g-3">
          {/* Daily active */}
          <div className="col-12 col-md-6">
            <h3 className="admin-mini-title mb-2">Daily Active Learners</h3>
            {last30d.length === 0 ? (
              <p className="small text-muted mb-0">
                Not enough data yet to show activity trends.
              </p>
            ) : (
              <ul className="list-unstyled mb-0 small admin-metric-list">
                {last30d.slice(-7).map((p) => (
                  <li
                    key={p.date}
                    className="admin-metric-row"
                  >
                    <span className="admin-metric-label">
                      {p.date}
                    </span>
                    <span className="admin-metric-value">
                      {p.activeLearners}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* New signups */}
          <div className="col-12 col-md-6">
            <h3 className="admin-mini-title mb-2">New Signups</h3>
            {weeklySignups.length === 0 ? (
              <p className="small text-muted mb-0">
                New learner signups will appear here once data is available.
              </p>
            ) : (
              <ul className="list-unstyled mb-0 small admin-metric-list">
                {weeklySignups.slice(-7).map((p) => (
                  <li
                    key={p.date}
                    className="admin-metric-row"
                  >
                    <span className="admin-metric-label">
                      {p.date}
                    </span>
                    <span className="admin-metric-value">
                      {p.activeLearners}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminEngagementSection;