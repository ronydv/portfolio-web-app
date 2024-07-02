import { useState, useRef, useEffect, FormEvent } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import classes from './account-menu.module.css';
import { Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from "@chakra-ui/react";
import useInterceptor from "../../hooks/useInterceptor";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Profile = () => {
    const axiosPrivate = useInterceptor();
    const navigate = useNavigate();
    const { auth: { user }, setAuth }: UserContext = useAuthContext();
    const EMAIL_REGEX: RegExp = /^[^@]+@[^@]+$/;
    const [userState, setUserState] = useState<User>({});
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [disable, setDisable] = useState(true);
    const [error, setError] = useState<string>();

    useEffect(() => {
        if (user?.email) {
            setIsEmailValid(EMAIL_REGEX.test(user?.email));
            setUserState({
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
            });
        }
    }, []);
    useEffect(() => {
        if (isEmailValid) setDisable(false);
        else setDisable(true);
    }, [isEmailValid]);

    
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {         
            const response = await axiosPrivate.put<User>("/api/v1/users/user",
                userState, {//object to send to the server
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
            });
            //update the current auth state after updating the user
            setAuth( prevAuth => ( {...prevAuth, user: response.data } ) );
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if(error.response?.data.message.includes('duplicate key')){
                    setError('Email already exists');
                }
                if (error.response?.status === 500) {
                    setError("Error while trying to update user");
                }
            }
        }
        
    }
    const handleDelete= async () =>{
        try {
            await axiosPrivate.delete<string>(`/api/v1/users/user/${user?.id}`, {
                headers: {
                    "Accept": "text/plain",//Expect plain text response from the backend
                },
                responseType: 'text'
            });
            setAuth({});
            navigate("/")
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data.message);
            }
        }
    }
    return ( 
        <div className={classes['profile-container']}>
            <h2>Edit Account</h2>
            <form onSubmit={handleSubmit}>                         {/*invalidate form if there is an error message */}
                <FormControl as='fieldset' className={classes.form} isInvalid={error !== ''} >
                    <div>
                        <FormLabel>Name</FormLabel>
                        <Input type='text' placeholder="Enter your name (optional)" 
                            isInvalid={false} defaultValue={user?.name}
                            onChange={(event) => {
                                setUserState({ ...user, name: event.target.value });
                            }} />
                    </div>

                    <div>
                        <FormLabel>Email address</FormLabel>
                        <Input type='email' placeholder="Enter your e-mail"
                            isInvalid={!isEmailValid} defaultValue={user?.email}
                            onChange={(event) => {
                                setError('');
                                setUserState({ ...user, email: event.target.value });
                                setIsEmailValid(EMAIL_REGEX.test(event.target.value));
                            }} />
                        {!error ? <FormHelperText>We'll never share your data or send spam</FormHelperText> :
                            <FormErrorMessage>{error}</FormErrorMessage>
                        }
                    </div>

                    <div>
                        <FormLabel>Phone number</FormLabel>
                        <Input type='text' placeholder="Enter your phone" 
                            isInvalid={false} defaultValue={user?.phone}
                            onChange={(event) => {
                                setUserState({ ...user, phone: event.target.value });
                            }} />
                    </div>

                    <div>
                        <FormLabel>New Password</FormLabel>
                        <Input type='text' placeholder="Enter your password" isInvalid={false}
                               onChange={(event) => {//change input type to password later on develpment
                                setUserState({ ...user, password: event.target.value });
                            }} />
                        <FormHelperText>Password must have more than 5 characters.</FormHelperText>
                    </div>

                    <div>
                        <Button marginTop={3} type="submit" isDisabled={disable}>Save Changes</Button>
                        
                        <Button variant={'ghost'} colorScheme="red" 
                                marginLeft={2} marginTop={3}
                                onClick={handleDelete}
                                >
                                Delete Account
                        </Button>
                    </div>
                </FormControl>
            </form>
        </div>
     );
}
 
export default Profile;