# Development Plan & Status Tracker

This document maps out the official plan to build the Campus Notification System based on the AffordMed assessment specifications. It serves as our progress tracker, showing which stages have been completed and what tasks remain.

---

## 📊 Assessment Progress Summary

| Stage / Component | Goal | Status | Deliverables |
|:---|:---|:---:|:---|
| **Pre-Test Setup** | Implement Compliance Logger Middleware | **Completed** ✅ | Reusable `logging-middleware` package |
| **Stage 1** | API Contract & Design | **Completed** ✅ | `Stage 1` section in `notification_system_design.md` |
| **Stage 2** | DB Storage & Schema Design | **Completed** ✅ | `Stage 2` section in `notification_system_design.md` |
| **Stage 3** | Database Query Optimization | **Completed** ✅ | `Stage 3` section in `notification_system_design.md` |
| **Stage 4** | Read Scaling & Tradeoffs | **Completed** ✅ | `Stage 4` section in `notification_system_design.md` |
| **Stage 5** | Write Scaling, Resilience & Pseudocode | **Completed** ✅ | `Stage 5` section in `notification_system_design.md` |
| **Stage 6** | Priority Inbox Functional Script | **Completed** ✅ | Priority code script + `Stage 6` section in design doc |
| **Stage 7** | Frontend Dashboard & Logger Integration | **Completed** ✅ | React MUI App on Port 3000 + Logger Integration |

---

## 📋 Detailed Stage Tasks & Status

### 🛠️ Pre-Test Setup: Logging Middleware Package
- [x] Create reusable logger package inside `logging-middleware/`.
- [x] Validate inputs: `stack` (`backend` or `frontend`), lowercase `level` (`debug`, `info`, `warn`, `error`, `fatal`), package categories, and messages.
- [x] Renamed payload key to `package` and removed extraneous fields.
- [x] Configured environment variable lookup without hardcoding credentials.
- **Status**: **Completed** ✅

---

### 🎨 Stage 1: API Contract & Design
- [x] Design REST API endpoints for displaying notifications.
- [x] Document JSON schemas for requests, responses, and headers.
- [x] Propose a real-time notification push mechanism (e.g. WebSockets, SSE, or polling).
- **Deliverable**: Create `Stage 1` heading in [notification_system_design.md](file:///C:/Users/aadi9/2303051050043/notification-system-design.md).
- **Status**: **Completed** ✅

---

### 🗄️ Stage 2: Persistent Storage & Schema Design
- [x] Select persistent database (SQL vs. NoSQL) and explain choice.
- [x] Write DB schemas and data definitions.
- [x] Address scalability concerns as data volume increases.
- [x] Write DB queries corresponding to the REST APIs designed in Stage 1.
- **Deliverable**: Add `Stage 2` heading to [notification_system_design.md](file:///C:/Users/aadi9/2303051050043/notification-system-design.md).
- **Status**: **Completed** ✅

---

### ⚡ Stage 3: Query Optimization
- [x] Optimize query for fetching unread student notifications:
  `SELECT * FROM notifications WHERE studentID = 1042 AND isRead = false ORDER BY createdAt ASC;`
- [x] Answer analysis questions:
  - Why is the query slow?
  - What would you change, and what is the computational cost?
  - Is indexing every column a good advice? Why/Why not?
- [x] Write a query to find all students who received a placement notification in the last 7 days.
- **Deliverable**: Add `Stage 3` heading to [notification_system_design.md](file:///C:/Users/aadi9/2303051050043/notification-system-design.md).
- **Status**: **Completed** ✅

---

### 📈 Stage 4: Read Performance Scaling
- [x] Suggest read-heavy optimization strategies (e.g., caching, read-replicas) when DB is overwhelmed by each student loading notifications.
- [x] Elaborate on tradeoffs for each strategy.
- **Deliverable**: Add `Stage 4` heading to [notification_system_design.md](file:///C:/Users/aadi9/2303051050043/notification-system-design.md).
- **Status**: **Completed** ✅

---

### 🛡️ Stage 5: Write Scaling & Resilience
- [x] Identify bottlenecks in naive "Notify All" 50,000-student loops.
- [x] Redesign process for speed and reliability, detailing email failure recovery (200 failed midway).
- [x] Discuss decoupling options: Should DB saves and emails happen synchronously?
- [x] Write revised resilient pseudocode.
- **Deliverable**: Add `Stage 5` heading to [notification_system_design.md](file:///C:/Users/aadi9/2303051050043/notification-system-design.md).
- **Status**: **Completed** ✅

---

### 📥 Stage 6: Priority Inbox Scripting
- [x] Fetch notifications from external API `GET /evaluation-service/notifications`.
- [x] Implement priority computation algorithm (weight: `placement > result > event` + recency).
- [x] Save a functioning code script returning the top 10 items.
- [x] Detail how to maintain this top 10 list efficiently as new notifications arrive.
- **Deliverable**: Write script file + Add `Stage 6` heading to [notification_system_design.md](file:///C:/Users/aadi9/2303051050043/notification-system-design.md).
- **Status**: **Completed** ✅

---

### 🖥️ Stage 7: Frontend Application Integration
- [x] Integrate logging middleware package at key call stack shifts in the frontend code.
- [x] Configure React dashboard to run on `http://localhost:3000`.
- [x] Build UI to display notifications and priority lists with pagination and query filtering.
- [x] Implement read/unread notification tracking.
- [x] Style the dashboard strictly using Material UI (no ShadCN/external CSS libraries).
- **Status**: **Completed** ✅
