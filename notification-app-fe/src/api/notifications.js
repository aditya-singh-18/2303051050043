import { Log } from 'logging-middleware';

// Proxied api url se announcements fetch karna (Logging middleware integration ke sath)
export async function fetchNotifications(page = 1, limit = 10, category = 'All') {
  const token = window.process.env.AFFORDMED_TOKEN;
  const baseUrl = '/evaluation-service/notifications';
  
  const url = new URL(baseUrl, window.location.origin);
  url.searchParams.append('page', page.toString());
  url.searchParams.append('limit', limit.toString());
  
  if (category && category !== 'All') {
    url.searchParams.append('notification_type', category);
  }

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errText}`);
    }

    const data = await response.json();

    try {
      await Log(
        'frontend',
        'info',
        'api',
        `Successfully fetched notifications (page=${page}, limit=${limit}, category=${category})`
      );
    } catch (logErr) {
      console.error('Logger middleware failed:', logErr.message);
    }

    return data;
  } catch (error) {
    try {
      await Log(
        'frontend',
        'error',
        'api',
        `Failed fetching notifications (page=${page}, limit=${limit}, category=${category}): ${error.message}`
      );
    } catch (logErr) {
      console.error('Logger middleware failed:', logErr.message);
    }
    throw error;
  }
}
