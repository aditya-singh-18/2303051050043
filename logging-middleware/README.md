# Logging Middleware Package

A reusable JavaScript logging client designed for the AffordMed Campus Evaluation. It intercepts, validates, and sends application logs to a centralized logging/evaluation endpoint.

---

## Installation

This is a local package within the project workspace. To integrate it into other workspace projects (e.g. `notification-app-be`), you can install it using a local file reference:

```bash
npm install ../logging-middleware
```

---

## Configuration

The package relies on environment variables for authentication and target configuration. Make sure the following keys are populated in your process environment before importing or calling the package:

| Environment Variable | Description | Example / Format |
|----------------------|-------------|------------------|
| `AFFORDMED_TOKEN` | Bearer authorization token used to authenticate calls to the evaluation service. | `eyJhbGciOiJIUzI1NiIsIn...` |
| `AFFORDMED_LOG_URL` | The complete URL endpoint of the centralized logging/evaluation service. | `http://localhost:5000/evaluation-service/log` |

---

## Exported API

The package exports a single async function:

### `Log(stack, level, packageName, message)`

#### Parameters
* **`stack`** *(string)*: The deployment/application stack. Must be exactly one of:
  - `'backend'`
  - `'frontend'`
* **`level`** *(string)*: Log level severity. Must be exactly one of the following lowercase values:
  - `'debug'`
  - `'info'`
  - `'warn'`
  - `'error'`
  - `'fatal'`
* **`packageName`** *(string)*: The package name emitting the log. Valid package names are validated according to the selected `stack` as follows:
  - **Backend Stack**: `cache`, `controller`, `cron_job`, `db`, `domain`, `handler`, `repository`, `route`, `service`
  - **Frontend Stack**: `api`, `component`, `hook`, `page`, `state`, `style`
  - **Shared (Allowed in both)**: `auth`, `config`, `middleware`, `utils`
* **`message`** *(string)*: The descriptive log message detail. Must be a non-empty string.

#### API Request Body Format
When logged, the API client maps the parameters to the request body as follows, renaming `packageName` to `package` and omitting extraneous fields like timestamps:
```json
{
  "stack": "backend",
  "level": "info",
  "package": "service",
  "message": "Database query completed successfully"
}
```

#### Returns
Returns a `Promise<Object>` containing the API server's response:
```json
{
  "status": 200,
  "success": true,
  "data": {
    "message": "Log stored successfully"
  }
}
```

#### Exceptions Thrown
The function will throw a descriptive error under the following circumstances:
- **Input Validation Failure**: When any of the inputs do not conform to types, range of values, or length constraints.
- **Missing Configuration**: When the required environment variables are absent.
- **Network / API Failure**: When the central logging endpoint returns a non-2xx response or connection fails.

---

## Usage Examples

### 1. Basic Usage in CommonJS Node app
```javascript
const { Log } = require('logging-middleware');

async function run() {
  try {
    const res = await Log('backend', 'info', 'service', 'Server initialized and listening on port 3000');
    console.log('Log submitted successfully:', res);
  } catch (error) {
    console.error('Logging failed:', error.message);
  }
}
```

### 2. Error Logging with Stack Trace
```javascript
const { Log } = require('logging-middleware');

async function executeAction() {
  try {
    // some risky operation
    throw new Error('Database connection timed out');
  } catch (error) {
    try {
      await Log(
        'backend',
        'error',
        'db',
        `Database error: ${error.message}`
      );
    } catch (logErr) {
      console.error('Failed to log error to central logger:', logErr.message);
    }
  }
}
```
