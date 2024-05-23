/* types for AuthProvider.tsx */
/* also used in useInterceptor, useAuthContext, Login.tsx */
type UserContext = {//typechecking to set props value in AuthContext.Provider
    auth: LoginResponse;
    setAuth: React.Dispatch<React.SetStateAction<LoginResponse>>;
    persist: boolean;
    setPersist: React.Dispatch<React.SetStateAction<boolean>>;
};

//-----props ///////////////////
type ContextProps = {//props to set in AuthProvider.tsx, CartProvider.tsx
    children: React.ReactNode;
};