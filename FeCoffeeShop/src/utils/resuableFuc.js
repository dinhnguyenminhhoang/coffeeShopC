const getInitials = (name) => {
    if (!name) return "";
    const initials = name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase();
    return initials.slice(0, 2);
};
const isValidImageUrl = (url) => {
    return url && /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
};
const formatVND = (price) => {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(price);
};
const firebaseConfig = {
    apiKey: "AIzaSyBZxWzCc1TcdZLDt3LUjtfMsG3HgdzdCkI",
    authDomain: "newconnect-7020a.firebaseapp.com",
    projectId: "newconnect-7020a",
    storageBucket: "newconnect-7020a.appspot.com",
    messagingSenderId: "118358026020",
    appId: "1:118358026020:web:5c0fac025198de962ff5b1",
    measurementId: "G-P10TMVLR0Q",
};

const firebaseUrl = "newconnect-7020a.appspot.com";
const stripeKey =
    "pk_test_51O2Re5Ch5jfUlQ3sapQzL592oYJdmXdGmYKaQIHXU20LmTrYYVxHNRrrTNbZSrp0R2to70M4F1P4vYpU5aQEVyK1004RjU0FtI";

const ORDERSTATUS = {
    ODR_INIT: {
        key: "ODR_INIT",
        title: "Đã Tạo đơn",
        color: "#1890ff", // Xanh dương
    },
    ODR_SHIPED: {
        key: "ODR_SHIPED",
        title: "Đã Giao Hàng",
        color: "#faad14", // Cam
    },
    ODR_COML: {
        key: "ODR_COML",
        title: "Đã Hoàn Thành",
        color: "#52c41a", // Xanh lá
    },
    ODR_CANL: {
        key: "ODR_CANL",
        title: "Đã Hủy",
        color: "#f5222d", // Đỏ
    },
    ODR_FAIL: {
        key: "ODR_FAIL",
        title: "Thất Bại",
        color: "#d9d9d9", // Xám
    },
    ODR_SERV: {
        key: "ODR_SERV",
        title: "Đã Phục Vụ",
        color: "#13c2c2", // Xanh cyan
    },
    ODR_COMF: {
        key: "ODR_COMF",
        title: "Đã Xác Nhận",
        color: "#2f54eb", // Xanh dương đậm
    },
    ODR_SHIP: {
        key: "ODR_SHIP",
        title: "Đang Giao Hàng",
        color: "#faad14", // Cam
    },
};
const ORDERSTATUSARRAY = [
    {
        key: "ODR_INIT",
        title: "Đã Tạo đơn",
        color: "#1890ff", // Xanh dương
    },
    {
        key: "ODR_COMF",
        title: "Đã Xác Nhận",
        color: "#2f54eb",
    },
    {
        key: "ODR_SHIP",
        title: "Đang Giao Hàng",
        color: "#faad14",
    },
    {
        key: "ODR_SHIPED",
        title: "Đã Giao Hàng",
        color: "#faad14", // Cam
    },
    {
        key: "ODR_COML",
        title: "Đã Hoàn Thành",
        color: "#52c41a",
    },

    {
        key: "ODR_SERV",
        title: "Đã Phục Vụ",
        color: "#13c2c2",
    },
    {
        key: "ODR_CANL",
        title: "Đã Hủy",
        color: "#f5222d",
    },
    {
        key: "ODR_FAIL",
        title: "Thất Bại",
        color: "#d9d9d9",
    },
];
const ORDERSTAFFSTATUSARRAY = [
    {
        key: "ODR_COMF",
        title: "Đã Xác Nhận",
        color: "#2f54eb", // Xanh dương đậm
    },
    {
        key: "ODR_SHIP",
        title: "Đang Giao Hàng",
        color: "#faad14", // Cam
    },
    {
        key: "ODR_SHIPED",
        title: "Đã Giao Hàng",
        color: "#faad14", // Cam
    },
    {
        key: "ODR_COML",
        title: "Đã Hoàn Thành",
        color: "#52c41a", // Xanh lá
    },
    {
        key: "ODR_SERV",
        title: "Đã Phục Vụ",
        color: "#13c2c2", // Xanh cyan
    },
];
const ORDERSTATUSCUSTOMERARRAY = [
    {
        key: "ODR_ORDERED",
        title: "Đã Tạo đơn",
        color: "#1890ff", // Xanh dương
    },
    {
        key: "ODR_SHIP",
        title: "Giao Hàng",
        color: "#faad14", // Cam
    },
    {
        key: "ODR_COML",
        title: "Đã Hoàn Thành",
        color: "#52c41a", // Xanh lá
    },
    {
        key: "ODR_CANL",
        title: "Đã Hủy",
        color: "#f5222d", // Đỏ
    },
    {
        key: "ODR_FAIL",
        title: "Thất Bại",
        color: "#d9d9d9", // Xám
    },
];
export {
    getInitials,
    isValidImageUrl,
    formatVND,
    firebaseConfig,
    firebaseUrl,
    stripeKey,
    ORDERSTATUS,
    ORDERSTATUSARRAY,
    ORDERSTATUSCUSTOMERARRAY,
    ORDERSTAFFSTATUSARRAY,
};
