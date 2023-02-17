import * as React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";

import ProductTable from "../components/product/ProductTable";
import Header from "../shared/Header";
import StoreProductsModal from "../components/product/StoreProductsModal";
import { productServices } from "../services/productService";
import { Switch } from "@mui/material";

export default function ProductList() {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState("");
  const [productsData, setProductsData] = React.useState([]);
  const [translateToEng, setTranslateToEng] = React.useState(false);
  React.useEffect(() => {
    getProducts();
  }, [open]);
  const handleOpenAddNewProductModal = () => {
    setData({ action: "addNewProduct" });
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const translateProdNameDesc = () => {
    setTranslateToEng(!translateToEng);
  };
  const getProducts = () => {
    productServices.getProducts().then((res) => {
      setProductsData(res);
    });
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
          onClick={() => handleOpenAddNewProductModal()}
        >
          <Typography variant="inherit">Ajouter un produit</Typography>
        </Button>
        <Stack direction="row" spacing={1} alignItems="center">
          {translateToEng ? (
            <Typography sx={{ color: "#666D92" }}>
              Traduire en français
            </Typography>
          ) : (
            <Typography sx={{ color: "#666D92" }}>
              Traduire en anglais
            </Typography>
          )}

          <Switch
            checked={translateToEng}
            sx={{
              ".MuiSwitch-switchBase": {
                "&.Mui-checked": {
                  color: "#1BB18E",
                  "& + .MuiSwitch-track": {
                    backgroundColor: "#1BB18E",
                  },
                },
              },
            }}
            inputProps={{ "aria-label": "ant design" }}
            onChange={translateProdNameDesc}
          />
        </Stack>

        <StoreProductsModal
          open={open}
          onClose={handleClose}
          data={data}
        ></StoreProductsModal>
        <ProductTable
          rows={productsData}
          translateToEng={translateToEng}
        ></ProductTable>
      </Box>
    </>
  );
}
