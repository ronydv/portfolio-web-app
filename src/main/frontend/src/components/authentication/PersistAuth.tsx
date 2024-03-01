import { useEffect, useState } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Outlet } from "react-router-dom";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuthContext();

    useEffect(() => {
        //run this function and get a new access token before getting to the RequireAuth component in the routing layout
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            }
            catch (err) {
                console.error(err);
            }
            finally {
                setIsLoading(false);
            }
        };
        //if the user reloads the page or leaves the page and then went back to the page
        //verify refreshToken only if the auth doesn't have an access token
        //!auth?.token?.accessToken ? verifyRefreshToken() : setIsLoading(false);
        if(!auth?.token?.accessToken){
            verifyRefreshToken();
            console.log("token is undefined, verifying refresh token");
        } else{
            setIsLoading(false)
            console.log("access token exists! no need to reach refresh-token endpoint");
        }
    }, []);

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`);
        console.log(`aT: ${JSON.stringify(auth?.token?.accessToken)}`);
    }, [isLoading]);

    return (
        <>
            {isLoading
                ? <p>Loading...</p>
                : <Outlet />/* render all routes*/
            }
        </>
    );
};

export default PersistLogin;