import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

/*
    get the credentials once is filled through the declared variable:
    const [auth, setAuth] = useState<LoginResponse>({});
    from AuthProvider.tsx
*/
export const useAuthContext = () =>{
    const loginResponse =useContext<UserContext|undefined>(AuthContext);
    if(loginResponse === undefined){
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return loginResponse;
}