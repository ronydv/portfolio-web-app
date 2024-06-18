/* 
    types used in the authentication folder component
*/
type Role={/* also used in RequireAuth */
    authority:string
}
type User ={/* also used in useFetch<User> in home component */
    id?:number;
    name?:string;
    email?:string;
    phone?:string;
    password?:string;
    authorities?:Array<Role>;
    isEnabled?:boolean
}
type LoginResponse ={
    user?:User;
    token?:Token;
}
type Token ={/* used in useRefreshToken */
    accessToken?:string,
    refreshToken?:string;
}
type PaginatedUsers={
    users:Array<User>;
    total:number;
}