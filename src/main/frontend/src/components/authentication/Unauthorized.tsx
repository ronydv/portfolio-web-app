import { Button, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Unautorized = () => {
    const navigate = useNavigate();

const goBack = () => navigate(-1);

return (
    <section style={{marginTop:20}}>
        <Heading as={'h1'}>No Autorizado</Heading>
        <br />
        <p style={{fontSize:'24px'}}>No tienes permiso para acceder a esta página.</p>
        <br/>
        <Button onClick={goBack}>Volver</Button>
    </section>
)
}
 
export default Unautorized;