import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Text, Image, Stack, useColorModeValue, Flex, useColorMode, Badge, Box, Tag } from "@chakra-ui/react";
import { useContext, useState } from "react";
import classes from './cart.module.css';
import CartContext, { CartItemContext } from "../../context/CartProvider";
import useInterceptor from "../../hooks/useInterceptor";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";

const Cart = () => {
    const {auth:{user}} : UserContext = useAuthContext();
    const axiosPrivate = useInterceptor();
    const [orderResponse, setOrderResponse]= useState("");
    const [error, setError]=useState("");
    const darkMode = useColorModeValue('gray.600', 'gray.400');
    const { colorMode } = useColorMode();
    const cartContext=useContext<CartItemContext | undefined>(CartContext);
    const { items, setItems } = cartContext || {};

    const clearCart=()=>{
        setItems && setItems([]);
        localStorage.removeItem('cart-item');
    }
    const removeItem=(index:number)=>{
        setItems && setItems(prevItems => prevItems.filter((_, i) => i !== index));
    }

    const sendServiceRequest= async ()=>{
        const productIds: number[] = [];
        items?.forEach((product) => productIds.push(product?.id!));
        const order: Order = { userId: user?.id, productIds: productIds };
        try {
            const response = await axiosPrivate.post<Order>("/api/v1/orders/order",
                order, {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
            });
            clearCart();
            setOrderResponse("Orden enviada!");
        } catch(error){
            if(axios.isAxiosError(error)) setError(error.response?.data.message);
        }
    }
    return (
        <div className={classes.container}>
            <Heading fontSize={'25px'} mb={3} color={darkMode}>
                {!orderResponse ? items?.length! > 0 ? 'Agendar los siguientes servicios:' : 'No se ha seleccionado ningun ítem'
                                 : orderResponse }
            </Heading>

            {items?.length! > 0 && <Flex columnGap={4} mb={5}>
                <Button onClick={sendServiceRequest}>Enviar petición</Button>
                <Button variant={'outline'} colorScheme={'red'} onClick={clearCart}>Cancelar todos</Button>
            </Flex>}

            {items?.map((product, i) =>
                <Card key={i} maxW='md' mb={4}
                    bgColor={`${colorMode === 'dark' && 'gray.900'}`}>
                    <CardBody>
                        <Image src={product.images && product.images[0].url}
                               alt={product.name}
                               borderRadius='lg'/>
                        <Stack mt='6' spacing='3'>
                            <Heading size='md'>{product.name}</Heading>
                            <Text>
                                {product.description}
                            </Text>
                            <Box>
                                <Badge variant='solid' colorScheme='red'>{product.productType}</Badge>
                                {/* set the categories inside a loop */}
                                {product.categories?.map((category, i) => (
                                    <span key={i}>
                                        <span style={{ color: 'var(--chakra-colors-blue-300)', margin: '4px' }}>•</span>
                                        {category.name}
                                    </span>
                                ))}
                                <p />
                            </Box>
                        </Stack>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                        <ButtonGroup spacing='2'>
                            <Button onClick={()=>removeItem(i)}
                                    variant='outline' colorScheme='red'>
                                Cancelar
                            </Button>
                        </ButtonGroup>
                    </CardFooter>
                </Card>)}
        </div>
    );
}
 
export default Cart;