import { validateLogParams } from './validator.js';
import { sendLogToAPI } from './api.js';

// Inputs validate karke log payload central server pe bhejta hai
export async function Log(stack, level, packageName, message) {
  try {
    const validatedData = validateLogParams(stack, level, packageName, message);
    const response = await sendLogToAPI(validatedData);
    return response;
  } catch (error) {
    throw error;
  }
}
export default Log;
