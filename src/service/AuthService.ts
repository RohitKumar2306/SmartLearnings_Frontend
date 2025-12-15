import axios, { AxiosResponse } from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1.0";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  timezone?: string;
  role?: string;
}

export interface AuthResponseBody {
  email: string;
  token: string;
  role: string;
  userId: string;
  name: string;
  authorities: string[];
}

// POST /auth/login
export const login = (
  data: LoginPayload
): Promise<AxiosResponse<AuthResponseBody>> => {
  return axios.post<AuthResponseBody>(`${API_BASE_URL}/auth/login`, data);
};

// POST /auth/register
export const register = (
  data: RegisterPayload
): Promise<AxiosResponse<AuthResponseBody>> => {
  return axios.post<AuthResponseBody>(`${API_BASE_URL}/auth/register`, data);
};