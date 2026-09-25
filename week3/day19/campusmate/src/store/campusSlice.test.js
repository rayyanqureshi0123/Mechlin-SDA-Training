import campusReducer, {
  toggleAssignment,
  updateAttendance,
} from './campusSlice';

describe('CampusMate Redux Store', () => {
  test('toggles assignment completion', () => {
    const initialState = {
      assignments: [
        {
          id: 'A101',
          title: 'Binary Tree Implementation',
          course: 'CSE301',
          completed: false,
        },
      ],
      courses: [],
      announcements: [],
    };

    const newState = campusReducer(
      initialState,
      toggleAssignment('A101')
    );

    expect(newState.assignments[0].completed).toBe(true);
  });

  test('updates course attendance', () => {
    const initialState = {
      assignments: [],
      courses: [
        {
          id: 'CSE301',
          name: 'Data Structures & Algorithms',
          attendance: 80,
        },
      ],
      announcements: [],
    };

    const newState = campusReducer(
      initialState,
      updateAttendance({
        courseId: 'CSE301',
        attendance: 90,
      })
    );

    expect(newState.courses[0].attendance).toBe(90);
  });
});