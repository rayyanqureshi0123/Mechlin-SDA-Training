# CampusMate

A student-focused mobile application built with React Native concepts for managing everyday academic activities in one place.

## About the Project

CampusMate is designed as a digital companion for college students. It brings important academic information such as courses, attendance, assignments, and campus announcements into a single application.

The project also demonstrates mobile application concepts such as navigation, centralized state management, API services, offline storage, network monitoring, and automated testing.

## Main Features

### Student Dashboard

The dashboard provides a quick overview of the student's academic information.

It includes:

- Student name
- Semester
- Department
- Assignment information
- Navigation to application modules

### Courses

Students can view their current semester courses.

Each course contains:

- Course code
- Course name
- Attendance percentage

Current sample courses:

- Data Structures and Algorithms
- Database Management Systems
- Computer Networks
- Software Engineering

### Attendance

The attendance module allows students to view attendance information for individual courses.

It provides:

- Attendance percentage
- Attendance status
- Progress information
- Low-attendance warning

The minimum attendance reference used in the application is 75%.

### Assignments

Students can view their assignments and mark assignments as completed.

Each assignment contains:

- Assignment title
- Course
- Completion status

Example assignments:

- Binary Tree Implementation
- Database Schema Design

### Announcements

The announcements module displays important college updates.

Examples include:

- Examination schedules
- Hackathon announcements
- Academic notices
- Registration information

## Application Flow

The application follows a simple navigation structure:

Welcome Screen
↓
Dashboard
├── Courses
├── Attendance
├── Assignments
└── Announcements

React Navigation is used to manage the application screens.

## Technology Stack

### Frontend

- React Native
- React
- React Navigation

### State Management

- Redux Toolkit
- React Redux

### Offline Support

- AsyncStorage
- Network connectivity monitoring
- Offline action queue

### Testing

- Jest

### API

- JavaScript Fetch API
- Centralized API service layer

## Project Structure

campusmate/

    App.js
    package.json
    package-lock.json

    src/
        navigation/
            AppNavigator.js

        screens/
            WelcomeScreen.js
            DashboardScreen.js
            CoursesScreen.js
            AttendanceScreen.js
            AssignmentsScreen.js
            AnnouncementsScreen.js

        services/
            apiService.js
            networkService.js
            offlineService.js

        store/
            store.js
            campusSlice.js
            campusSlice.test.js

## State Management

CampusMate uses Redux Toolkit to maintain application state.

The store contains student and campus information.

Student information includes:

- Name
- Semester
- Department

Campus information includes:

- Courses
- Assignments
- Announcements

The main Redux actions are:

- toggleAssignment()
- updateAttendance()

## API Service

The application contains a separate API service layer.

The service provides functions for:

- Getting courses
- Getting attendance information
- Getting assignments
- Getting announcements

The API service is located at:

src/services/apiService.js

The current API address is a placeholder because the project does not currently use a live backend.

## Offline Functionality

CampusMate is designed with offline-first concepts.

AsyncStorage is used to store local information.

The application can:

- Save dashboard data
- Retrieve cached data
- Store actions while offline
- Maintain an offline queue
- Synchronize queued actions

This allows the application architecture to support situations where the user temporarily loses internet connectivity.

## Network Monitoring

The application uses NetInfo to monitor network connectivity.

The network service provides functionality for:

- Starting network monitoring
- Checking the current connection
- Adding connectivity listeners
- Detecting online and offline states

File:

src/services/networkService.js

## Testing

Jest is used for testing the Redux functionality.

Current tests include:

1. Assignment completion

The test verifies that an assignment can be changed from incomplete to completed.

2. Attendance update

The test verifies that the attendance percentage of a course can be updated.

Test file:

src/store/campusSlice.test.js

Run the tests using:

npm test

Expected result:

2 tests passed

## Security

The project follows basic security practices for future backend integration.

Important considerations include:

- HTTPS communication
- Secure authentication
- Token-based authorization
- Input validation
- API validation
- Avoiding hard-coded credentials
- Secure handling of sensitive information

No real API credentials or authentication secrets are included in the project.

## Future Improvements

The project can be expanded with additional features such as:

- Student authentication
- JWT-based login
- Real backend integration
- Push notifications
- Academic calendar
- Assignment reminders
- Attendance history
- Low-attendance notifications
- Dark mode
- Background synchronization
- Conflict resolution
- Real-time campus announcements

## Learning Outcomes

This project demonstrates practical understanding of:

- React Native application architecture
- Mobile navigation
- Redux Toolkit
- State management
- API service architecture
- Local storage
- Offline-first concepts
- Network monitoring
- Automated testing
- Modular application design

## Project Status

Current features implemented:

- Student Dashboard
- Course Management
- Attendance Tracking
- Assignment Tracking
- Campus Announcements
- React Navigation
- Redux Toolkit
- API Service
- AsyncStorage
- Network Monitoring
- Offline Action Queue
- Redux Unit Tests

The project currently uses sample data and a placeholder API endpoint.

## Developer

Rayyan Qureshi

B.Tech Computer Science and Engineering  
Amity University Rajasthan

## License

This project was developed as part of SDA training and educational development work.

It is intended for learning, experimentation, and demonstration purposes.