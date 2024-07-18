import instance from "../config/instance";
const customerRegister = ({ formData }) => {
    return instance.post("/Auth/Customer/Register", { formData });
};
const customerLogin = ({ formData }) => {
    return instance.post("/Auth/Customer/Login", formData);
};
const StaffLogin = ({ formData }) => {
    return instance.post("/Auth/Staff/Login", formData);
};
export { customerRegister, StaffLogin, customerLogin };
