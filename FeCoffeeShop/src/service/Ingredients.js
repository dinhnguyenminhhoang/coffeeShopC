import instance from "../config/instance";
import Cookies from "js-cookie";
const token = Cookies.get("AccessToken");
const headers = {
    "Content-Type": "application/json",
    accept: "*/*",
    Authorization: `Bearer ${token}`,
};
const getAllIngredients = ({ listParam }) => {
    return instance.get(`/Ingredients`, {
        headers: headers,
        params: listParam,
    });
};
const createIngredient = ({ formData }) => {
    return instance.post(`/Ingredients`, formData, {
        headers: headers,
    });
};
const createIngredientStock = ({ formData }) => {
    return instance.post(`/Ingredients/Stock`, formData, {
        headers: headers,
    });
};

const updateIngredient = ({ formData }) => {
    return instance.put(`/Ingredients`, formData, {
        headers: headers,
    });
};
const getIngredientById = ({ id }) => {
    return instance.get(`/Ingredients/${id}`, {
        headers: headers,
    });
};
const deleteIngredientById = ({ id }) => {
    return instance.delete(`/Ingredients/${id}`, {
        headers: headers,
    });
};
export {
    getAllIngredients,
    createIngredient,
    createIngredientStock,
    updateIngredient,
    getIngredientById,
    deleteIngredientById,
};
