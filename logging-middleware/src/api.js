import { DEFAULT_ENV_KEYS, ERROR_MESSAGES } from './constants.js';

// Log payload ko central service API pe POST request se bhejna (5s timeout lagake)
export async function sendLogToAPI(logData) {
  const envSource = 
    (typeof process !== 'undefined' && process.env) || 
    (typeof window !== 'undefined' && window.process && window.process.env) || 
    {};

  const token = envSource[DEFAULT_ENV_KEYS.TOKEN];
  const apiEndpoint = envSource[DEFAULT_ENV_KEYS.LOG_URL];

  if (!token) {
    throw new Error(`${ERROR_MESSAGES.MISSING_TOKEN} (${DEFAULT_ENV_KEYS.TOKEN})`);
  }

  if (!apiEndpoint) {
    throw new Error(`${ERROR_MESSAGES.MISSING_URL} (${DEFAULT_ENV_KEYS.LOG_URL})`);
  }

  const payload = {
    stack: logData.stack,
    level: logData.level,
    package: logData.package,
    message: logData.message
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    return {
      status: response.status,
      success: response.ok,
      data
    };
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error(`${ERROR_MESSAGES.API_FAIL} Details: The request timed out after 5000ms.`);
    }
    throw new Error(`${ERROR_MESSAGES.API_FAIL} Details: ${error.message}`);
  }
}
