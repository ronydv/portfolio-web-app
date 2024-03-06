import axios from "axios";
import { useAuthContext } from "./useAuthContext";

const useLogout = () => {
    const { setAuth } = useAuthContext();

    const logout = async () => {
        setAuth({});//empty the auth state when using this hook
        try {
            const response = await axios('/api/v1/auth/logout', {
                withCredentials: true
            });
            console.log("logout status: ",response.data);
        } catch (error) {
            if(axios.isAxiosError(error)){
                console.error(error.response?.data.message);
            }
        }
    }
    return logout;
}
export default useLogout;