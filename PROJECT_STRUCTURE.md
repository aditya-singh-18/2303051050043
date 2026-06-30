# Project Structure

This document outlines the current directory structure of the **Campus-Evaluation-FS** project, the purpose of each directory, and the implemented features.

---

## Folder Structure

```text
Campus-Evaluation-FS/
├── logging-middleware/               # Custom reusable logging middleware module
│   ├── src/
│   │   ├── api.js                    # Dispatches logs to target API (with 5s AbortController timeout)
│   │   ├── constants.js              # Log levels, stacks, enums, error messages
│   │   ├── index.js                  # Package entrypoint (ESM re-exports)
│   │   ├── logger.js                 # Log orchestration (type validations and dispatch)
│   │   └── validator.js              # Strict type & enums validator
│   ├── package.json                  # ESM configurations ("type": "module")
│   └── README.md                     # Reusable logging package documentation
├── notification-app-be/              # Node.js/Express Backend scripting space
│   ├── .env                          # Backend local credentials file (Ignored in VCS)
│   ├── auth.js                       # Programmatic auth script to refresh bearer tokens
│   ├── package.json                  # Scripts: start, dev, priority, auth
│   ├── priority_inbox.js             # Sorting script querying GET API & returning Top 10
│   └── README.md                     # Backend documentation
├── notification-app-fe/              # Vite + React Frontend application
│   ├── src/
│   │   ├── api/                      # API integration layers
│   │   │   └── notifications.js      # Notifications fetching client (integrated with logging)
│   │   ├── components/               # React UI components
│   │   │   ├── NotificationCard.jsx  # Notification Card with category colors and read states
│   │   │   └── NotificationFilter.jsx# ToggleButtonGroup category filters (with active onChange event)
│   │   ├── hooks/                    # Custom React hooks
│   │   │   └── useNotifications.js   # State & LocalStorage persistence hook
│   │   ├── pages/                    # Page components
│   │   │   └── NotificationsPage.jsx # Announcements & Priority tabs dashboard
│   │   ├── utils/                    # Common frontend utilities
│   │   │   └── priority.js           # Browser-safe priority sorter logic
│   │   ├── App.jsx                   # Root application router
│   │   └── main.jsx                  # Entry point (dynamically loads Vite VITE_ prefixed envs)
│   ├── .env                          # Client environment configurations
│   ├── eslint.config.js              # ESLint configuration
│   ├── index.html                    # HTML entry point
│   ├── package.json                  # Frontend dependencies and scripts
│   └── vite.config.js                # Vite server configurations (forces port 3000)
├── DEVELOPMENT_PLAN.md               # Tracking gate checklist
├── LICENSE                           # Project License
├── notification-system-design.md     # Design specification doc for Stages 1–6
├── PROJECT_STRUCTURE.md              # [This File] Repository structure and architecture
└── TODO.md                           # Stage-specific checklist
```

---

## Directory Purposes

1. **`logging-middleware/`**:
   - **Purpose**: A reusable, standalone ES Module package to validate log inputs (stack, level, package, message) and dispatch them to the central assessment logging service. Integrated at key shifts across both frontend and backend.

2. **`notification-app-be/`**:
   - **Purpose**: Node.js script environment. Houses utility scripts for token refresh and priority sorting algorithm implementation for Stage 6.

3. **`notification-app-fe/`**:
   - **Purpose**: Dynamic student React dashboard styled with Material-UI, running on Port 3000, displaying all announcements and priority inbox items using local read-state caching.
