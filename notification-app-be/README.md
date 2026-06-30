# Campus Notifications - Backend Tools

This folder contains the backend utility scripts for the campus notification evaluation.

## Environment Setup

Make sure you have a `.env` file in this folder with the following keys:
```env
AFFORDMED_CLIENT_ID=your_client_id
AFFORDMED_CLIENT_SECRET=your_client_secret
AFFORDMED_ACCESS_CODE=your_access_code
AFFORDMED_TOKEN=your_bearer_token
AFFORDMED_LOG_URL=http://4.224.186.213/evaluation-service/logs
```

## Useful Scripts

We configured some simple scripts in `package.json`:

* **Refresh Bearer Token**:
  ```bash
  npm run auth
  ```
  Runs `auth.js` to fetch a new token from the evaluation server and save it in `.env`.

* **Calculate Priority Notifications**:
  ```bash
  npm run priority
  ```
  Runs `priority_inbox.js` which fetches the live notifications, sorts them by weight (Placement > Result > Event) and date, and prints the top 10 in a table.
