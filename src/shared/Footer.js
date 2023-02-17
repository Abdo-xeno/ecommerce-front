import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";

export default function Footer() {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ mt: "2%", position: "fixed", bottom: 0, width: "100%" }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{ backgroundColor: "#1BB18E" }}
      ></BottomNavigation>
    </Box>
  );
}
