// src/components/dashboard/StatsOverview.tsx
import React from "react";
import { DashboardStats } from "../../types/dashboard";
import './StatsOverview.css'

interface StatsOverviewProps {
  stats: DashboardStats;
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ stats }) => (
  <section className="card card-glass text-light h-100">
    <div className="card-body">
      <h2 className="card-title h6 mb-3 text-black">Overview</h2>
      <div className="row row-cols-1 row-cols-md-3 g-2">
        <div className="card-group col d-flex">
          <div className="p-2 rounded bg-dark border border-secondary-subtle">
            <div className="small text-muted text-white-50">Courses in progress</div>
            <div className="fw-semibold fs-6">{stats.coursesInProgress}</div>
          </div>
        </div>
        <div className="card-group col d-flex">
          <div className="p-2 rounded bg-dark border border-secondary-subtle">
            <div className="small text-muted text-white-50">Lessons completed</div>
            <div className="fw-semibold fs-6">{stats.lessonsCompleted}</div>
          </div>
        </div>
        <div className="card-group col d-flex">
          <div className="p-2 rounded bg-dark border border-secondary-subtle">
            <div className="small text-muted text-white-50">Quizzes taken</div>
            <div className="fw-semibold fs-6">{stats.quizzesTaken}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default StatsOverview;