import { useEffect, useState } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Outlet } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import axios from "axios";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const logout = useLogout();
    const { auth:{token}, persist } = useAuthContext();

    useEffect(() => {
        let isMounted=true;
        //run this function and get a new access token before getting to the RequireAuth component in the routing layout
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            }catch (error:unknown) {
                axios.isAxiosError(error) && console.log("token not updated");
            }finally {
                isMounted && setIsLoading(false);
            }
        };
        /*
        if the user reloads or leaves the page and then the user went back to the page,
        verify refreshToken only if the auth doesn't have an access token
        */
        if(!token?.accessToken && persist===true )
            verifyRefreshToken();
        else {
            setIsLoading(false);
            logout();
        }
        return () => { isMounted = false };
    }, []);

    return (
        <>
            {!persist
                ? <Outlet />/* render all routes */
                : isLoading
                    ? <p>Loading...</p>
                    : <Outlet />
            }
        </>
    );
};

export default PersistLogin;