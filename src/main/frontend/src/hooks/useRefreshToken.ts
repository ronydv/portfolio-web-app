import axios from "axios";
import { useAuthContext } from "./useAuthContext";

const useRefreshToken = () => {
    let { auth:user, setAuth }: UserContext = useAuthContext();

    const refresh = async (): Promise<Token> => {
        const response = await axios.post<Token>('/api/v1/auth/refresh-token',
            user.token, {// sends the authenticated user's refresh token to be verified in the server
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        });
        //only the access token will be modified, but the response contains accessToken and refreshToken
        setAuth({
            ...user,
            token: response.data
        });
        //console.log("new token: ",response.data.accessToken);
        return response.data;
    };
    return refresh;
};

export default useRefreshToken;