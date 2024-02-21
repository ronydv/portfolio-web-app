import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Home = () => {
    return ( 
        <div>
            <h1>Home component</h1>
            <Link to='/products'>
            <Button>products</Button>
            </Link>
            <Link to='/services'>
                <Button>services</Button>
            </Link>
        </div>
     );
}
 
export default Home;