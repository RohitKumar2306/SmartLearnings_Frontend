// src/components/dashboard/ProgressBar.tsx
import React from "react";

interface ProgressBarProps {
  value: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => {

  return (
    <div className="ls-progress">
      <div
        className="ls-progress-bar"
        style={{ width: `${value}%` }}
      />
    </div>
  );
};

export default ProgressBar;