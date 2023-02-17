import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { FiEdit3 } from "react-icons/fi";
import { Divider, Typography } from "@mui/material";
import { BiCategoryAlt } from "react-icons/bi";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import CategoriesForm from "./CategoriesForm";

export default function CategoryModal({ open, onClose, data }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {data &&
          (data.action === "editCategory" ? (
            <Typography sx={{ color: "#1BB18E" }}>
              <FiEdit3 style={{ marginRight: 10 }} /> Modifier une catégorie
            </Typography>
          ) : data.action === "addNewCategory" ? (
            <Typography sx={{ color: "#1BB18E" }}>
              <BiCategoryAlt style={{ marginRight: 10 }} /> Ajouter une
              catégorie
            </Typography>
          ) : (
            <Typography sx={{ color: "#1BB18E" }}>
              <MdOutlineRemoveCircleOutline style={{ marginRight: 10 }} />{" "}
              Supprimer une catégorie
            </Typography>
          ))}
      </DialogTitle>
      <Divider light sx={{ mb: "10px" }}></Divider>
      <CategoriesForm data={data} handleClose={onClose}></CategoriesForm>
    </Dialog>
  );
}
