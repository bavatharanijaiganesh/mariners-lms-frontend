// import api from "./api";

// export const registerUser = (data) => {
//     return api.post("accounts/register/", data);
// };

// export const loginUser = (data) => {
//     return api.post("accounts/login/", data);
// };

// export const getProfile = () => {
//     return api.get("accounts/profile/");
// };

import axios from "axios";
import api from "./api";

const BASE_URL = "http://127.0.0.1:8000/api/";

export const registerUser = (data) => {
    return api.post("accounts/register/", data);
};

export const loginUser = (data) => {
    return axios.post(BASE_URL + "accounts/login/", data);
};

export const getProfile = () => {
    return api.get("accounts/profile/");
};