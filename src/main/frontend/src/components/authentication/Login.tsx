import { Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from "@chakra-ui/react";
import classes from './authentication.module.css';
import { FormEvent, useState } from "react";
import axios from "axios";

const Login = () => {
    const [user, setUser] = useState<User>({email:'admin@mail.com',password:'password'});//data for test purposes
    const [isError, setIsError]= useState<boolean>(false)
    const [error, setError]=useState<string | undefined>(undefined);
    const disable: boolean= user.email=== '' || user.password === '';

    const handleSubmit = async (event:FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        console.log(user);
        try{
            const response = await axios.post<LoginResponse>("/api/v1/auth/login",
                user, {//object to send to the server
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
            });
            console.log(response);
        }catch(error:unknown){
            if(axios.isAxiosError(error)){
                setIsError(true);
                setError(error.response?.data.message);
                console.log(error.response?.data.message);
            }
        }
    };
    return (
        <div className={classes.container}>
            <h2>Log in</h2>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <FormControl as='fieldset' className={classes.form} isInvalid={isError}>
                    <div>
                        <FormLabel>Email address</FormLabel>
                        <Input type='email' value={user.email} placeholder="Enter your email"
                            onChange={(event) => {
                                setUser({ ...user, email: event.target.value });
                                setIsError(false);
                            }} />
                        {!isError ? <FormHelperText>We'll never share your data or send spam</FormHelperText> :
                            <FormErrorMessage>{`${error}, invalid email or password`}</FormErrorMessage>
                        }
                    </div>

                    <div>
                        <FormLabel>Password</FormLabel>
                        <Input type='text' value={user.password} placeholder="Enter your password"
                            onChange={(event) => {
                                setUser({...user,password: event.target.value});
                                setIsError(false);
                            }} />
                        
                    </div>

                    <div>
                        <Button marginTop={3} type="submit" isDisabled={disable}>Log in</Button>
                    </div>
                </FormControl>
            </form>
        </div>
    );
};

export default Login;