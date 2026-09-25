const BASE_URL = 'https://campusmate-api.example.com/api';

class CampusApiService {
  async request(endpoint, options = {}) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return response.json();
  }

  async getCourses() {
    return this.request('/courses');
  }

  async getAttendance(studentId) {
    return this.request(`/students/${studentId}/attendance`);
  }

  async getAssignments(studentId) {
    return this.request(`/students/${studentId}/assignments`);
  }

  async getAnnouncements() {
    return this.request('/announcements');
  }
}

export const campusApi = new CampusApiService();