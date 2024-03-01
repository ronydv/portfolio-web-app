/* types for AuthProvider.tsx */
/* also used in useInterceptor, useAuthContext, Login.tsx */
type UserContext = {//typechecking to set props value in AuthContext.Provider
    auth: LoginResponse;
    setAuth: React.Dispatch<React.SetStateAction<LoginResponse>>;
};
//-----props ///////////////////
type AuthContextProps = {//props to set in AuthProvider.tsx
    children: React.ReactNode;
};