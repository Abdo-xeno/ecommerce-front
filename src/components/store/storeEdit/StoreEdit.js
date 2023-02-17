import * as React from "react";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";

import ProductTable from "../../product/ProductTable";
import Header from "../../../shared/Header";
import { storeServices } from "../../../services/storeService";
import { useParams } from "react-router-dom";
import StoreProductsModal from "../../product/StoreProductsModal";

export default function StoreEdit() {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState("");
  const [storeData, setStoreData] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);
  const { id } = useParams();
  const [categories, setCategories] = React.useState([]);
  const [clickedCategory, setClickedCategory] = React.useState("all");

  React.useEffect(() => {
    storeServices.getStoreById(id).then((res) => {
      setStoreData(res.data);
      setFilteredData(res.data);
    });
    storeServices.getStoreCategoriesById(id).then((res) => {
      if (res.status === 200) {
        setCategories(res.data);
      }
    });
  }, [open]);
  const getStoreProductsCategories = () => {
    storeServices.getStoreById(id).then((res) => {
      setStoreData(res.data);
      setFilteredData(res.data);
    });
    storeServices.getStoreCategoriesById(id).then((res) => {
      if (res.status === 200) {
        setCategories(res.data);
      }
    });
  };
  const handleOpenAddProduct = () => {
    setData({ action: "addProductToStore", store: storeData });
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const filterByCategory = (categoryId) => {
    setClickedCategory(categoryId);
    const products = storeData.products.filter((product) => {
      let filterBool = 0;
      product.Categories.forEach((cat) => {
        if (cat.id === categoryId) {
          filterBool = 1;
        }
      });
      return filterBool;
    });
    setFilteredData({ ...storeData, products });
  };

  const resetFilters = () => {
    setFilteredData(storeData);
    setClickedCategory("all");
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
        <Stack direction="row" spacing={2} justifyContent="center">
          {categories != null
            ? categories.map((category) => (
                <Chip
                  key={category.id}
                  label={category.name}
                  variant="outlined"
                  sx={{
                    mb: "2%",
                    background:
                      category.id === clickedCategory ? "#1BB18E" : "white",
                    color:
                      category.id === clickedCategory ? "white" : "#1BB18E",
                    /**"$clickable&:hover": {
                  background: "#1BB18E",
                  color: "white",
                },*/
                    "&&:hover": {
                      background: "#1BB18E",
                      color: "white",
                    },
                    cursor: "pointer",
                    borderColor: "#1BB18E",
                  }}
                  onClick={() => filterByCategory(category.id)}
                />
              ))
            : null}
          <Chip
            label="tous les produits"
            variant="outlined"
            sx={{
              mb: "2%",
              background: clickedCategory === "all" ? "#1BB18E" : "white",
              color: clickedCategory === "all" ? "white" : "#1BB18E",
              /**"$clickable&:hover": {
                  background: "#1BB18E",
                  color: "white",
                },*/
              "&&:hover": {
                background: "#1BB18E",
                color: "white",
              },
              cursor: "pointer",
              borderColor: "#1BB18E",
            }}
            onClick={() => resetFilters()}
          />
        </Stack>
        <Button
          sx={{
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
          }}
          variant="contained"
          onClick={() => handleOpenAddProduct()}
        >
          <Typography variant="inherit">Ajouter un produit existant</Typography>
        </Button>
        <StoreProductsModal
          open={open}
          onClose={handleClose}
          data={data}
        ></StoreProductsModal>
        {filteredData.products ? (
          <ProductTable
            storeProducts={filteredData}
            rows={filteredData.products}
            getStoreProductsCategories={getStoreProductsCategories}
          ></ProductTable>
        ) : null}
      </Box>
    </>
  );
}
