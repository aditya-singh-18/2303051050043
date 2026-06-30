# Todo Checklist

Tracking task execution across all 7 stages of the Campus Notification System assessment.

---

## 🛠️ Pre-Test Setup: Logging Middleware (Completed)
- [x] Create reusable logger package inside `logging-middleware`.
- [x] Add parameters validation (`stack`, `level`, `package`, `message`).
- [x] Configure token and URL endpoints from environment variables.
- [x] Implement outgoing API request handler.
- [x] Create package testing script and verify validation rules.

---

## 🎨 Stage 1: API Contract & Design
- [x] Identify core actions for the campus notification platform.
- [x] Define API endpoint paths, HTTP verbs, and query strings.
- [x] Formulate JSON request/response schemas and required headers.
- [x] Propose real-time notification mechanism (WebSockets/SSE/Polling).
- [x] Save documentation in `notification_system_design.md` under a `"Stage 1"` section.

---

## 🗄️ Stage 2: Persistent Storage & Schema Design
- [x] Recommend database type (SQL vs. NoSQL) and justify choice.
- [x] Define database tables/collections and relationships.
- [x] Write out the database schema definitions.
- [x] Identify scalability risks (storage growth, query latency) and propose solutions.
- [x] Write raw SQL/NoSQL queries corresponding to designed Stage 1 endpoints.
- [x] Save documentation in `notification_system_design.md` under a `"Stage 2"` section.

---

## ⚡ Stage 3: Query Optimization
- [x] Analyze the slow unread notifications query.
- [x] Document why the query is slow and how it behaves at scale.
- [x] Detail proposed index/optimization and estimate query cost reduction.
- [x] Analyze the recommendation of "indexing every column".
- [x] Write optimized query to fetch notifications in the last 7 days.
- [x] Save documentation in `notification_system_design.md` under a `"Stage 3"` section.

---

## 📈 Stage 4: Read Performance Scaling
- [x] Suggest caching, read replicas, or optimization strategies to handle read surges.
- [x] Detail the tradeoffs (consistency vs. latency) for each strategy.
- [x] Save documentation in `notification_system_design.md` under a `"Stage 4"` section.

---

## 🛡️ Stage 5: Write Scaling & Resilience
- [x] Analyze bottlenecks in the naive notification loop.
- [x] Propose message queues/asynchronous job designs.
- [x] Document failure recovery flow for email API failures.
- [x] Explain synchronous vs. asynchronous write trade-offs.
- [x] Write revised resilient pseudocode.
- [x] Save documentation in `notification_system_design.md` under a `"Stage 5"` section.

---

## 📥 Stage 6: Priority Inbox Scripting
- [x] Create folder/file for priority scripting.
- [x] Write code to query `GET /evaluation-service/notifications` using Bearer authentication.
- [x] Implement priority sorting algorithm based on category weight and recency.
- [x] Test script and capture outputs displaying top 10 items.
- [x] Detail efficient ways to update top 10 list as new notifications flow in.
- [x] Save documentation in `notification_system_design.md` under a `"Stage 6"` section.

---

## 🖥️ Stage 7: Frontend Application Integration
- [x] Integrate logging middleware package at key shifts in the React call stack.
- [x] Run application locally on `http://localhost:3000`.
- [x] Update frontend dashboard:
  - [x] Implement all notifications view.
  - [x] Implement priority notifications view.
  - [x] Support pagination and category type query filtering.
  - [x] Add visual indicators for read vs. unread notifications.
- [x] Style application UI strictly using Material UI (no ShadCN, Tailwind, or custom CSS libraries).
