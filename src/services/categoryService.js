import axios from "axios";

const backEndUrl = "http://localhost:3001/categories/";

const getCategories = () => {
  return axios
    .get(backEndUrl)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
};

const getCategoryById = (categoryId) => {
  return axios
    .get(backEndUrl + categoryId)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

/*const getCategoryProductsById = (categoryId) => {
  return axios
    .get(backEndUrl + "categorys/" + categoryId + "/products")
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};*/
const addCategory = (params) => {
  return axios
    .post(backEndUrl, params)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

const updateCategory = (categoryId, params) => {
  return axios
    .put(backEndUrl + categoryId, params)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

const deleteCategory = (categoryId) => {
  return axios
    .delete(backEndUrl + categoryId)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

export const categoryServices = {
  addCategory,
  getCategories,
  getCategoryById,
  // getCategoryCategoriesById,
  updateCategory,
  deleteCategory,
};
