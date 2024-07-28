import instance from "../config/instance";
import Cookies from "js-cookie";
const token = Cookies.get("AccessToken");
const headers = {
    "Content-Type": "application/json",
    accept: "*/*",
    Authorization: `Bearer ${token}`,
};
const getListVouchers = (listParam) => {
    return instance.get(`/Vouchers`, { headers, params: listParam });
};
const getVouchersDetaiil = ({ Vouchersid }) => {
    return instance.get(`/Vouchers/${Vouchersid}`, { headers });
};

const createVouchers = ({ formData }) => {
    return instance.post(`/Vouchers`, formData, { headers });
};
const updateVouchers = ({ formData }) => {
    return instance.put(`/Vouchers`, formData, { headers });
};
const deleteVouchers = ({ Vouchersid }) => {
    return instance.delete(`/Vouchers/${Vouchersid}`, { headers });
};
export {
    getListVouchers,
    getVouchersDetaiil,
    createVouchers,
    updateVouchers,
    deleteVouchers,
};
