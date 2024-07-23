import instance from "../config/instance";
import Cookies from "js-cookie";
const token = Cookies.get("AccessToken");
const headers = {
    "Content-Type": "application/json",
    accept: "*/*",
    Authorization: `Bearer ${token}`,
};
const getAllCustomers = ({ listParam }) => {
    return instance.get(`/Customers`, { headers, params: listParam });
};
const getCustomersDetaiil = ({ customerId }) => {
    return instance.get(`/Customers/${customerId}`, { headers });
};

const createCustomers = ({ formData }) => {
    return instance.post(`/Customers`, formData, { headers });
};
const updateCustomers = ({ formData }) => {
    return instance.put(`/Customers`, formData, { headers });
};
const updateAccountCustomers = ({ formData }) => {
    return instance.put(`/Customers/UpdateAccount`, formData, { headers });
};
const deleteCustomers = ({ customerId }) => {
    return instance.delete(`/Customers/${customerId}`, { headers });
};
const resetPassword = ({ Password, slug }) => {
    return instance.post(
        `/Api/Auth/Customer/ResetPassword`,
        { Password },
        {
            headers: {
                "Content-Type": "application/json",
                accept: "*/*",
                Authorization: `Bearer ${slug}`,
            },
        }
    );
};
const forgotPassword = ({ Email }) => {
    return instance.post(`/Api/Auth/Customer/ForgotPassword`, { Email });
};
export {
    getAllCustomers,
    createCustomers,
    getCustomersDetaiil,
    updateCustomers,
    deleteCustomers,
    updateAccountCustomers,
    resetPassword,
    forgotPassword,
};
