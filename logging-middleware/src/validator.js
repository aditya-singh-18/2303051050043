import { LOG_STACKS, LOG_LEVELS, LOG_PACKAGES, ERROR_MESSAGES } from './constants.js';

// Stack, level, package name aur message validate karne ke liye utility
export function validateLogParams(stack, level, packageName, message) {
  if (typeof stack !== 'string') {
    throw new TypeError(`Invalid stack type: expected string, received ${typeof stack}.`);
  }
  if (!Object.values(LOG_STACKS).includes(stack)) {
    throw new Error(`${ERROR_MESSAGES.INVALID_STACK} (Received: "${stack}")`);
  }

  if (typeof level !== 'string') {
    throw new TypeError(`Invalid level type: expected string, received ${typeof level}.`);
  }
  if (!Object.values(LOG_LEVELS).includes(level)) {
    throw new Error(`${ERROR_MESSAGES.INVALID_LEVEL} (Received: "${level}")`);
  }

  if (typeof packageName !== 'string') {
    throw new TypeError(`Invalid package type: expected string, received ${typeof packageName}.`);
  }
  const allowedPackages = [
    ...LOG_PACKAGES[stack],
    ...LOG_PACKAGES.shared
  ];
  if (!allowedPackages.includes(packageName)) {
    throw new Error(`${ERROR_MESSAGES.INVALID_PACKAGE} (Received: "${packageName}" for stack: "${stack}")`);
  }

  if (typeof message !== 'string') {
    throw new TypeError(`Invalid message type: expected string, received ${typeof message}.`);
  }
  if (!message.trim()) {
    throw new Error(ERROR_MESSAGES.INVALID_MESSAGE);
  }

  return {
    stack,
    level,
    package: packageName,
    message: message.trim()
  };
}
