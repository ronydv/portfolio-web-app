import { Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, useToast } from "@chakra-ui/react";
import classes from './authentication.module.css';
import { FormEvent, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//TODO: add toast if sign up is successful 
const Signup = () => {
    const EMAIL_REGEX: RegExp=/^[^@]+@[^@]+$/;
    const [user, setUser] = useState<User>({});
    const navigate = useNavigate();
    const [isEmailValid, setIsEmailValid]=useState(false);
    const [isPasswordValid, setIsPasswordValid]=useState(false);
    const [disable, setDisable]=useState(true);
    const [error, setError]=useState<string>();

    const password=useRef<HTMLInputElement>(null);
    const matchPassword=useRef<HTMLInputElement>(null);
    
    const notification = useToast();

    const showToast=()=>{
        notification({
            title: 'Registro',
            description:'Registrado exitosamente!',
            status: 'info',
            duration: 4000,
            isClosable: true,
        });
    }
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
        try {         
            const response = await axios.post<User>("/api/v1/auth/signup",
                user, {//object to send to the server
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
            });
            showToast();
            navigate("/login");
        } catch (error: unknown) {//TODO: DELETE ALL CONSOLE OUTPUT THAT CONTAINS USER INFORMATION
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 409) {
                    setError(error.response.data.message);
                }else if (error.response?.status === 500){
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
                        <Input type='email' placeholder="Enter your e-mail" isInvalid={!isEmailValid}
                            onChange={(event) => {
                                setError('');
                                setUser({ ...user, email: event.target.value });
                                setIsEmailValid(EMAIL_REGEX.test(event.target.value));
                            }} />
                        {!error ? <FormHelperText>We'll never share your data or send spam</FormHelperText> :
                            <FormErrorMessage>{error}</FormErrorMessage>
                        }
                    </div>

                    <div>
                        <FormLabel>Phone number</FormLabel>
                        <Input type='text' placeholder="Enter your phone" isInvalid={false}
                            onChange={(event) => {
                                setUser({ ...user, phone: event.target.value });
                            }} />
                    </div>

                    <div>
                        <FormLabel>Password</FormLabel>
                        <Input type='password' placeholder="Enter your password" isInvalid={!isPasswordValid}
                            ref={password} onChange={(event) => {//change input type to password later on develpment
                                setError('');
                                setUser({ ...user, password: event.target.value });
                                checkMatch(event.target.value, matchPassword.current?.value!);
                            }} />
                        <FormHelperText>Password must have more than 5 characters.</FormHelperText>
                    </div>

                    <div>
                        <FormLabel>Confirm Password</FormLabel>
                        <Input type='password' placeholder="Repeat password" isInvalid={!isPasswordValid}
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