// src/pages/DashboardPage.tsx
import React, { useEffect, useState } from 'react';
import "./Dashboard.css";
import StatsOverview from "../../components/StatsOverview/StatsOverview.tsx";
import CurrentCourseCard from "../../components/CurrentCourseCard/CurrentCourseCard.tsx";
import CoursesList from "../../components/CoursesList/CoursesList.tsx";
import RecentActivity from "../../components/RecentActivity/RecentActivity.tsx";
import {
  DashboardStats,
  StudentDashboardResponse,
  CourseSummary
} from "../../types/dashboard.ts";
import { fetchStudentDashboard} from "../../service/DashboardService.ts"

const DashboardPage: React.FC = () => {

  const [data, setData] = useState<StudentDashboardResponse | null>(null);
  const [loading, setLoading] = useState<boolean | null>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetchStudentDashboard();
        setData(response.data);
      } catch (err: any) {
        console.error("Failed to load dashboard:", err);
        setError(
          err?.response?.data?.message || "Unable to load dashboard data."
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="ls-page">
        <div className="container py-4">
          <p className="text-muted">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="ls-page">
        <div className="container py-4">
          <div className="alert alert-danger">
            {error || "No dashboard data available."}
          </div>
        </div>
      </div>
    );
  }

  // StatsOverview expects "stats"
  const stats: DashboardStats = data.overview;

  // CurrentCourseCard: adapt from continueLearning card
  const currentCourse: CourseSummary | null = data.continueLearning
    ? (() => {
      // find full course info (status, lessons) from list by id
      const fromList = data.courses.find(
        (c) => c.courseId === data.continueLearning!.courseId
      );

      return {
        courseId: data.continueLearning.courseId,
        courseTitle: data.continueLearning.courseTitle,
        status: fromList?.status ?? "IN_PROGRESS",
        progressPercent: data.continueLearning.progressPercent,
        lessonsCompleted: fromList?.lessonsCompleted ?? 0,
        totalLessons: fromList?.totalLessons ?? 0,
      };
    })()
    : null;

  // CoursesList: adapt from data.courses
  const courses = data.courses.map((c) => ({
    // again, adjust keys to match CoursesList's props
    courseId: c.courseId,
    courseTitle: c.courseTitle,
    status: c.status,
    progressPercent: c.progressPercent,
    lessonsCompleted: c.lessonsCompleted,
    totalLessons: c.totalLessons,
  }));

  // RecentActivity: you can pass through directly or map if needed
  const activity = data.recentActivity;

  // Handlers – keep your existing implementations
  const handleContinueCourse = () => {
    // later: route to current course page
    console.log("Continue course clicked");
  };

  const handleBrowseCourses = () => {
    // later: route to course catalog
    console.log("Browse courses clicked");
  };

  const handleSelectCourse = (courseId: string) => {
    // later: route to /courses/:id
    console.log("Selected course:", courseId);
  };

  // ---- your original JSX, now using dynamic data instead of mocks ----
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
            <StatsOverview stats={stats} />
          </div>
          <div className="col-12 col-lg-8">
            <CurrentCourseCard
              course={currentCourse}
              onContinue={handleContinueCourse}
              onBrowseCourses={handleBrowseCourses}
            />
          </div>
        </div>

        {/* Courses */}
        <div className="row g-3 mb-3">
          <div className="col-12">
            <CoursesList
              courses={courses}
              onSelectCourse={handleSelectCourse}
            />
          </div>
        </div>

        {/* Activity */}
        <div className="row g-3">
          <div className="col-12">
            <RecentActivity items={activity} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;