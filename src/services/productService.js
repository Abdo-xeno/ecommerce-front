import axios from "axios";

const backEndUrl = "http://localhost:3001/products/";

const getProducts = () => {
  return axios
    .get(backEndUrl)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
};

const getProductById = (productId) => {
  return axios
    .get(backEndUrl + productId)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

/*const getProductProductsById = (productId) => {
  return axios
    .get(backEndUrl + "products/" + productId + "/products")
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};*/
const addProduct = (params) => {
  return axios
    .post(backEndUrl, params)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

const updateProduct = (productId, params) => {
  return axios
    .put(backEndUrl + productId, params)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

const deleteProduct = (productId) => {
  return axios
    .delete(backEndUrl + productId)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

export const productServices = {
  addProduct,
  getProducts,
  getProductById,
  // getProductCategoriesById,
  updateProduct,
  deleteProduct,
};
