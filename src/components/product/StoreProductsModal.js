import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { FiEdit3 } from "react-icons/fi";
import { Divider, Typography } from "@mui/material";
import ProductsForm from "./ProductsForm";
import SelectFromProductsForm from "./SelectFromProductsForm";

import { BsBagPlus, BsBagDash } from "react-icons/bs";

export default function StoreProductsModal({
  open,
  onClose,
  data,
  storeProducts,
  getStoreProductsCategories,
}) {
  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>
          {data &&
            (data.action === "editProduct" ? (
              <Typography sx={{ color: "#1BB18E" }}>
                <FiEdit3 style={{ marginRight: 10 }} /> Modifier un produit
              </Typography>
            ) : data.action === "addNewProduct" ? (
              <Typography sx={{ color: "#1BB18E" }}>
                <BsBagPlus style={{ marginRight: 10 }} /> Ajouter un nouveau
                produit
              </Typography>
            ) : data.action === "deleteProduct" ? (
              <Typography sx={{ color: "#1BB18E" }}>
                <BsBagDash style={{ marginRight: 10 }} /> Supprimer un produit
              </Typography>
            ) : (
              <Typography sx={{ color: "#1BB18E" }}>
                <BsBagPlus style={{ marginRight: 10 }} /> Ajouter un produit
                existant
              </Typography>
            ))}
        </DialogTitle>
        <Divider light sx={{ mb: "10px" }}></Divider>
        {data &&
          (data.action === "addProductToStore" ? (
            <SelectFromProductsForm
              data={data}
              handleClose={onClose}
            ></SelectFromProductsForm>
          ) : (
            <ProductsForm
              getStoreProductsCategories={getStoreProductsCategories}
              storeProducts={storeProducts}
              data={data}
              handleClose={onClose}
            ></ProductsForm>
          ))}
      </Dialog>
    </div>
  );
}
