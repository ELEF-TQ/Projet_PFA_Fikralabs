import { axiosAuth } from "@/lib/Constants";

interface UserData {_id: string;role: string}

async function getCurrentUser(role: string, id: string): Promise<UserData | null> {
    try {
        let endpoint = '';
        if (role === "CLIENT") {
            endpoint = `/users/${id}`;
        } else if (role === "ADMIN") {
            endpoint = `/admins/${id}`;
        } else {
            throw new Error("Invalid role specified.");
        }

        const response = await axiosAuth.get(endpoint);
        const userData: UserData = response.data.user;
        return userData;
    } catch (error) {
        console.error("Error fetching current user:", error);
        return null;
    }
}

export default getCurrentUser;
