import React from "react";
import { makeStyles } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import { SnackbarContext } from "../../shared/snackbar/SnackbarContext";

import Select from "@mui/material/Select";
import Button from "@mui/material//Button";
import InputLabel from "@mui/material/InputLabel";
import { useFormik } from "formik";
import * as yup from "yup";
import { Box } from "@mui/system";
import { MenuItem, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { categoryServices } from "../../services/categoryService";
import { productServices } from "../../services/productService";
import { storeServices } from "../../services/storeService";

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
    .string("Veuillez saisir le nom du produit en français")
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .required("Veuillez remplir ce champ"),
  engName: yup
    .string("Veuillez saisir le nom du produit en anglais")
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .required("Veuillez remplir ce champ"),
  price: yup
    .number()
    .typeError("Veuillez saisir le prix du produit")
    .required("Veuillez remplir ce champ"),
});

const ProductsForm = ({
  handleClose,
  data,
  storeProducts,
  getStoreProductsCategories,
}) => {
  const { openSnackbar } = React.useContext(SnackbarContext);

  const [categories, setCategories] = React.useState([]);
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      name: "",
      engName: "",
      price: "",
      Categories: [],
      description: "",
      engDescription: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (data.action === "addNewProduct") {
        productServices.addProduct(formik.values).then((res) => {
          openSnackbar(res);
          handleClose();
        });
      }
      if (data.action === "editProduct") {
        if (storeProducts) {
          let updatedStoreProducts = storeProducts.products.map((prod) => {
            if (prod.id === data.rowData.id) {
              return { ...formik.values, id: data.rowData.id };
            }
            return prod;
          });
          storeServices
            .updateStore(storeProducts.id, {
              ...storeProducts,
              products: updatedStoreProducts,
            })
            .then((res) => {
              openSnackbar(res);

              getStoreProductsCategories();
              handleClose();
            });
        } else {
          productServices
            .updateProduct(data.rowData.id, formik.values)
            .then((res) => {
              openSnackbar(res);
              handleClose();
            });
        }
      }
    },
  });

  React.useEffect(() => {
    if (data.action === "editProduct") {
      formik.setFieldValue("name", data.rowData["name"]);
      formik.setFieldValue("engName", data.rowData["engName"]);

      formik.setFieldValue("price", data.rowData["price"]);
      formik.setFieldValue("description", data.rowData["description"]);
      formik.setFieldValue("engDescription", data.rowData["engDescription"]);
      formik.setFieldValue(
        "Categories",
        data.rowData["Categories"] ? data.rowData["Categories"] : []
      );
      setCategories(
        data.rowData["Categories"] ? data.rowData["Categories"] : []
      );

      //setCategories(data.rowData["categories"]);
    } else {
      categoryServices.getCategories().then((res) => {
        setCategories(res);
      });
    }
  }, []);

  const handleDeleteProduct = () => {
    if (storeProducts) {
      let updatedStoreProducts = storeProducts.products.filter(
        (prod) => prod.id !== data.rowData.id
      );
      storeServices
        .updateStore(storeProducts.id, {
          ...storeProducts,
          products: updatedStoreProducts,
        })
        .then((res) => {
          getStoreProductsCategories();
          openSnackbar(res);
          handleClose();
        });
    } else {
      productServices.deleteProduct(data.rowData.id).then((res) => {
        openSnackbar(res);
        handleClose();
      });
    }
  };

  const onOpenSelect = () => {
    formik.setFieldValue("Categories", []);
    categoryServices.getCategories().then((res) => {
      setCategories(res);
    });
  };

  return (
    <form className={classes.root} onSubmit={formik.handleSubmit}>
      {data.action !== "deleteProduct" ? (
        <Box sx={{ mt: 1 }}>
          <Box sx={{ display: "flex" }}>
            <InputLabel required id="name" style={{ marginTop: -20 }}>
              Nom Français
            </InputLabel>

            <TextField
              style={{ marginLeft: -103 }}
              id="name"
              placeholder="Input"
              name="name"
              size="small"
              sx={{ width: "200px" }}
              inputProps={{ className: classes.input }}
              variant="outlined"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <InputLabel
              required
              id="engName"
              style={{ marginTop: -20, marginLeft: 15 }}
            >
              Nom Anglais
            </InputLabel>
            <TextField
              style={{
                marginLeft: -80,
              }}
              className={classes.textField}
              size="small"
              id="engName"
              placeholder="Input"
              name="engName"
              sx={{ width: "200px" }}
              variant="outlined"
              inputProps={{ className: classes.input }}
              value={formik.values.engName}
              onChange={formik.handleChange}
              error={formik.touched.engName && Boolean(formik.errors.engName)}
              helperText={formik.touched.engName && formik.errors.engName}
            />
          </Box>
          <InputLabel required id="prix">
            Prix
          </InputLabel>
          <TextField
            className={classes.textField}
            size="small"
            id="price"
            placeholder="Input"
            name="price"
            sx={{ width: "200px" }}
            variant="outlined"
            inputProps={{ className: classes.input }}
            value={formik.values.price}
            onChange={formik.handleChange}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
          />

          <InputLabel id="description">Description en français</InputLabel>
          <TextField
            id="description"
            name="description"
            placeholder="Input"
            variant="outlined"
            size="small"
            sx={{
              width: "443px",
            }}
            inputProps={{ className: classes.input }}
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
          <InputLabel id="engDescription">Description en anglais</InputLabel>
          <TextField
            id="engDescription"
            name="engDescription"
            placeholder="Input"
            variant="outlined"
            size="small"
            sx={{
              width: "443px",
            }}
            inputProps={{ className: classes.input }}
            value={formik.values.engDescription}
            onChange={formik.handleChange}
            error={
              formik.touched.engDescription &&
              Boolean(formik.errors.engDescription)
            }
            helperText={
              formik.touched.engDescription && formik.errors.engDescription
            }
          />
          <InputLabel id="Categories">Catégories</InputLabel>
          <FormControl sx={{ m: 1, width: 270, mt: 1 }}>
            <Select
              id="Categories"
              name="Categories"
              value={formik.values.Categories}
              onChange={formik.handleChange}
              inputProps={{ className: classes.input }}
              multiple
              onOpen={data.action === "editProduct" ? onOpenSelect : null}
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
              {categories?.map((cat) => (
                <MenuItem key={cat.id} value={cat}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      ) : (
        <Box
          style={{
            color: "#666D92",
            fontFamily: "Barlow",
            fontWeight: "400",
            fontSize: "16px",
            marginLeft: 16,
          }}
        >
          Vous êtes sur le point de supprimer un produit. Cette action est
          irrévercible. Souhaitez-vous confirmer ?
        </Box>
      )}

      <Box style={{ marginBottom: -10, marginLeft: "52%", display: "flex" }}>
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
          {data.action === "deleteProduct" ? (
            <Button
              id="submitButton"
              variant="contained"
              sx={{
                backgroundColor: "#FDC63B",
                padding: "12px 24px 12px 20px",
                textTransform: "lowercase",
                borderRadius: 28,
                float: "right",
                mb: "2%",
                "&:hover": {
                  background: "#fcd36a",
                  color: "white",
                },
              }}
              onClick={handleDeleteProduct}
            >
              Supprimer
            </Button>
          ) : (
            <Button
              type="submit"
              id="submitButton"
              variant="contained"
              className={classes.submitButton}
            >
              {data.action === "editProduct" ? "Modifier" : "Ajouter"}
            </Button>
          )}
        </Typography>
      </Box>
    </form>
  );
};

export default ProductsForm;
