import React from "react";
import { DashboardStats } from "../../types/dashboard";
import "./StatsOverview.css";

interface StatsOverviewProps {
  stats: DashboardStats;
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ stats }) => (
  <section className="card stats-card h-100">
    <div className="card-body">
      <h2 className="stats-card-title mb-3">Overview</h2>
      <div className="row row-cols-1 row-cols-md-3 g-3">
        <div className="col d-flex">
          <div className="stats-kpi-card">
            <div className="stats-kpi-label">Courses in progress</div>
            <div className="stats-kpi-value">{stats.coursesInProgress}</div>
          </div>
        </div>
        <div className="col d-flex">
          <div className="stats-kpi-card">
            <div className="stats-kpi-label">Lessons completed</div>
            <div className="stats-kpi-value">{stats.lessonsCompleted}</div>
          </div>
        </div>
        <div className="col d-flex">
          <div className="stats-kpi-card">
            <div className="stats-kpi-label">Quizzes taken</div>
            <div className="stats-kpi-value">{stats.quizzesTaken}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default StatsOverview;