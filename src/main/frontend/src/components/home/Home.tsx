import { Button, Text} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import Restricted from "../authentication/Restricted";
import useLogout from "../../hooks/useLogout";

const Home = () => {
    const {data:users}=useFetch<User>("/api/v1/users/user");
    
    return ( 
        <div>
            <h1>Home component</h1>
            <Link to='/products'>
                <Button>products</Button>
            </Link>
            <Link to='/services'>
                <Button>services</Button>
            </Link>
            
            <br /><br />
            <Text size={'lg'}> text for visitors</Text>
            <br /><br />
            
            <Restricted to={['user']}>
                <p> text for users</p>
            </Restricted>
            <br /><br />

            <Restricted to={['admin']}>
                <h2> text for admin</h2>
                <ul>
                    {users.map((user, i) => (
                        <li key={i}>{user.email}</li>))}
                </ul>
            </Restricted>
            
        </div>
     );
}
 
export default Home;