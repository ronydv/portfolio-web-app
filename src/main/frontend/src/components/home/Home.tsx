import { Button, Text} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useInterceptor from "../../hooks/useInterceptor";
import { useFetch } from "../../hooks/useFetch";

const Home = () => {
    const {data:users}=useFetch<User>("/api/v1/users/user");
    
    console.log(users);
    
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
            <Text size={'lg'}> text for users</Text>
            <br /><br />
            <Text size={'lg'}> text for admin</Text>
            
        </div>
     );
}
 
export default Home;