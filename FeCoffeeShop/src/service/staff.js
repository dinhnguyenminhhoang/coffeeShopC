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
const getStaffDetaiil = ({ Staffid }) => {
    return instance.get(`/Staffs/${Staffid}`, { headers });
};

const createStaff = ({ formData }) => {
    return instance.post(`/Staffs`, formData, { headers });
};
const updateStaff = ({ formData }) => {
    return instance.put(`/Staffs`, formData, { headers });
};
export { getAllStaff, getStaffDetaiil, createStaff, updateStaff };
