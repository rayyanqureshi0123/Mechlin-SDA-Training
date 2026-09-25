import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import DashboardScreen from '../screens/DashboardScreen';
import CoursesScreen from '../screens/CoursesScreen';
import AttendanceScreen from '../screens/AttendanceScreen';
import AssignmentsScreen from '../screens/AssignmentsScreen';
import AnnouncementsScreen from '../screens/AnnouncementsScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ title: 'CampusMate' }}
      />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Courses" component={CoursesScreen} />
      <Stack.Screen name="Attendance" component={AttendanceScreen} />
      <Stack.Screen name="Assignments" component={AssignmentsScreen} />
      <Stack.Screen name="Announcements" component={AnnouncementsScreen} />
    </Stack.Navigator>
  );
}