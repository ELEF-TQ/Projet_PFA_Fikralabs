import { axiosAuth } from "@/lib/Constants";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const useAxiosAuth = () => {
    const { data: session } = useSession();

   

    return axiosAuth;
};

export default useAxiosAuth;
