import React from "react";
import { makeStyles } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import { useFormik } from "formik";
import * as yup from "yup";
import { Box } from "@mui/system";
import { MenuItem, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import moment from "moment/moment";
import { storeServices } from "../../../services/storeService";
import { SnackbarContext } from "../../../shared/snackbar/SnackbarContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),
    width: "520px",

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

    "& .MuiInputLabel-root": {
      color: "#1BB18E",
    },
  },
  input: {
    color: "#666D92",
  },
  submitButton: {
    margin: theme.spacing(2),
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
    margin: theme.spacing(2),
    color: "#1BB18E",
    textTransform: "lowercase",
    padding: "12px 24px 12px 20px",
    borderRadius: 28,
  },
  deleteButton: {
    margin: theme.spacing(2),
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
  },
}));

const validationSchema = yup.object({
  name: yup
    .string("Veuillez saisir un nom")
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .required("Veuillez saisir un nom"),
  openTime: yup
    .string("Veuillez choisir l'heure d'ouverture")
    .required("Veuillez choisir l'heure d'ouverture"),
  closeTime: yup
    .string("Veuillez choisir l'heure de fermeture")
    .required("Veuillez choisir l'heure de fermeture"),
});

const StoreForm = ({ handleClose, data, getStores }) => {
  const { openSnackbar } = React.useContext(SnackbarContext);

  const handleChangeOpenTime = (newValue) => {
    formik.setFieldValue("openTime", moment(newValue["$d"]).format());
  };
  const handleChangeCloseTime = (newValue) => {
    formik.setFieldValue("closeTime", moment(newValue["$d"]).format());
  };
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      name: "",
      onBreak: "false",
      openTime: "",
      closeTime: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (data === "addStore") {
        storeServices.addStore(formik.values).then((res) => {
          getStores();

          openSnackbar(res);
        });
      }
      if (data.action === "deleteStore") {
        storeServices.deleteStore(data.storeData.id).then((res) => {
          openSnackbar(res);

          getStores();
        });
      }
      if (data.action === "editStore") {
        storeServices
          .updateStore(data.storeData.id, formik.values)
          .then((res) => {
            openSnackbar(res);

            getStores();
          });
      }
      handleClose();
    },
  });

  React.useEffect(() => {
    if (data.action === "editStore") {
      formik.setFieldValue("name", data.storeData.name);
      formik.setFieldValue("description", data.storeData.description);
      formik.setFieldValue(
        "onBreak",
        data.storeData.onBreak ? "true" : "false"
      );
      formik.setFieldValue("openTime", data.storeData.openTime);
      formik.setFieldValue("closeTime", data.storeData.closeTime);
    }
  }, []);

  const handleDeleteStore = () => {
    storeServices.deleteStore(data.storeData.id).then((res) => {
      handleClose();
      getStores();
      openSnackbar(res);
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form className={classes.root} onSubmit={formik.handleSubmit}>
        {data.action !== "deleteStore" ? (
          <Box sx={{ mt: 1 }}>
            <Box sx={{ display: "flex" }}>
              <InputLabel required id="nom" style={{ marginTop: -20 }}>
                Nom
              </InputLabel>

              <TextField
                style={{ marginLeft: -25 }}
                id="name"
                name="name"
                size="small"
                placeholder="Input"
                inputProps={{ className: classes.input }}
                variant="outlined"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />

              <InputLabel
                required
                id="catégories"
                style={{ marginTop: -20, marginLeft: 17 }}
              >
                Congé
              </InputLabel>
              <FormControl sx={{ m: 1, mt: 1 }}>
                <Select
                  value={formik.values.onBreak}
                  onChange={formik.handleChange}
                  size="small"
                  name="onBreak"
                  inputProps={{ className: classes.input }}
                  sx={{
                    marginLeft: -5,
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
                  <MenuItem value="true">Oui</MenuItem>
                  <MenuItem value="false">Non</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <InputLabel required id="prix" sx={{ mt: 1 }}>
              Horaires d'ouvertures
            </InputLabel>
            <Box
              sx={{ display: "flex", color: "#666D92", alignItems: "center" }}
            >
              <Typography
                sx={{
                  ml: 1,
                }}
              >
                de
              </Typography>
              <TimePicker
                value={formik.values.openTime}
                name="openTime"
                onChange={handleChangeOpenTime}
                ampm={false}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={
                      formik.touched.openTime && Boolean(formik.errors.openTime)
                    }
                    helperText={
                      formik.touched.openTime && formik.errors.openTime
                    }
                    sx={{ width: "145px" }}
                    size="small"
                  />
                )}
              />
              <Typography>à</Typography>
              <TimePicker
                value={formik.values.closeTime}
                name="closeTime"
                ampm={false}
                onChange={handleChangeCloseTime}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={
                      formik.touched.closeTime &&
                      Boolean(formik.errors.closeTime)
                    }
                    helperText={
                      formik.touched.closeTime && formik.errors.closeTime
                    }
                    sx={{ width: "145px" }}
                    size="small"
                  />
                )}
              />
            </Box>
            <InputLabel id="description" sx={{ mt: 1 }}>
              Description
            </InputLabel>
            <TextField
              id="description"
              name="description"
              variant="outlined"
              size="small"
              placeholder="Input"
              sx={{
                width: "442px",
              }}
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
            Vous êtes sur le point de supprimer une boutique. Cette action est
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
            {data.action === "deleteStore" ? (
              <Button
                id="submitDeleteButton"
                variant="contained"
                className={classes.deleteButton}
                onClick={handleDeleteStore}
              >
                Supprimer
              </Button>
            ) : (
              <Button
                id="submitButton"
                variant="contained"
                className={classes.submitButton}
                type="submit"
              >
                {data.action === "editStore" ? "Modifier" : "Ajouter"}
              </Button>
            )}
          </Typography>
        </Box>
      </form>
    </LocalizationProvider>
  );
};

export default StoreForm;
