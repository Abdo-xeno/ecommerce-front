import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FiEdit3 } from "react-icons/fi";
import { Divider, Typography } from "@mui/material";
import Form from "./Form";

export default function AddDialog({ open, onClose }) {
  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>
          <Typography sx={{ color: "#FDC63B" }}>
            <FiEdit3 style={{ marginRight: 10 }} /> Ajouter un produit
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Divider light></Divider>

          <Form></Form>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={onClose}>
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
