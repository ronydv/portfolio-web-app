import { Button, FormControl, FormHelperText, FormLabel, Input } from "@chakra-ui/react";
import classes from './authentication.module.css';
const Signup = () => {
    return (
        <div className={classes.container}>
            <h2>Sign up</h2>
            <FormControl as='fieldset' className={classes.form}>
                <div>
                    <FormLabel>Name</FormLabel>
                    <Input type='email' />
                    <FormHelperText>Optional</FormHelperText>
                </div>
                <div>
                    <FormLabel>Email address</FormLabel>
                    <Input type='email'/>
                    <FormHelperText>We'll never share your email.</FormHelperText>
                </div>
                <div>
                    <FormLabel>Password</FormLabel>
                    <Input type='text' />
                    <FormHelperText>Password must have more than 5 characters.</FormHelperText>
                </div>
                <div>
                    <Button type="submit">Register</Button>
                </div>
                
            </FormControl>
        </div>
     );
}
 
export default Signup;