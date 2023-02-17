import React from "react";
import { makeStyles } from "@material-ui/core";

import Select from "@mui/material/Select";
import Button from "@mui/material//Button";
import InputLabel from "@mui/material/InputLabel";
import { useFormik } from "formik";
import * as yup from "yup";
import { Box } from "@mui/system";
import { MenuItem, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { productServices } from "../../services/productService";
import { storeServices } from "../../services/storeService";
import { SnackbarContext } from "../../shared/snackbar/SnackbarContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),
    width: "550px",

    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#1BB18E",
        },
        "&:hover fieldset": {
          borderColor: "#1BB18E",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#1BB18E",
        },
      },
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(2),
    },
    "& .MuiInputLabel-root": {
      color: "#1BB18E",
    },
  },
  input: {
    color: "#666D92",
  },
  submitButton: {
    backgroundColor: "#1BB18E",
    padding: "12px 24px 12px 20px",
    textTransform: "lowercase",
    borderRadius: 28,
    float: "right",
    mb: "2%",
    "&:hover": {
      background: "#1abd97",
      color: "white",
    },
  },
  cancelButton: {
    color: "#1BB18E",
    textTransform: "lowercase",
    padding: "12px 24px 12px 20px",
    borderRadius: 28,
  },
}));

const validationSchema = yup.object({
  name: yup
    .string("Veuillez saisir le nom du produit")
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .required("Veuillez remplir ce champ"),
  price: yup
    .string("Veuillez saisir le prix du produit")
    .required("Veuillez remplir ce champ"),
});

const SelectFromProductsForm = ({ handleClose, data }) => {
  const { openSnackbar } = React.useContext(SnackbarContext);

  const [allProducts, setAllProducts] = React.useState([]);
  const [selectedProducts, setSelectedProducts] = React.useState([]);

  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      name: "Input",
      price: "Input",
      categories: [],
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      //console.log("PRODU", [...data.store.products, selectedProducts]);
      let uniqProductsArray = [];
      if (data.store.products) {
        uniqProductsArray = [
          ...new Map(
            data.store.products
              .concat(selectedProducts)
              .map((prod) => [prod.id, prod])
          ).values(),
        ];
      }

      storeServices
        .updateStore(data.store.id, {
          ...data.store,
          products: data.store.products ? uniqProductsArray : selectedProducts,
        })
        .then((res) => openSnackbar(res));
      handleClose();
    },
  });

  React.useEffect(() => {
    if (data.action === "editProduct") {
      formik.setFieldValue("name", data.rowData["nom"]);
      formik.setFieldValue("description", data.rowData["description"]);
      formik.setFieldValue("categories", data.rowData["categories"]);
    }
    productServices.getProducts().then((res) => {
      setAllProducts(res);
    });
  }, []);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedProducts(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <form className={classes.root} onSubmit={formik.handleSubmit}>
      <Box sx={{ m: 1 }}>
        <Box
          style={{
            color: "#666D92",
            fontFamily: "Barlow",
            fontWeight: "400",
            fontSize: "16px",
          }}
        >
          Veuillez sélectionner les produits que vous souhaitez ajouter à votre
          boutique parmi la liste:
        </Box>

        <InputLabel id="catégories" sx={{ mt: 2 }}>
          Liste des produits
        </InputLabel>
        <FormControl sx={{ width: "92%", mt: 1 }}>
          <Select
            value={selectedProducts}
            onChange={handleChange}
            inputProps={{ className: classes.input }}
            multiple
            sx={{
              stroke: "#1BB18E",
              ".MuiInputLabel-root": {
                color: "#1BB18E",
              },
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: "#1BB18E",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#1BB18E",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#1BB18E",
              },
              ".MuiSvgIcon-root ": {
                fill: "white !important",
              },
            }}
          >
            {allProducts?.map((product) => (
              <MenuItem key={product.id} value={product}>
                {product.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box style={{ marginBottom: -10, marginLeft: "55%", display: "flex" }}>
        <Typography sx={{ mr: "-10px" }}>
          <Button
            variant="text"
            className={classes.cancelButton}
            onClick={handleClose}
          >
            Annuler
          </Button>
        </Typography>
        <Typography>
          <Button
            type="submit"
            id="submitButton"
            variant="contained"
            className={classes.submitButton}
          >
            Ajouter
          </Button>
        </Typography>
      </Box>
    </form>
  );
};

export default SelectFromProductsForm;
