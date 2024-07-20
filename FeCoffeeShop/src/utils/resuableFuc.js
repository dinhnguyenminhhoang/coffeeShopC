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

export { getInitials, isValidImageUrl, formatVND };
