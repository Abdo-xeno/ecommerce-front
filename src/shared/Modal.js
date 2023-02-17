import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Form from "./Form";
import { FiUserPlus, FiUserMinus } from "react-icons/fi";
import { FiEdit3 } from "react-icons/fi";

const ModalDialog = ({
  open,
  handleClose,
  data,
  rowData,
  appCallback,
  tableCallback,
}) => {
  return (
    <Dialog
      style={{
        minWidth: "800px",
      }}
      open={open}
      onClose={handleClose}
    >
      {data === "addUser" ? (
        <div className="modalText">
          <FiUserPlus style={{ marginRight: 10 }} /> Ajouter un utilisateur
        </div>
      ) : data === "editUser" ? (
        <div className="modalText">
          <FiEdit3 style={{ marginRight: 10 }} /> Modifier un utilisateur
        </div>
      ) : (
        <div className="modalText">
          <FiUserMinus style={{ marginRight: 10 }} /> Confirmer la suppression
        </div>
      )}
      <Form
        handleClose={handleClose}
        data={data}
        rowData={rowData}
        parentCallback={data === "addUser" ? appCallback : tableCallback}
      />
    </Dialog>
  );
};

export default ModalDialog;
