import { SnackbarContext } from "./SnackbarContext";
import * as React from "react";
import Snackbar from "@mui/material/Snackbar";

function StatusSnackbar(open, handleClose) {
  const { message } = React.useContext(SnackbarContext);

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      message={message}
    />
  );
}

export default StatusSnackbar;
