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
export { getInitials, isValidImageUrl };
