export const LOG_STACKS = {
  BACKEND: 'backend',
  FRONTEND: 'frontend'
};

export const LOG_LEVELS = {
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
  FATAL: 'fatal'
};

export const LOG_PACKAGES = {
  backend: [
    'cache',
    'controller',
    'cron_job',
    'db',
    'domain',
    'handler',
    'repository',
    'route',
    'service'
  ],
  frontend: [
    'api',
    'component',
    'hook',
    'page',
    'state',
    'style'
  ],
  shared: [
    'auth',
    'config',
    'middleware',
    'utils'
  ]
};

export const DEFAULT_ENV_KEYS = {
  TOKEN: 'AFFORDMED_' + 'TOKEN',
  LOG_URL: 'AFFORDMED_LOG_URL'
};

export const ERROR_MESSAGES = {
  INVALID_STACK: `Invalid stack: stack must be one of: ${Object.values(LOG_STACKS).join(', ')}.`,
  INVALID_LEVEL: `Invalid level: level must be one of: ${Object.values(LOG_LEVELS).join(', ')}.`,
  INVALID_PACKAGE: `Invalid package: package name must be valid for the selected stack or shared scope.`,
  INVALID_MESSAGE: 'Invalid message: message must be a non-empty string.',
  MISSING_TOKEN: `Missing authorization token. Please set the environment variable.`,
  MISSING_URL: `Missing logging API URL. Please set the environment variable.`,
  API_FAIL: 'Logging API request failed.'
};
