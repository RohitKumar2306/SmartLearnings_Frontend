import React from "react";
import "./ProgressBar.css";

interface ProgressBarProps {
  value: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => {
  const safeValue = Math.max(0, Math.min(100, value));

  return (
    <div className="ls-progress">
      <div
        className="ls-progress-bar"
        style={{ width: `${safeValue}%` }}
      />
    </div>
  );
};

export default ProgressBar;