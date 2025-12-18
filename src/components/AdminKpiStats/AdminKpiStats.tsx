import React from "react";
import { AdminKpiStats } from "../../types/dashboard";
import "./AdminKpiStats.css";

interface AdminKpiCardsProps {
  stats: AdminKpiStats;
}

const AdminKpiCards: React.FC<AdminKpiCardsProps> = ({ stats }) => {
  const items = [
    {
      label: "Total learners",
      value: stats.totalLearners,
      helper: "All registered students",
      icon: "👥",
    },
    {
      label: "Active in last 7 days",
      value: stats.activeLearners7d,
      helper: "Unique learners with activity",
      icon: "⚡",
    },
    {
      label: "Published courses",
      value: stats.publishedCourses,
      helper: `${stats.totalCourses} total courses`,
      icon: "📚",
    },
    {
      label: "Draft courses",
      value: stats.draftCourses,
      helper: "Being prepared by instructors",
      icon: "📝",
    },
  ];

  return (
    <section className="card card-glass admin-section-card">
      <div className="card-body">
        <h2 className="card-title h6 mb-3 text-light">Platform Overview</h2>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-3">
          {items.map((item, idx) => (
            <div className="col" key={idx}>
              <div className="admin-kpi-card kpi-card-hover">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div className="admin-kpi-label text-uppercase">
                    {item.label}
                  </div>
                  <div className="admin-kpi-icon" aria-hidden="true">
                    {item.icon}
                  </div>
                </div>
                <div className="admin-kpi-value">
                  {item.value}
                </div>
                {item.helper && (
                  <div className="admin-kpi-helper">
                    {item.helper}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdminKpiCards;