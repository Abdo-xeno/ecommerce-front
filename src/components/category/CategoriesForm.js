import React from "react";
import { makeStyles } from "@material-ui/core";
import TextField from "@mui/material/TextField";
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
});

const CategoriesForm = ({ handleClose, data }) => {
  const { openSnackbar } = React.useContext(SnackbarContext);

  const [products, setProducts] = React.useState([]);
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      name: "",
      products: [],
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (data.action === "addNewCategory") {
        categoryServices.addCategory(formik.values).then((res) => {
          openSnackbar(res);
          handleClose();
        });
      }
      if (data.action === "editCategory") {
        categoryServices
          .updateCategory(data.rowData.id, formik.values)
          .then((res) => {
            openSnackbar(res);
            handleClose();
          });
      }
    },
  });

  React.useEffect(() => {
    if (data.action === "editCategory") {
      formik.setFieldValue("name", data.rowData["name"]);
      formik.setFieldValue("description", data.rowData["description"]);
      formik.setFieldValue(
        "products",
        data.rowData["Products"] ? data.rowData["Products"] : []
      );
      setProducts(data.rowData["Products"] ? data.rowData["Products"] : []);
    } else {
      productServices.getProducts().then((res) => {
        setProducts(res);
      });
    }
  }, []);

  const handleDeleteCategory = () => {
    categoryServices.deleteCategory(data.rowData.id).then((res) => {
      handleClose();
      openSnackbar(res);
    });
  };

  const onOpenSelect = () => {
    formik.setFieldValue("products", []);
    productServices.getProducts().then((res) => {
      setProducts(res);
    });
  };

  return (
    <form className={classes.root} onSubmit={formik.handleSubmit}>
      {data.action !== "deleteCategory" ? (
        <Box sx={{ mt: 1 }}>
          <Box sx={{ display: "flex" }}>
            <InputLabel required id="nom" style={{ marginTop: -20 }}>
              Nom
            </InputLabel>

            <TextField
              style={{ marginLeft: -35 }}
              id="name"
              placeholder="Input"
              name="name"
              size="small"
              inputProps={{ className: classes.input }}
              variant="outlined"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />

            <InputLabel
              id="description"
              style={{ marginTop: -20, marginLeft: 15 }}
            >
              Description
            </InputLabel>
            <TextField
              style={{
                marginLeft: "-70px",
              }}
              id="description"
              name="description"
              placeholder="Input"
              variant="outlined"
              size="small"
              inputProps={{ className: classes.input }}
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
          </Box>
          <InputLabel id="products">Produits</InputLabel>
          <FormControl sx={{ m: 1, width: 480, mt: 1 }}>
            <Select
              id="products"
              name="products"
              value={formik.values.products}
              onChange={formik.handleChange}
              inputProps={{ className: classes.input }}
              multiple
              onOpen={data.action === "editCategory" ? onOpenSelect : null}
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
              {products?.map((prod) => (
                <MenuItem key={prod.id} value={prod}>
                  {prod.name}
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
          Vous êtes sur le point de supprimer une catégorie. Cette action est
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
          {data.action === "deleteCategory" ? (
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
              onClick={handleDeleteCategory}
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
              {data.action === "editCategory" ? "Modifier" : "Ajouter"}
            </Button>
          )}
        </Typography>
      </Box>
    </form>
  );
};

export default CategoriesForm;
