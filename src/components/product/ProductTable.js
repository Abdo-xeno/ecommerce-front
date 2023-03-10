import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import TableHead from "@mui/material/TableHead";
import { useTheme } from "@mui/material/styles";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit3 } from "react-icons/fi";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { CgChevronDoubleLeft } from "react-icons/cg";
import { CgChevronDoubleRight } from "react-icons/cg";
import { Chip } from "@mui/material";
import StoreModal from "./StoreProductsModal";
import { productServices } from "../../services/productService";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }} style={{ color: "00008C" }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? (
          <CgChevronDoubleRight />
        ) : (
          <CgChevronDoubleLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <MdOutlineKeyboardArrowRight />
        ) : (
          <MdOutlineKeyboardArrowLeft />
        )}
      </IconButton>
      Page {page + 1} sur {Math.ceil(count / rowsPerPage)}
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <MdOutlineKeyboardArrowLeft />
        ) : (
          <MdOutlineKeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? (
          <CgChevronDoubleLeft />
        ) : (
          <CgChevronDoubleRight />
        )}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function ProductTable({
  rows,
  storeProducts,
  getStoreProductsCategories,
  translateToEng,
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(false);
  const [modalData, setModalData] = React.useState({ data: null });
  const [productsData, setProductsData] = React.useState(rows);
  React.useEffect(() => {
    !storeProducts
      ? productServices.getProducts().then((res) => {
          setProductsData([...res]);
        })
      : setProductsData(rows);
  }, [rows, open, storeProducts]);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenEdit = (row) => {
    setOpen(true);
    setModalData({ action: "editProduct", rowData: row });
  };

  const handleOpenDelete = (row) => {
    setOpen(true);
    setModalData({ action: "deleteProduct", rowData: row });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper} sx={{ mb: "5%" }}>
      <Table aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            {translateToEng ? (
              <>
                <TableCell style={{ color: "#666D92" }}>Name</TableCell>
                <TableCell style={{ color: "#666D92" }}>Price</TableCell>
                <TableCell style={{ color: "#666D92" }}>Description</TableCell>
                <TableCell style={{ color: "#666D92" }}>Categories</TableCell>
              </>
            ) : (
              <>
                <TableCell style={{ color: "#666D92" }}>Nom</TableCell>
                <TableCell style={{ color: "#666D92" }}>Prix</TableCell>
                <TableCell style={{ color: "#666D92" }}>Description</TableCell>
                <TableCell style={{ color: "#666D92" }}>Cat??gories</TableCell>
              </>
            )}

            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? productsData?.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : productsData
          ).map((row, index) => (
            <TableRow key={index}>
              {translateToEng ? (
                <TableCell
                  style={{ width: 160, color: "#666D92" }}
                  component="th"
                  scope="row"
                >
                  {row.engName}
                </TableCell>
              ) : (
                <TableCell
                  style={{ width: 160, color: "#666D92" }}
                  component="th"
                  scope="row"
                >
                  {row.name}
                </TableCell>
              )}

              <TableCell style={{ width: 160, color: "#666D92" }}>
                {row.price ? row.price : null}
              </TableCell>
              {translateToEng ? (
                <TableCell style={{ width: 160, color: "#666D92" }}>
                  {row.engDescription}
                </TableCell>
              ) : (
                <TableCell style={{ width: 160, color: "#666D92" }}>
                  {row.description}
                </TableCell>
              )}

              <TableCell style={{ width: 160, color: "#666D92" }}>
                {row.Categories?.map((categorie, index) => (
                  <Chip
                    key={categorie.id}
                    label={categorie.name}
                    sx={{
                      background: "#1BB18E",
                      color: "white",
                      m: "1%",
                    }}
                  />
                ))}
              </TableCell>
              <TableCell style={{ width: 20 }} align="right">
                <IconButton
                  style={{ color: "#1BB18E" }}
                  onClick={() => handleOpenEdit(row)}
                >
                  {" "}
                  <FiEdit3 />
                </IconButton>
              </TableCell>
              <TableCell style={{ width: "5%" }}>
                <IconButton
                  style={{ color: "#1BB18E" }}
                  onClick={() => handleOpenDelete(row)}
                >
                  <RiDeleteBinLine />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              count={productsData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
              labelRowsPerPage="??l??ments par page :"
              labelDisplayedRows={(from, to, count, page) =>
                `??l??ments ${from.from}  ??  ${from.to} sur  ${from.count}`
              }
              sx={{ color: "#666D92" }}
            />
          </TableRow>
        </TableFooter>
      </Table>
      <StoreModal
        open={open}
        onClose={handleClose}
        data={modalData}
        storeProducts={storeProducts}
        getStoreProductsCategories={getStoreProductsCategories}
      ></StoreModal>
    </TableContainer>
  );
}
