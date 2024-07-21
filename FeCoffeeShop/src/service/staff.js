import instance from "../config/instance";
import Cookies from "js-cookie";
const token = Cookies.get("AccessToken");
const headers = {
    "Content-Type": "application/json",
    accept: "*/*",
    Authorization: `Bearer ${token}`,
};
const getAllStaff = ({ listParam }) => {
    return instance.get(`/Staffs`, { headers, params: listParam });
};
const getStaffDetaiil = ({ staffid }) => {
    return instance.get(`/Staffs/${staffid}`, { headers });
};

const createStaff = ({ formData }) => {
    return instance.post(`/Staffs`, formData, { headers });
};
const updateStaff = ({ formData }) => {
    return instance.put(`/Staffs`, formData, { headers });
};
const updateStaffAccount = ({ formData }) => {
    return instance.put(`/Staffs/UpdateAccount`, formData, { headers });
};
const deleteStaff = ({ staffId }) => {
    return instance.delete(`/Staffs/${staffId}`, { headers });
};
export {
    getAllStaff,
    getStaffDetaiil,
    createStaff,
    updateStaff,
    deleteStaff,
    updateStaffAccount,
};
