# CampusConnect API Integration Guide

## Overview

CampusConnect is a TypeScript-based API integration project created for Day 21 of SDA training.

The project demonstrates:

- REST API integration using Axios
- Authentication token handling
- Centralized error handling
- Offline caching and request queuing
- Request synchronization
- WebSocket communication
- Notification management
- React API hooks
- TypeScript and Jest testing

## Project Structure

```text
campusconnect/
├── src/
│   ├── hooks/useApi.ts
│   ├── services/
│   │   ├── apiClient.ts
│   │   ├── authService.ts
│   │   ├── notificationService.ts
│   │   ├── offlineService.ts
│   │   └── realtimeService.ts
│   ├── types/api.ts
│   └── utils/errorHandler.ts
├── tests/apiClient.test.ts
├── jest.config.js
├── package.json
└── tsconfig.json