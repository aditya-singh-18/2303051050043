import { useState } from "react";
import { 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Box, 
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import InfoIcon from "@mui/icons-material/Info";
import { Log } from 'logging-middleware';

// Card categories design structure aur detailed information
const TYPE_STYLES = {
  'Placement': {
    color: '#007FFF',
    bgColor: '#E6F0FA',
    icon: <WorkIcon sx={{ fontSize: 18 }} />,
    details: "A new placement drive has been announced. All eligible students must review company-specific requirements, update their resumes, and register via the campus placement portal. Please prepare for upcoming pre-placement talks and interviews."
  },
  'Result': {
    color: '#8A2BE2',
    bgColor: '#F3E6FA',
    icon: <SchoolIcon sx={{ fontSize: 18 }} />,
    details: "The academic evaluation or grade sheet has been published. Please log in to your student portal to review your grades, individual marks, and GPA summary. For re-evaluation requests, submit the application within 5 working days."
  },
  'Event': {
    color: '#FF8C00',
    bgColor: '#FAF0E6',
    icon: <CalendarTodayIcon sx={{ fontSize: 18 }} />,
    details: "A campus event, workshop, or seminar has been scheduled. Attendance is highly recommended for all students. Detailed schedule lists, speaker profiles, and venue details are posted on the university calendar."
  }
};

// Announcement display card jisme click hone pe detail modal open hota hai
export function NotificationCard({ notification, isRead, onMarkRead }) {
  const { ID, Type, Message, Timestamp } = notification;
  const [modalOpen, setModalOpen] = useState(false);

  const styleConfig = TYPE_STYLES[Type] || {
    color: '#757575',
    bgColor: '#F5F5F5',
    icon: null,
    details: "Announcement details and instructions."
  };

  // Card click handler for detailed popup
  const handleCardClick = async () => {
    setModalOpen(true);
    if (!isRead) {
      onMarkRead(ID);
      try {
        await Log(
          'frontend',
          'info',
          'component',
          `User opened details modal and marked card as read: ${ID}`
        );
      } catch (logErr) {
        console.error('Logger failed:', logErr.message);
      }
    } else {
      try {
        await Log(
          'frontend',
          'info',
          'component',
          `User opened details modal for card: ${ID}`
        );
      } catch (logErr) {
        console.error('Logger failed:', logErr.message);
      }
    }
  };

  // Explicit mark-read click handler
  const handleMarkReadBtn = async (e) => {
    e.stopPropagation(); // Event bubbling stop karna dialog open hone se rokne ke liye
    onMarkRead(ID);

    try {
      await Log(
        'frontend',
        'info',
        'component',
        `User clicked mark as read button for card: ${ID}`
      );
    } catch (logErr) {
      console.error('Logger failed:', logErr.message);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Card 
        elevation={isRead ? 0 : 2}
        onClick={handleCardClick}
        sx={{ 
          borderLeft: `5px solid ${isRead ? '#E0E0E0' : styleConfig.color}`,
          backgroundColor: isRead ? '#FAFAFA' : '#FFFFFF',
          cursor: 'pointer',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            backgroundColor: isRead ? '#F5F5F5' : '#FAFAFA'
          },
          mb: 1.5,
          borderRadius: 2,
          border: '1px solid',
          borderColor: isRead ? '#EEEEEE' : 'rgba(0, 0, 0, 0.05)'
        }}
      >
        <CardContent sx={{ py: 2, px: 2.5, '&:last-child': { pb: 2 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Chip 
                icon={styleConfig.icon}
                label={Type} 
                size="small"
                sx={{ 
                  backgroundColor: styleConfig.bgColor,
                  color: styleConfig.color,
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  '& .MuiChip-icon': { color: styleConfig.color }
                }}
              />
              {!isRead && (
                <Chip 
                  label="New" 
                  size="small"
                  color="primary"
                  sx={{ 
                    height: 18, 
                    fontSize: '0.65rem', 
                    fontWeight: 700, 
                    borderRadius: 1 
                  }}
                />
              )}
            </Box>
            <Typography variant="caption" color="text.secondary" fontWeight={500}>
              {Timestamp}
            </Typography>
          </Box>

          <Typography 
            variant="body1" 
            fontWeight={isRead ? 500 : 700}
            color={isRead ? 'text.secondary' : 'text.primary'}
            sx={{ mt: 1.5, mb: 1, fontSize: '1rem', lineHeight: 1.4 }}
          >
            {Message}
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
              ID: {ID.slice(0, 8)}...
            </Typography>
            {!isRead && (
              <Button
                variant="outlined"
                size="small"
                startIcon={<CheckIcon />}
                onClick={handleMarkReadBtn}
                sx={{
                  textTransform: 'none',
                  borderRadius: 2,
                  py: 0.25,
                  px: 1.5,
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  borderColor: styleConfig.color,
                  color: styleConfig.color,
                  '&:hover': {
                    backgroundColor: styleConfig.bgColor,
                    borderColor: styleConfig.color
                  }
                }}
              >
                Mark as read
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>

      <Dialog 
        open={modalOpen} 
        onClose={handleCloseModal}
        sx={{
          '& .MuiDialog-paper': { borderRadius: 3, px: 1, py: 1, maxWidth: 500 }
        }}
      >
        <DialogTitle sx={{ fontWeight: 800, fontSize: '1.25rem', pb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          <InfoIcon sx={{ color: styleConfig.color }} />
          Announcement Details
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <Chip 
              label={Type} 
              size="small"
              sx={{ backgroundColor: styleConfig.bgColor, color: styleConfig.color, fontWeight: 700 }} 
            />
            <Chip 
              label={Timestamp} 
              size="small" 
              variant="outlined" 
              sx={{ fontSize: '0.75rem' }} 
            />
          </Box>

          <Typography variant="h6" fontWeight={700} gutterBottom sx={{ fontSize: '1.1rem', lineHeight: 1.3 }}>
            {Message}
          </Typography>

          <DialogContentText sx={{ color: 'text.primary', fontSize: '0.9rem', lineHeight: 1.5, mt: 1.5 }}>
            {styleConfig.details}
          </DialogContentText>

          <Box sx={{ mt: 3, p: 1.5, backgroundColor: '#f9f9f9', borderRadius: 2, border: '1px solid #eee' }}>
            <Typography variant="caption" color="text.secondary" display="block" sx={{ fontFamily: 'monospace' }}>
              <strong>Notification ID:</strong> {ID}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button 
            onClick={handleCloseModal} 
            variant="contained" 
            sx={{ 
              textTransform: 'none', 
              borderRadius: 2, 
              backgroundColor: styleConfig.color,
              '&:hover': {
                backgroundColor: styleConfig.color,
                opacity: 0.9
              }
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
