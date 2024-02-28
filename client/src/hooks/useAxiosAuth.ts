import { useEffect } from "react";
import {axiosAuth } from "../lib/Constants";
import { retrieveUserSession } from "../lib/Encryption";

const useAxiosAuth = () => {
    useEffect(() => {
        const userData = retrieveUserSession();
        if (userData && userData.JWT ) {
            const requestInterceptor = axiosAuth.interceptors.request.use((config) => {
                if (!config.headers["Authorization"]) {
                    config.headers["Authorization"] = `Bearer ${userData.JWT}`;
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

export default useAxiosAuth;
