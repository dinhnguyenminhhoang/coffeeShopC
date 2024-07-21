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
export {
    getInitials,
    isValidImageUrl,
    formatVND,
    firebaseConfig,
    firebaseUrl,
    stripeKey,
};
