import axios from "axios";
import { useAuthContext } from "./useAuthContext";

const useRefreshToken = () => {
    let { setAuth }: UserContext = useAuthContext();

    //this will return a user and a token, when use this method, make sure whether you need the token or user with token
    const refresh = async (): Promise<LoginResponse> => {
        const response = await axios.post<LoginResponse>('/api/v1/auth/refresh-token',{
            headers: {// sends the authenticated user's refresh token with a cookie to be verified in the server
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            withCredentials:true//sends the cookies to the endpoint
        });
        setAuth(response.data);
        //console.log("new token: ",response.data.token?.accessToken);
        return response?.data;
    };
    return refresh;
};

export default useRefreshToken;

