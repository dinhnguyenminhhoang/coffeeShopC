import instance from "../config/instance";
import Cookies from "js-cookie";
const token = Cookies.get("AccessToken");
const headers = {
    "Content-Type": "application/json",
    accept: "*/*",
    Authorization: `Bearer ${token}`,
};
const customerCreateRating = ({ formData }) => {
    return instance.post(`/Rating`, formData, { headers });
};
const getListRatingDrink = ({ listParam, drinkId }) => {
    return instance.get(`/Rating/List/${drinkId}`, {
        headers: headers,
        params: listParam,
    });
};
export { customerCreateRating, getListRatingDrink };
