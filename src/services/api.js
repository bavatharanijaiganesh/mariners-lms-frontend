import axios from "axios";

const api = axios.create({
    baseURL: "https://mariners-lms-backend.onrender.com/api/",
});

api.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem("access");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },

    (error) => Promise.reject(error)
);

api.interceptors.response.use(

    (response) => response,

    async (error) => {

        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {

            originalRequest._retry = true;

            try {

                const refresh = localStorage.getItem("refresh");

                const response = await axios.post(
                    "https://mariners-lms-backend.onrender.com/api/token/refresh/",
                    {
                        refresh,
                    }
                );

                localStorage.setItem(
                    "access",
                    response.data.access
                );

                originalRequest.headers.Authorization =
                    `Bearer ${response.data.access}`;

                return api(originalRequest);

            } catch (err) {

                localStorage.clear();

                window.location.href = "/login";

                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default api;