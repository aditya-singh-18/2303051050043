# Campus Notifications - Frontend App

Vite + React dashboard built with Material-UI to display and filter campus announcements.

## Setup

1. **Environment Variables**:
   Create a `.env` file in this folder:
   ```env
   VITE_AFFORDMED_TOKEN=your_bearer_token
   VITE_AFFORDMED_LOG_URL=/evaluation-service/logs
   ```

2. **Vite Reverse Proxy**:
   Vite is configured to proxy `/evaluation-service` requests to the remote server to bypass browser CORS blocks natively.

## How to Run

* **Start Local Development Server** (runs on port 3000):
  ```bash
  npm run dev
  ```

* **Build Production Bundle**:
  ```bash
  npm run build
  ```
