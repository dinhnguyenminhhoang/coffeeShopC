import instance from "../config/instance";
import Cookies from "js-cookie";
const token = Cookies.get("AccessToken");
const headers = {
    "Content-Type": "application/json",
    accept: "*/*",
    Authorization: `Bearer ${token}`,
};
const getSummaryParameters = () => {
    return instance.get(`/Summary/Parameters`, { headers });
};
const getSummaryOverView = (params) => {
    return instance.get(`/Summary/Chart/Overview`, { headers, params: params });
};
const getSummaryOrder = (params) => {
    return instance.get(`/Summary/Chart/Orders`, { headers, params: params });
};
const getSummaryRevenueAndProfit = (params) => {
    return instance.get(`/Summary/Chart/RevenueAndProfit`, {
        headers,
        params: params,
    });
};
export {
    getSummaryParameters,
    getSummaryOverView,
    getSummaryRevenueAndProfit,
    getSummaryOrder,
};
