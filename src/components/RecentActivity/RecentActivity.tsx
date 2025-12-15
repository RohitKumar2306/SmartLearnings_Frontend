// src/components/dashboard/RecentActivity.tsx
import React from "react";
import { ActivityItem } from "../../types/dashboard";

interface RecentActivityProps {
  items: ActivityItem[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ items }) => (
  <section className="card card-glass text-light">
    <div className="card-body">
      <h2 className="card-title h6 mb-3 text-dark">Recent activity</h2>

      {items.length === 0 ? (
        <p className="text-muted small mb-0 text-muted">No activity yet.</p>
      ) : (
        <ul className="list-unstyled mb-0">
          {items.map((item) => (
            <li key={item.id} className="mb-2">
              <div className="small text-body">{item.description}</div>
              <div className="small text-black-50">{item.timestamp}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  </section>
);

export default RecentActivity;