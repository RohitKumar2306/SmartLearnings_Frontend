// src/pages/DashboardPage.tsx
import React from "react";
import "./Dashboard.css";
import StatsOverview from "../../components/StatsOverview/StatsOverview.tsx";
import CurrentCourseCard from "../../components/CurrentCourseCard/CurrentCourseCard.tsx";
import CoursesList from "../../components/CoursesList/CoursesList.tsx";
import RecentActivity from "../../components/RecentActivity/RecentActivity.tsx";

import {
  ActivityItem,
  CourseSummary,
  DashboardStats,
} from "../../types/dashboard.ts";

const mockStats: DashboardStats = {
  coursesInProgress: 2,
  lessonsCompleted: 18,
  quizzesTaken: 7,
};

const mockCurrentCourse: CourseSummary | null = {
  id: 1,
  title: "Introduction to Data Structures",
  progress: 42,
  status: "IN_PROGRESS",
};

const mockCourses: CourseSummary[] = [
  {
    id: 1,
    title: "Introduction to Data Structures",
    progress: 42,
    status: "IN_PROGRESS",
  },
  {
    id: 2,
    title: "React Basics – Components & State",
    progress: 89,
    status: "IN_PROGRESS",
  },
  {
    id: 3,
    title: "Java Spring Boot – REST APIs",
    progress: 100,
    status: "COMPLETED",
  },
];

const mockActivity: ActivityItem[] = [
  {
    id: 1,
    description: "Completed lesson: Arrays – Basics",
    timestamp: "Today, 10:15 AM",
  },
  {
    id: 2,
    description: "Scored 80% in Quiz: Linked Lists",
    timestamp: "Yesterday, 9:02 PM",
  },
  {
    id: 3,
    description: "Enrolled in course: Java Spring Boot – REST APIs",
    timestamp: "2 days ago",
  },
];

const DashboardPage: React.FC = () => {
  const handleContinueCourse = (courseId: number) => {
    console.log("Continue course", courseId);
  };

  const handleBrowseCourses = () => {
    console.log("Browse courses");
  };

  const handleSelectCourse = (courseId: number) => {
    console.log("Go to course", courseId);
  };

  return (
    <div className="dashboard-root">
      <div className="container">
        {/* Header */}
        <div className="dashboard-header d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
          <div>
            <h1 className="dashboard-header-title mb-1">
              LearnSphere Dashboard
            </h1>
            <p className="dashboard-header-subtitle mb-0">
              A quick overview of your micro-learning journey.
            </p>
          </div>
        </div>

        {/* Top: overview + current course */}
        <div className="row g-3 mb-3">
          <div className="col-12 col-lg-4">
            <StatsOverview stats={mockStats} />
          </div>
          <div className="col-12 col-lg-8">
            <CurrentCourseCard
              course={mockCurrentCourse}
              onContinue={handleContinueCourse}
              onBrowseCourses={handleBrowseCourses}
            />
          </div>
        </div>

        {/* Courses */}
        <div className="row g-3 mb-3">
          <div className="col-12">
            <CoursesList
              courses={mockCourses}
              onSelectCourse={handleSelectCourse}
            />
          </div>
        </div>

        {/* Activity */}
        <div className="row g-3">
          <div className="col-12">
            <RecentActivity items={mockActivity} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
