import instance from "../config/instance";
import Cookies from "js-cookie";
const token = Cookies.get("AccessToken");
const headers = {
    "Content-Type": "application/json",
    accept: "*/*",
    Authorization: `Bearer ${token}`,
};
const getDrink = ({ listParam }) => {
    return instance.get(`/Drinks`, { params: listParam });
};
const createDrink = ({ formData }) => {
    return instance.post("/Drinks", formData, { headers });
};
const updateDrink = ({ formData }) => {
    return instance.put("/Drinks", formData, { headers });
};
const getDrinkById = ({ drinkId }) => {
    return instance.get(`/Drinks/${drinkId}`);
};
const DeleteDrinkSize = ({ drinkSizeId }) => {
    return instance.delete(`/Drinks/Size/${drinkSizeId}`, { headers });
};
const createDrinkSize = ({ formData }) => {
    return instance.post("/Drinks/Size", formData, { headers });
};
const updateDrinkSize = ({ formData }) => {
    return instance.put(`/Drinks/Size`, formData, { headers });
};
export {
    getDrink,
    createDrink,
    updateDrink,
    getDrinkById,
    DeleteDrinkSize,
    createDrinkSize,
    updateDrinkSize,
};
