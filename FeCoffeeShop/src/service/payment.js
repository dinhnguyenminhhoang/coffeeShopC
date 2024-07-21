import instance from "../config/instance";
import Cookies from "js-cookie";
const token = Cookies.get("AccessToken");
const headers = {
    "Content-Type": "application/json",
    accept: "*/*",
    Authorization: `Bearer ${token}`,
};
const paymentsTripe = ({ formData }) => {
    return instance.post(`/payment/stripe`, formData);
};
export { paymentsTripe };
