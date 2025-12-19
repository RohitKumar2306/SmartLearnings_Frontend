import React from "react";
import "./CourseStatusPill.css";

export type CourseStatus =
  | "PUBLISHED"
  | "DRAFT"
  | "PENDING_REVIEW"
  | string;

interface CourseStatusPillProps {
  status: CourseStatus;
}

const normalize = (status: string): string => {
  return status.trim().toUpperCase();
};

const formatLabel = (status: string): string => {
  const s = normalize(status);
  if (s === "PUBLISHED") return "Published";
  if (s === "PENDING_REVIEW") return "Pending review";
  if (s === "DRAFT") return "Draft";

  // fallback: "IN_PROGRESS" -> "In progress"
  return s
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};

const CourseStatusPill: React.FC<CourseStatusPillProps> = ({ status }) => {
  const normalized = normalize(status);

  let variantClass = "course-status-pill--neutral";
  if (normalized === "PUBLISHED") {
    variantClass = "course-status-pill--published";
  } else if (normalized === "PENDING_REVIEW") {
    variantClass = "course-status-pill--pending";
  } else if (normalized === "DRAFT") {
    variantClass = "course-status-pill--draft";
  }

  return (
    <span className={`course-status-pill ${variantClass}`}>
      {formatLabel(status)}
    </span>
  );
};

export default CourseStatusPill;