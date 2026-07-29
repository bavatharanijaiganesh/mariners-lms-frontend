import api from "./api";

export const registerUser = (data) => {
    return api.post("accounts/register/", data);
};

export const loginUser = (data) => {
    return api.post("accounts/login/", data);
};

export const getProfile = () => {
    return api.get("accounts/profile/");
};