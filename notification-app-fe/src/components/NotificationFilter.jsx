import { ToggleButton, ToggleButtonGroup } from "@mui/material";

const filters = ["All", "Placement", "Result", "Event"];

// Announcements categories ke selection buttons group
export function NotificationFilter({ value, onChange }) {
  const handleChange = (event, newAlignment) => {
    // Kisi empty/null option selection ko avoid karna
    if (newAlignment !== null && onChange) {
      onChange(newAlignment);
    }
  };

  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={handleChange}
      size="small"
      sx={{ flexWrap: "wrap", gap: 0.5 }}
    >
      {filters.map((type) => (
        <ToggleButton key={type} value={type} sx={{ textTransform: "none", px: 2 }}>
          {type}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}