import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { FiEdit3 } from "react-icons/fi";
import { Divider, Typography } from "@mui/material";
import StoreForm from "./StoreForm";
import { FaStoreAltSlash, FaStoreAlt } from "react-icons/fa";

export default function StoreModal({ open, onClose, data, getStores }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {data &&
          (data.action === "editStore" ? (
            <Typography sx={{ color: "#1BB18E" }}>
              <FiEdit3 style={{ marginRight: 10 }} /> Modifier une boutique
            </Typography>
          ) : data === "addStore" ? (
            <Typography sx={{ color: "#1BB18E" }}>
              <FaStoreAlt style={{ marginRight: 10 }} /> Ajouter une boutique
            </Typography>
          ) : (
            <Typography sx={{ color: "#1BB18E" }}>
              <FaStoreAltSlash style={{ marginRight: 10 }} /> Supprimer une
              boutique
            </Typography>
          ))}
      </DialogTitle>
      <Divider light sx={{ mb: "10px" }}></Divider>
      <StoreForm
        getStores={getStores}
        data={data}
        handleClose={onClose}
      ></StoreForm>
    </Dialog>
  );
}
