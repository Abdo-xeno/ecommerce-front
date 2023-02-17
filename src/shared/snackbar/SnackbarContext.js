import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

export const SnackbarContext = React.createContext();

export function SnackbarProvider({ children }) {
  const [message, setMessage] = useState({ status: 0, data: {} });
  const [open, setOpen] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const openSnackbar = (msg) => {
    setMessage(msg);
    setOpen(true);
  };
  return (
    <SnackbarContext.Provider value={{ message, openSnackbar }}>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        sx={{ mb: "2%" }}
      >
        <Alert
          onClose={handleClose}
          severity={
            message && message.status === 200
              ? "success"
              : message.status === 400
              ? "warning"
              : "error"
          }
          sx={{ width: "100%" }}
        >
          {message.data.message}
        </Alert>
      </Snackbar>
      {children}
    </SnackbarContext.Provider>
  );
}
