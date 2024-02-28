import { createContext, useState } from "react";
/*
this wraps all the information we need to send to its children components
the AuthContext value is filled in Login.tsx component
*/
const AuthContext = createContext<UserContext| undefined>(undefined);

export const AuthProvider = ({ children }: AuthContextProps) => {
    const [auth, setAuth] = useState<LoginResponse>({});
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>{/* load user with the credentials */}
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext;