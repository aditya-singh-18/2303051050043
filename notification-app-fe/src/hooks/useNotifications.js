import { useState, useEffect } from "react";
import { fetchNotifications } from "../api/notifications";
import { Log } from 'logging-middleware';

// Hooks logic custom state, pagination, and localStorage local cache handle karne ke liye
export function useNotifications(page = 1, limit = 10, category = 'All') {
  const [notifications, setNotifications] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Local storage se read/viewed notification IDs restore karna
  const [readIds, setReadIds] = useState(() => {
    try {
      const stored = localStorage.getItem('affordmed_read_notification_ids');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('affordmed_read_notification_ids', JSON.stringify(readIds));
  }, [readIds]);

  useEffect(() => {
    let active = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchNotifications(page, limit, category);
        if (active) {
          const fetchedList = data.notifications ?? [];
          setNotifications(fetchedList);
          
          const simulatedTotal = fetchedList.length < limit ? (page - 1) * limit + fetchedList.length : 30; 
          setTotalCount(simulatedTotal);

          try {
            await Log(
              'frontend',
              'info',
              'hook',
              `Hook state loaded successfully for page ${page}`
            );
          } catch (logErr) {
            console.error('Logger failed:', logErr.message);
          }
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'An error occurred while loading notifications.');
          setNotifications([]);
          setTotalCount(0);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      active = false;
    };
  }, [page, limit, category]);

  const totalPages = Math.max(1, Math.ceil(totalCount / limit));
  const unreadCount = notifications.filter(n => !readIds.includes(n.ID)).length;

  // Single card read state update
  const markAsRead = async (id) => {
    if (!readIds.includes(id)) {
      setReadIds(prev => [...prev, id]);

      try {
        await Log(
          'frontend',
          'info',
          'hook',
          `Notification marked as read: ${id}`
        );
      } catch (logErr) {
        console.error('Logger failed:', logErr.message);
      }
    }
  };

  // Bulk status clear
  const markAllAsRead = async () => {
    const unreadCurrentIds = notifications
      .map(n => n.ID)
      .filter(id => !readIds.includes(id));
      
    if (unreadCurrentIds.length > 0) {
      setReadIds(prev => [...prev, ...unreadCurrentIds]);

      try {
        await Log(
          'frontend',
          'info',
          'hook',
          `All ${unreadCurrentIds.length} current notifications marked as read`
        );
      } catch (logErr) {
        console.error('Logger failed:', logErr.message);
      }
    }
  };

  return {
    notifications,
    totalPages,
    loading,
    error,
    readIds,
    unreadCount,
    markAsRead,
    markAllAsRead
  };
}
