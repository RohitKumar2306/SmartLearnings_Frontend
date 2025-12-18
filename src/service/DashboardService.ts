// src/service/DashboardService.ts
import axios from "axios";
import {
  AdminDashboardResponse,
  StudentDashboardResponse,
} from '../types/dashboard';

// Base URL for backend
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1.0";

// Create axios client
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Attach JWT token from localStorage on every request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ---- Dashboard APIs ----

export const fetchStudentDashboard = () => {
  return apiClient.get<StudentDashboardResponse>("/dashboard/student");
};

export const fetchAdminDashboard = () => {
  return apiClient.get<AdminDashboardResponse>("/dashboard/admin");
};