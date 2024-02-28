import { Button, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Unautorized = () => {
    const navigate = useNavigate();

const goBack = () => navigate(-1);

return (
    <section style={{marginTop:20}}>
        <Heading as={'h1'}>Unauthorized</Heading>
        <br />
        <p style={{fontSize:'24px'}}>You do not have access to the requested page.</p>
        <br/>
        <Button onClick={goBack}>Go Back</Button>
    </section>
)
}
 
export default Unautorized;