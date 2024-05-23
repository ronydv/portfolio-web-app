import { createContext, useState } from "react";
/*
this wraps all the information we need to send to its children components
the wrapping is done in index.tsx
the AuthContext value is filled in Login.tsx component,
the persist value is optionally set in Login.tsx component as well
and used in PersistAuth.tsx
*/
const AuthContext = createContext<UserContext| undefined>(undefined);

export const AuthProvider = ({ children }: AuthContextProps) => {
    const [auth, setAuth] = useState<LoginResponse>({});
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")!) || false);
    return (
        <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>{/* load user with the credentials */}
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext;