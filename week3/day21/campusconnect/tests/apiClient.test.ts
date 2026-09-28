import { apiClient } from "../src/services/apiClient";

describe("ApiClient", () => {
  beforeEach(() => {
    apiClient.clearToken();
  });

  test("should store an authentication token", () => {
    apiClient.setToken("test-token");

    expect(apiClient.getToken()).toBe("test-token");
  });

  test("should clear an authentication token", () => {
    apiClient.setToken("test-token");
    apiClient.clearToken();

    expect(apiClient.getToken()).toBeNull();
  });
});