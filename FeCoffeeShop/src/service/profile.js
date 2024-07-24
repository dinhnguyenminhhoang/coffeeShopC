import instance from "../config/instance";
import Cookies from "js-cookie";
const token = Cookies.get("AccessToken");
const headers = {
    "Content-Type": "application/json",
    accept: "*/*",
    Authorization: `Bearer ${token}`,
};
const getCustomerProfile = () => {
    return instance.get(`/Customers/Profile`, { headers });
};
const customerChangePassword = ({ formData }) => {
    return instance.put(`/Customers/Profile/ChangePassword`, formData, {
        headers,
    });
};
const customerUpdateInfo = ({ formData }) => {
    return instance.put(`/Customers/Profile`, formData, {
        headers,
    });
};
export { getCustomerProfile, customerChangePassword, customerUpdateInfo };
