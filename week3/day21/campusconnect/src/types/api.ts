export interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "teacher" | "admin";
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export interface Analytics {
  totalUsers: number;
  activeUsers: number;
  totalCourses: number;
  completedCourses: number;
}