// src/components/dashboard/ProgressBar.tsx
import React from "react";

interface ProgressBarProps {
  value: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div className="ls-progress">
      <div
        className="ls-progress-bar"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
};

export default ProgressBar;