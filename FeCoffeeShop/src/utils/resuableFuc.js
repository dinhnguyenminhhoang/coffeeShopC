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
    apiKey: "AIzaSyBM2yqGG7Ky7KfLeHg6G7-21jfH6smHuzI",
    authDomain: "coffee-8ec85.firebaseapp.com",
    projectId: "coffee-8ec85",
    storageBucket: "coffee-8ec85.appspot.com",
    messagingSenderId: "772302752788",
    appId: "1:772302752788:web:f2f60ae48a908047e5eb01",
    measurementId: "G-K5ZNM7M5DS",
};

const firebaseUrl = "gs://coffee-8ec85.appspot.com";
const stripeKey =
    "pk_test_51O2Re5Ch5jfUlQ3sapQzL592oYJdmXdGmYKaQIHXU20LmTrYYVxHNRrrTNbZSrp0R2to70M4F1P4vYpU5aQEVyK1004RjU0FtI";

const ORDERSTATUS = {
    ODR_INIT: {
        key: "ODR_INIT",
        title: "Đã Tạo đơn",
        color: "#1890ff", // Xanh dương
    },
    ODR_SHIP: {
        key: "ODR_SHIP",
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
};
const ORDERSTATUSARRAY = [
    {
        key: "ODR_INIT",
        title: "Đã Tạo đơn",
        color: "#1890ff", // Xanh dương
    },
    {
        key: "ODR_SHIP",
        title: "Đã Giao Hàng",
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
    {
        key: "ODR_SERV",
        title: "Đã Phục Vụ",
        color: "#13c2c2", // Xanh cyan
    },
    {
        key: "ODR_COMF",
        title: "Đã Xác Nhận",
        color: "#2f54eb", // Xanh dương đậm
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
        title: "Đã Giao Hàng",
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
};
