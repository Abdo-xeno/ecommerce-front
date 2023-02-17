import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DescriptionCard from "../../shared/Card";
import CustomDeleteIconChips from "../../shared/Filters";
import { Button, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import StoreModal from "./storeEdit/StoreModal";

import Pagination from "@mui/material/Pagination";

export default function StoreList({ data, resetSortFilter, getStores }) {
  const [storesData, setStoresData] = React.useState(data);
  const [open, setOpen] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [storesPerPage] = React.useState(6);
  const indexOfLastStore = currentPage * storesPerPage;
  const indexOfFirstStore = indexOfLastStore - storesPerPage;
  const currentPosts = storesData?.slice(indexOfFirstStore, indexOfLastStore);
  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  React.useEffect(() => {
    setStoresData(data);
  }, [data]);
  const filterStoresBy = (filter) => {
    switch (filter) {
      case "Nom-Ascendant":
        setStoresData(
          [...storesData].sort((a, b) => a.name.localeCompare(b.name))
        );
        break;

      case "Nom-Descendant":
        setStoresData(
          [...storesData].sort((a, b) => b.name.localeCompare(a.name))
        );
        break;
      case "Date de création-Descendant":
        setStoresData(
          [...storesData].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        );
        break;
      case "Date de création-Ascendant":
        setStoresData(
          [...storesData].sort((a, b) => a.createdAt.localeCompare(b.createdAt))
        );
        break;
      case "Nombre de produits-Ascendant":
        setStoresData(
          [...storesData].sort((a, b) =>
            a.products ? a.products.length - b.products?.length : -1
          )
        );
        break;
      case "Nombre de produits-Descendant":
        setStoresData(
          [...storesData].sort(
            (b, a) => a.products?.length - b.products?.length
          )
        );
        break;
      default:
        setStoresData(storesData);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenAdd = () => {
    setOpen(true);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        marginRight: "5%",
        pl: "3%",
      }}
    >
      <Grid container display="flex" direction="row" spacing={{ xs: 2, md: 3 }}>
        <Grid item xs>
          <CustomDeleteIconChips
            filterStoresBy={filterStoresBy}
            resetSortFilter={resetSortFilter}
          ></CustomDeleteIconChips>

          <Button
            sx={{
              backgroundColor: "#1BB18E",
              padding: "12px 24px 12px 20px",
              textTransform: "lowercase",
              borderRadius: 28,
              float: "right",
              "&:hover": {
                background: "#1abd97",
                color: "white",
              },
            }}
            variant="contained"
            onClick={(e) => {
              e.preventDefault();

              handleOpenAdd();
            }}
          >
            <Typography variant="inherit">Ajouter une boutique</Typography>
          </Button>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        display="flex"
        direction="row"
        style={{ marginTop: 1 }}
      >
        {currentPosts?.map((store, index) => (
          <Grid item xs="auto" key={index}>
            <DescriptionCard data={store} getStores={getStores} />
          </Grid>
        ))}
      </Grid>
      <StoreModal
        open={open}
        onClose={handleClose}
        data={"addStore"}
        getStores={getStores}
      ></StoreModal>
      {Math.ceil(storesData?.length / storesPerPage) >= 1 && (
        <Stack spacing={2} sx={{ alignItems: "center", mt: 2, mb: 10 }}>
          <Pagination
            count={Math.ceil(storesData?.length / storesPerPage)}
            page={currentPage}
            onChange={handleChangePage}
            sx={{
              "& .MuiPaginationItem-root": {
                color: "#1BB18E",
              },
            }}
          />
        </Stack>
      )}
    </Box>
  );
}
