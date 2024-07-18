import axios from "axios";

const instance = axios.create({
    baseURL: "https://localhost:7214",
});

export default instance;
