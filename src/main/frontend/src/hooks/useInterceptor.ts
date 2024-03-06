import axios from "axios";
import { useAuthContext } from "./useAuthContext";
import useRefreshToken from "./useRefreshToken";
import { useEffect } from "react";

//use this constanst to reach protected endpoints
const axiosPrivate = axios.create({
	//baseURL: 'http://localhost:8080',//no need since we are using a proxy in package.json for the spring boot base url
	headers: { 
		"Content-Type": "application/json",
	 },
});

const useInterceptor = () => {
	const { auth:{token}, setAuth, }: UserContext = useAuthContext();
	let accessToken:string = token?.accessToken!;
	const refresh = useRefreshToken();
	useEffect(() => {
		//this send the access token from the login to the protected endpoint
		const requestIntercept = axiosPrivate.interceptors.request.use(
			config => {
				if (accessToken !== undefined) {
					config.headers["Authorization"] = `Bearer ${accessToken}`;
/* 					const jwtPayload = JSON.parse(window.atob(accessToken.split('.')[1]))
					const expiryDate = new Date(jwtPayload.exp*1000);
					console.log("token expiration time: ",expiryDate,"\n current token: ",auth.token); */
				}
				return config;
			}, (error) => Promise.reject(error)
		);

		//this intercept every response from the server, if there is an error redirect to the /refresh-token endpoint
		const responseIntercept = axiosPrivate.interceptors.response.use(
			response => response,
			async (error) => {
				//catch requested endpoint,an error will be thrown if the token has expired
				const previousRequest = error?.config;
				if (error?.response?.status === 401 && !previousRequest.sent) {
					previousRequest.sent = true;//set true to avoid infinite loop
					setAuth({user:undefined})//set user to null to avoid reaching components that requires roles if the refresh token has expired
					const newToken:Token= (await refresh()).token!;//navigate to the refresh endpoint and return the new token
					previousRequest.headers['Authorization'] = `Bearer ${newToken.accessToken}`;
					accessToken=newToken.accessToken!;//overwrite value for the dependency array to re-render the component
					return axiosPrivate(previousRequest);//after getting the token, redirect again to the requested endpoint
				}
				return Promise.reject(error);
			}
		);
		return () => {
			axiosPrivate.interceptors.request.eject(requestIntercept);
			axiosPrivate.interceptors.response.eject(responseIntercept);
		};
	}, [accessToken]);//run this function if the old token is changed by the new one

	return axiosPrivate;
}

export default useInterceptor;