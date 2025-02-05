import axios from "axios";
import { BASE_URL } from "./config";
import { AuthService } from "./AuthService";
import { getAuthTokens } from "@utils/storage";
import { Alert } from "react-native";

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});

api.interceptors.request.use(
    async (config) => {
        const { accessToken } = await getAuthTokens();
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const newToken = await AuthService.refreshTokens();
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                // Handle refresh token error (e.g., logout user)
                throw refreshError;
            }
        }

        if (error.response && error.response.status != 401) {
            const errorMessage = error.response.data.message || 'something went wrong'
            Alert.alert(errorMessage)
        }
        return Promise.reject(error);
    }
);

export default api;