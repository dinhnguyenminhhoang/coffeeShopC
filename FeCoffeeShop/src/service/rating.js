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
const getListRatting = (params) => {
    return instance.get(`/Rating/List`, { params, headers });
};

const getDetailRating = (id) => {
    return instance.get(`/Rating/Detail/${id}`, { headers });
};
const feedBackForRatng = (formData) => {
    return instance.put("/Rating/Feedback", formData, { headers });
};
export {
    customerCreateRating,
    getListRatingDrink,
    getListRatting,
    feedBackForRatng,
    getDetailRating,
};
