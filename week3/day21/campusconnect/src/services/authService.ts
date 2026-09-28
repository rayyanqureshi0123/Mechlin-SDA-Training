import { apiClient } from "./apiClient";
import {
  LoginRequest,
  LoginResponse,
  User,
} from "../types/api";

class AuthService {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    // JSONPlaceholder does not provide real authentication,
    // so we simulate a successful CampusConnect login response.
    const response = await apiClient.post<LoginResponse, LoginRequest>(
      "/posts",
      credentials
    );

    const loginResponse: LoginResponse = {
      token: `campusconnect-demo-token-${response}`,
      user: {
        id: "student-001",
        name: "CampusConnect Student",
        email: credentials.email,
        role: "student",
      },
    };

    apiClient.setToken(loginResponse.token);

    return loginResponse;
  }

  logout(): void {
    apiClient.clearToken();
  }

  async getCurrentUser(): Promise<User> {
    return apiClient.get<User>("/users/1");
  }

  async getUsers(): Promise<User[]> {
    return apiClient.get<User[]>("/users");
  }
}

export const authService = new AuthService();