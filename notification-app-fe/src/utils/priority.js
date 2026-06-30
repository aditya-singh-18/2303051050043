export const CATEGORY_WEIGHTS = {
  'Placement': 3,
  'Result': 2,
  'Event': 1
};

/**
 * Calculates priority score/sort order for two notifications.
 * Sorts by category weight descending first, then by timestamp descending (recency).
 * 
 * @param {Object} a - First notification.
 * @param {Object} b - Second notification.
 * @returns {number} Comparison result.
 */
export function compareNotifications(a, b) {
  const weightA = CATEGORY_WEIGHTS[a.Type] || 0;
  const weightB = CATEGORY_WEIGHTS[b.Type] || 0;

  if (weightB !== weightA) {
    return weightB - weightA; // High weight first
  }

  // if weight is equal then based on the time 
  const timeA = new Date(a.Timestamp).getTime();
  const timeB = new Date(b.Timestamp).getTime();
  return timeB - timeA;
}
