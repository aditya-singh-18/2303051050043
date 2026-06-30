import { useState } from "react";
import {
  Alert,
  Badge,
  Box,
  CircularProgress,
  Divider,
  Pagination,
  Stack,
  Typography,
  Tabs,
  Tab,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

import { NotificationCard } from "../components/NotificationCard";
import { NotificationFilter } from "../components/NotificationFilter";
import { useNotifications } from "../hooks/useNotifications";
import { compareNotifications } from "../utils/priority";
import { Log } from 'logging-middleware';

// Announcements list and Priority inbox tabs layout dashboard page component
export function NotificationsPage() {
  const [activeTab, setActiveTab] = useState(0); // 0 = Feed, 1 = Priority Inbox
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [priorityLimit, setPriorityLimit] = useState(10);

  const { 
    notifications, 
    totalPages, 
    loading, 
    error, 
    readIds, 
    unreadCount, 
    markAsRead, 
    markAllAsRead 
  } = useNotifications(page, 10, filter);

  // Unread items ko priority weight aur date ke order me sort karke limit apply karna
  const priorityNotifications = [...notifications]
    .filter(n => !readIds.includes(n.ID))
    .sort(compareNotifications)
    .slice(0, priorityLimit);

  // Dashboard feeds tabs toggle navigation handler
  const handleTabChange = async (_, newValue) => {
    setActiveTab(newValue);
    const viewName = newValue === 0 ? 'All Notifications' : 'Priority Inbox';
    try {
      await Log(
        'frontend',
        'info',
        'page',
        `User navigated to: ${viewName}`
      );
    } catch (logErr) {
      console.error('Logger failed:', logErr.message);
    }
  };

  const handleFilterChange = async (newFilter) => {
    setFilter(newFilter);
    setPage(1); // category change hone pe page list reset karna
    try {
      await Log(
        'frontend',
        'info',
        'page',
        `User filtered notifications by category: ${newFilter}`
      );
    } catch (logErr) {
      console.error('Logger failed:', logErr.message);
    }
  };

  const handlePageChange = async (_, newPage) => {
    setPage(newPage);
    try {
      await Log(
        'frontend',
        'info',
        'page',
        `User navigated to notifications page: ${newPage}`
      );
    } catch (logErr) {
      console.error('Logger failed:', logErr.message);
    }
  };

  const handlePriorityLimitChange = async (event) => {
    const limit = event.target.value;
    setPriorityLimit(limit);
    try {
      await Log(
        'frontend',
        'info',
        'page',
        `User changed priority inbox limit to: ${limit}`
      );
    } catch (logErr) {
      console.error('Logger failed:', logErr.message);
    }
  };

  return (
    <Box sx={{ maxWidth: 720, mx: "auto", px: 2, py: 4 }}>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Stack direction="row" sx={{ alignItems: 'center' }} spacing={1.5}>
          <Badge badgeContent={unreadCount} color="error" max={99}>
            <NotificationsIcon sx={{ fontSize: 28, color: '#333' }} />
          </Badge>
          <Typography variant="h5" fontWeight={800} color="#1A1A1A">
            Announcements Dashboard Page
          </Typography>
        </Stack>
        {unreadCount > 0 && (
          <Button 
            startIcon={<CheckCircleIcon />}
            variant="text" 
            size="small"
            onClick={markAllAsRead}
            sx={{ textTransform: 'none', fontWeight: 600, fontSize: '0.85rem' }}
          >
            Mark all read
          </Button>
        )}
      </Stack>

      <Divider sx={{ mb: 2 }} />

      <Tabs 
        value={activeTab} 
        onChange={handleTabChange} 
        variant="fullWidth" 
        sx={{ 
          mb: 3, 
          '& .MuiTab-root': { textTransform: 'none', fontWeight: 700, fontSize: '0.95rem' } 
        }}
      >
        <Tab label="All Notifications" />
        <Tab icon={<AutoAwesomeIcon sx={{ fontSize: 16 }} />} iconPosition="start" label="Priority Inbox" />
      </Tabs>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      )}

      {!loading && error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          Failed to load notifications, Plese try Again: {error}
        </Alert>
      )}

      {!loading && !error && (
        <>
          {activeTab === 0 ? (
            <Box>
              <Box sx={{ marginBottom: 3 }}>
                <NotificationFilter value={filter} onChange={handleFilterChange} />
              </Box>

              {notifications.length === 0 ? (
                <Alert severity="info" sx={{ borderRadius: 2 }}>
                  No announcements found for category: <strong>{filter}</strong>.
                </Alert>
              ) : (
                <Stack spacing={1}>
                  {notifications.map((n) => (
                    <NotificationCard 
                      key={n.ID} 
                      notification={n} 
                      isRead={readIds.includes(n.ID)}
                      onMarkRead={markAsRead}
                    />
                  ))}
                </Stack>
              )}

              {notifications.length > 0 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    shape="rounded"
                  />
                </Box>
              )}
            </Box>
          ) : (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
                <Typography variant="body2" color="text.secondary" fontWeight={500}>
                  Showing top unread items sorted by weight <em>(Placement &gt; Result &gt; Event)</em> and recency.
                </Typography>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel id="priority-limit-label">Display Limit</InputLabel>
                  <Select
                    labelId="priority-limit-label"
                    value={priorityLimit}
                    label="Display Limit"
                    onChange={handlePriorityLimitChange}
                    sx={{ borderRadius: 2 }}
                  >
                    <MenuItem value={5}>Top 5</MenuItem>
                    <MenuItem value={10}>Top 10</MenuItem>
                    <MenuItem value={15}>Top 15</MenuItem>
                    <MenuItem value={20}>Top 20</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {priorityNotifications.length === 0 ? (
                <Alert severity="success" sx={{ borderRadius: 2 }}>
                  🎉 Hurray! You have caught up with all high-priority notifications.
                </Alert>
              ) : (
                <Stack spacing={1}>
                  {priorityNotifications.map((n) => (
                    <NotificationCard 
                      key={n.ID} 
                      notification={n} 
                      isRead={readIds.includes(n.ID)}
                      onMarkRead={markAsRead}
                    />
                  ))}
                </Stack>
              )}
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
