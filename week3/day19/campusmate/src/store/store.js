import { configureStore } from '@reduxjs/toolkit';

import campusReducer from './campusSlice';

const initialStudentState = {
  name: 'Rayyan',
  semester: '6th Semester',
  department: 'Computer Science & Engineering',
};

const studentReducer = (
  state = initialStudentState,
  action
) => {
  switch (action.type) {
    case 'student/updateProfile':
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export const store = configureStore({
  reducer: {
    campus: campusReducer,
    student: studentReducer,
  },
});