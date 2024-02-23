type Role={
    authority:string
}
type User ={
    id?:number;
    username?:string;
    email?:string;
    password?:string;
    authorities?:Array<Role>;
}
type LoginResponse ={
    user:User;
    accessToken:string,
    refreshToken:string
}