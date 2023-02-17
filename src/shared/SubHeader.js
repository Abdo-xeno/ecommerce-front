import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import StoreIcon from "@mui/icons-material/Store";
import CategoryIcon from "@mui/icons-material/Category";

export default function SubHeader() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      aria-label="icon label tabs example"
      centered
    >
      <Tab
        icon={<StoreIcon />}
        label="Boutiques"
        sx={{
          textTransform: "none",
          color: "#1BB18E",

          "&:root": {
            color: "#1BB18E",
          },
          "&:selected": {
            color: "#1BB18E",
          },
          "&:focus": {
            color: "#1BB18E",
          },
          "&:active": {
            color: "#1BB18E",
          },
        }}
      />
      <Tab
        icon={<CategoryIcon />}
        label="Categories"
        sx={{
          textTransform: "none",
          color: "#1BB18E",
          "&:root": {
            color: "#1BB18E",
          },
          "&:selected": {
            color: "#1BB18E",
          },
          "&:focus": {
            color: "#1BB18E",
          },
          "&:active": {
            color: "#1BB18E",
          },
        }}
      />
    </Tabs>
  );
}
