import { Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from "@chakra-ui/react";
import classes from './authentication.module.css';
import { FormEvent, useEffect, useRef, useState } from "react";
import axios from "axios";
const Signup = () => {
    const EMAIL_REGEX: RegExp=/^[^@]+@[^@]+$/;
    const [user, setUser] = useState<User>({email:'',password:''});//data for test purposes

    const [isEmailValid, setIsEmailValid]=useState(false);
    const [isPasswordValid, setIsPasswordValid]=useState(false);
    const [disable, setDisable]=useState(true);
    const [error, setError]=useState<string>();

    const password=useRef<HTMLInputElement>(null);
    const matchPassword=useRef<HTMLInputElement>(null);
    
    const checkMatch=(password:string, match:string) =>{
        if(password !== '' && match !== ''){
            setIsPasswordValid(password === match);
        }else setIsPasswordValid(false);
    }

    useEffect(()=>{//enable button if there's a match after every re-render
        if(isEmailValid && isPasswordValid) setDisable(false);
        else setDisable(true);
    },[isEmailValid,isPasswordValid]);
    
    
    const handleSubmit = async (event:FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        console.log("saving... ", user);

        try {        //wait until the fetching is complete          
            const response = await axios.post<User>("/api/v1/auth/signup",
                user, {//object to send to the server
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
            });
            console.log("request to the server-> ", user, "\nresponse from the server->", response.data);
        } catch (error: unknown) {//TODO: DELETE ALL CONSOLE OUTPUT THAT CONTAINS USER INFORMATION
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 409) {
                    console.log(user, "\n", error.response.data);
                    setError(error.response.data.message);
                }else if (error.response?.status === 500){
                    console.log(user, "\n", error.response.status);
                    setError("Error while trying to create user");
                }
            }
        }
    }
    return (
        <div className={classes.container}>
            <h2>Sign up</h2>
            <form onSubmit={handleSubmit}>                         {/*invalidate form if there is an error message */}
                <FormControl as='fieldset' className={classes.form} isInvalid={error !== ''} >
                    <div>
                        <FormLabel>Name</FormLabel>
                        <Input type='text' placeholder="Enter your name (optional)" isInvalid={false}
                            onChange={(event) => {
                                setUser({ ...user, name: event.target.value });
                            }} />
                    </div>

                    <div>
                        <FormLabel>Email address</FormLabel>
                        <Input type='text' placeholder="Enter your e-mail" isInvalid={!isEmailValid}
                            onChange={(event) => {//change input type to email later on develpment
                                setError('');
                                setUser({ ...user, email: event.target.value });
                                setIsEmailValid(EMAIL_REGEX.test(event.target.value));
                            }} />
                        {!error ? <FormHelperText>We'll never share your data or send spam</FormHelperText> :
                            <FormErrorMessage>{error}</FormErrorMessage>
                        }
                    </div>

                    <div>
                        <FormLabel>Password</FormLabel>
                        <Input type='text' placeholder="Enter your password" isInvalid={!isPasswordValid}
                            ref={password} onChange={(event) => {//change input type to password later on develpment
                                setError('');
                                setUser({ ...user, password: event.target.value });
                                checkMatch(event.target.value, matchPassword.current?.value!);
                            }} />
                        <FormHelperText>Password must have more than 5 characters.</FormHelperText>
                    </div>

                    <div>
                        <FormLabel>Confirm Password</FormLabel>
                        <Input type='text' placeholder="Repeat password" isInvalid={!isPasswordValid}
                            ref={matchPassword} onChange={(event) => {
                                setError('');
                                checkMatch(password.current?.value!, event.target.value);
                            }} />
                    </div>

                    <div>
                        <Button marginTop={3} type="submit" isDisabled={disable}>Register</Button>
                    </div>
                </FormControl>
            </form>
        </div>
     );
}
 
export default Signup;