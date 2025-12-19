import React from "react";
import { RecentActivityItem } from "../../types/dashboard.ts";
import "./RecentActivity.css";

interface RecentActivityProps {
  items: RecentActivityItem[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ items }) => (
  <section className="card recent-card">
    <div className="card-body">
      <h2 className="recent-card-title mb-3">Recent activity</h2>

      {items.length === 0 ? (
        <p className="recent-empty small mb-0">No activity yet.</p>
      ) : (
        <div className="recent-activity-scroll">
          <ul className="list-unstyled mb-0">
            {items.map((item) => (
              <li key={item.timestamp} className="recent-activity-item">
                <div className="recent-activity-title">{item.title}</div>
                <div className="recent-activity-description">
                  {item.description}
                </div>
                <div className="recent-activity-timestamp">
                  {item.timestamp}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </section>
);

export default RecentActivity;