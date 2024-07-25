import instance from "../config/instance";
import Cookies from "js-cookie";
const token = Cookies.get("AccessToken");
const headers = {
    "Content-Type": "application/json",
    accept: "*/*",
    Authorization: `Bearer ${token}`,
};
const CustomerCreateOrder = ({ formData }) => {
    return instance.post(`/Orders/Cusotmer/Order`, formData, { headers });
};
export { CustomerCreateOrder };
