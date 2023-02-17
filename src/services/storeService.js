import axios from "axios";

const backEndUrl = "http://localhost:3001/stores/";

const getStores = () => {
  return axios
    .get(backEndUrl)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
};

const getStoreById = (storeId) => {
  return axios
    .get(backEndUrl + storeId)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};
const getStoreCategoriesById = (storeId) => {
  return axios
    .get(backEndUrl  + storeId + "/products/categories")
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};
const getStoreProductsById = (storeId) => {
  return axios
    .get(backEndUrl  + storeId + "/products")
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};
const addStore = (params) => {
  return axios
    .post(backEndUrl , 
      params,
    )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

const updateStore = (storeId, params) => {
  return axios
    .put(backEndUrl  + storeId, params)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

const deleteStore = (storeId) => {
  return axios
    .delete(backEndUrl  + storeId)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

export const storeServices = {
  addStore,
  getStores,
  getStoreById,
  getStoreProductsById,
  getStoreCategoriesById,
  updateStore,
  deleteStore,
};
