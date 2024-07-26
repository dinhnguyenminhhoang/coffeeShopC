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
export { customerCreateRating };
