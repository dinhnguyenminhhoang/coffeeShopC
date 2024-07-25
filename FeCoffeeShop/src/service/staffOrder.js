import instance from "../config/instance";
import Cookies from "js-cookie";
const token = Cookies.get("AccessToken");
const headers = {
    "Content-Type": "application/json",
    accept: "*/*",
    Authorization: `Bearer ${token}`,
};
const staffGetListOrder = ({ listParam }) => {
    return instance.get(`Orders/List`, {
        headers,
        params: listParam,
    });
};
const staffGetListStaffOrder = ({ listParam }) => {
    return instance.get(`Orders/Staff/List`, {
        headers,
        params: listParam,
    });
};
const staffGetOrderById = ({ orderId }) => {
    return instance.get(`/Orders/Staff/Detail/${orderId}`, {
        headers,
    });
};
const staffFailedOrder = ({ formData }) => {
    return instance.post(`/Orders/Staff/Failed`, formData, {
        headers,
    });
};
const staffCompleteOrder = ({ orderId }) => {
    return instance.post(
        `/Orders/Staff/Completed/${orderId}`,
        {},
        {
            headers,
        }
    );
};
const staffShippingOrder = ({ orderId }) => {
    return instance.post(
        `/Orders/Staff/Shipping/${orderId}`,
        {},
        {
            headers,
        }
    );
};
const staffServedOrder = ({ orderId }) => {
    return instance.post(
        `/Orders/Staff/Served/${orderId}`,
        {},
        {
            headers,
        }
    );
};
const staffComfirmOrder = ({ orderId }) => {
    return instance.post(
        `/Orders/Staff/Comfirm/${orderId}`,
        {},
        {
            headers,
        }
    );
};
const staffShippedOrder = ({ orderId }) => {
    return instance.post(
        `/Orders/Staff/Shipped/${orderId}`,
        {},
        {
            headers,
        }
    );
};
const staffDeleteOrder = ({ formData }) => {
    return instance.delete(`/Orders/Staff/Cancel`, {
        headers,
        data: formData,
    });
};
export {
    staffGetListOrder,
    staffGetOrderById,
    staffDeleteOrder,
    staffComfirmOrder,
    staffShippedOrder,
    staffShippingOrder,
    staffServedOrder,
    staffCompleteOrder,
    staffGetListStaffOrder,
    staffFailedOrder,
};
