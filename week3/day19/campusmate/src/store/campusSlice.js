import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  courses: [
    {
      id: 'CSE301',
      name: 'Data Structures & Algorithms',
      attendance: 88,
    },
    {
      id: 'CSE302',
      name: 'Database Management Systems',
      attendance: 83,
    },
    {
      id: 'CSE303',
      name: 'Computer Networks',
      attendance: 79,
    },
    {
      id: 'CSE304',
      name: 'Software Engineering',
      attendance: 90,
    },
  ],
  assignments: [
    {
      id: 'A101',
      title: 'Binary Tree Implementation',
      course: 'CSE301',
      completed: false,
    },
    {
      id: 'A102',
      title: 'Database Schema Design',
      course: 'CSE302',
      completed: false,
    },
  ],
  announcements: [
    {
      id: 'N101',
      title: 'Mid-Semester Examination Schedule',
      date: '25 September',
    },
    {
      id: 'N102',
      title: 'Hackathon Registration Open',
      date: '24 September',
    },
  ],
};

const campusSlice = createSlice({
  name: 'campus',
  initialState,
  reducers: {
    toggleAssignment(state, action) {
      const assignment = state.assignments.find(
        (item) => item.id === action.payload
      );

      if (assignment) {
        assignment.completed = !assignment.completed;
      }
    },

    updateAttendance(state, action) {
      const course = state.courses.find(
        (item) => item.id === action.payload.courseId
      );

      if (course) {
        course.attendance = action.payload.attendance;
      }
    },
  },
});

export const {
  toggleAssignment,
  updateAttendance,
} = campusSlice.actions;

export default campusSlice.reducer;