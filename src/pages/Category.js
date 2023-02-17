import * as React from "react";
import { Box, Button, Typography } from "@mui/material";

import Header from "../shared/Header";
import CategoryModal from "../components/category/CategoryModal";
import { categoryServices } from "../services/categoryService";
import CategoriesTable from "../components/category/CategoriesTable";

export default function ProductList() {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState("");
  const [categoriesData, setCategoriesData] = React.useState([]);

  React.useEffect(() => {
    categoryServices.getCategories().then((res) => {
      setCategoriesData(res);
    });
  }, [open]);
  const handleOpenAddNewCategoryModal = () => {
    setData({ action: "addNewCategory" });
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Header />
      <Box
        sx={{
          flexGrow: 1,
          pl: "10%",
          dislay: "flex",
          alignItems: "center",
          pr: "10%",
          mt: "2%",
        }}
      >
        <Button
          sx={{
            backgroundColor: "#1BB18E",
            padding: "12px 24px 12px 20px",
            textTransform: "lowercase",
            borderRadius: 28,
            float: "right",
            mb: "2%",
            ml: "2%",
            "&:hover": {
              background: "#1abd97",
              color: "white",
            },
          }}
          variant="contained"
          onClick={() => handleOpenAddNewCategoryModal()}
        >
          <Typography variant="inherit">Ajouter une catégorie</Typography>
        </Button>
        <CategoryModal
          open={open}
          onClose={handleClose}
          data={data}
        ></CategoryModal>
        <CategoriesTable rows={categoriesData}></CategoriesTable>
      </Box>
    </>
  );
}
