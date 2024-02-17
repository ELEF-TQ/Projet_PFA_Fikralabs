import { axiosAuth } from "@/lib/Constants";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const useAxiosAuth = () => {
    const { data: session } = useSession();

    useEffect(() => {
        const requestInterceptor = axiosAuth.interceptors.request.use((config) => {
            if (!config.headers["Authorization"] && session?.backendTokens.accessToken) {
                config.headers["Authorization"] = `Bearer ${session.backendTokens.accessToken}`;
            }
            return config;
        });
        return () => {
            axiosAuth.interceptors.request.eject(requestInterceptor);
        };
    }, [session]); 

    return axiosAuth;
};

export default useAxiosAuth;
