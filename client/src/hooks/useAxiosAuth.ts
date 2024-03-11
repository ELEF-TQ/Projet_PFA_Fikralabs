import { useEffect } from "react";
import { axiosAuth, axiosAuthMultipart } from "../lib/AxiosBase";
import { retrieveToken } from "../lib/Encryption";

export const useAxiosAuth = () => {
    useEffect(() => {
        const token = retrieveToken();
        if (token) {
            const requestInterceptor = axiosAuth.interceptors.request.use((config) => {
                if (!config.headers["Authorization"]) {
                    config.headers["Authorization"] = `Bearer ${token}`;
                }
                return config;
            });
            return () => {
                axiosAuth.interceptors.request.eject(requestInterceptor);
            };
        }
    }, []); 

    return axiosAuth;
};

export const useAxiosAuthMultipart = () => {
    useEffect(() => {
        const token = retrieveToken();
        if (token) {
            const requestInterceptor = axiosAuthMultipart.interceptors.request.use((config) => {
                if (!config.headers["Authorization"]) {
                    config.headers["Authorization"] = `Bearer ${token}`;
                }
                return config;
            });
            return () => {
                axiosAuthMultipart.interceptors.request.eject(requestInterceptor);
            };
        }
    }, []); 

    return axiosAuthMultipart;
};
