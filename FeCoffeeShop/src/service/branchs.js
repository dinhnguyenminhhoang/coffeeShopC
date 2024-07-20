import instance from "../config/instance";
import Cookies from "js-cookie";
const token = Cookies.get("AccessToken");
const headers = {
    "Content-Type": "application/json",
    accept: "*/*",
    Authorization: `Bearer ${token}`,
};
const getAllBranches = ({ listParam }) => {
    return instance.get(`/Branches`, { headers, params: listParam });
};
const getBranchesDetaiil = ({ branchesid }) => {
    return instance.get(`/Branches/${branchesid}`, { headers });
};

const createBranches = ({ formData }) => {
    return instance.post(`/Branches`, formData, { headers });
};
const updateBranches = ({ formData }) => {
    return instance.put(`/Branches`, formData, { headers });
};
const deleteBranches = ({ branchesid }) => {
    return instance.delete(`/Branches/${branchesid}`, { headers });
};
export {
    getAllBranches,
    getBranchesDetaiil,
    createBranches,
    updateBranches,
    deleteBranches,
};
