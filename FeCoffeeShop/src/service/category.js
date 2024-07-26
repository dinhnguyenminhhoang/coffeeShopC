import instance from "../config/instance";
import Cookies from "js-cookie";
const token = Cookies.get("AccessToken");
const headers = {
    "Content-Type": "application/json",
    accept: "*/*",
    Authorization: `Bearer ${token}`,
};
const getAllCategories = ({ listParam }) => {
    return instance.get(`/Category`, { headers, params: listParam });
};
const getCategoriesDetaiil = ({ CategoryId }) => {
    return instance.get(`/Category/${CategoryId}`, { headers });
};

const createCategory = ({ formData }) => {
    return instance.post(`/Category`, formData, { headers });
};
const updateCategory = ({ formData }) => {
    return instance.put(`/Category`, formData, { headers });
};
const deleteCategory = ({ CategoryId }) => {
    return instance.delete(`/Category/${CategoryId}`, { headers });
};
export {
    getAllCategories,
    getCategoriesDetaiil,
    createCategory,
    updateCategory,
    deleteCategory,
};
