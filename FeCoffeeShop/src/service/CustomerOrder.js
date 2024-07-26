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
const CusotmerGetListOrder = ({ listParam }) => {
    return instance.get(`/Orders/Cusotmer/History`, {
        headers,
        params: listParam,
    });
};
const CusotmerGetOrderDetail = ({ orderId }) => {
    return instance.get(`/Orders/Cusotmer/Detail/${orderId}`, { headers });
};
const CustomerCancelOrder = ({ formData }) => {
    return instance.delete(`/Orders/Cusotmer/Cancel`, {
        headers,
        data: formData,
    });
};
const getCustomerOrderDetail = ({ listParam, orderId }) => {
    return instance.get(`/Orders/Cusotmer/Detail/${orderId}`, { headers });
};
export {
    CustomerCreateOrder,
    CusotmerGetListOrder,
    CusotmerGetOrderDetail,
    CustomerCancelOrder,
    getCustomerOrderDetail,
};
