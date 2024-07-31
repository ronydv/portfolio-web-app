import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Text, Image, Stack, useColorModeValue, Flex, useColorMode, Badge, Box, Tag, Spinner } from "@chakra-ui/react";
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
    const [isLoading, setIsLoading]=useState(false);
    const clearCart=()=>{
        setItems && setItems([]);
        localStorage.removeItem('cart-item');
    }
    const removeItem=(index:number)=>{
        setItems && setItems(prevItems => prevItems.filter((_, i) => i !== index));
    }

    const sendServiceRequest= async ()=>{
        setIsLoading(true);
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
            setIsLoading(false);
            clearCart();
            setOrderResponse("Order sent!");
        } catch(error){
            setIsLoading(false);
            if(axios.isAxiosError(error)) setError(error.response?.data.message);
        }
    }

    const renderStatusMessage = (): JSX.Element => {
        if (!orderResponse) {
            if (items?.length! > 0) {
                return isLoading ? <p>Sending order...
                                      <Spinner thickness='4px'speed='0.65s' emptyColor='gray.200'color='purple.500' size='md'/>
                                   </p>
                                 : <p>Schedule the following services:</p>;
                                 
            }else return <p>No item has been selected</p>;

        } else {
            return <p>{orderResponse}</p>;
        }
    }

    return (
        <div className={classes.container}>
            <Heading fontSize={'25px'} mb={3} color={darkMode}>
                {renderStatusMessage()}
            </Heading>

            {items?.length! > 0 && <Flex columnGap={4} mb={5}>
                <Button onClick={sendServiceRequest}>Send request</Button>
                <Button variant={'outline'} colorScheme={'teal'} onClick={clearCart}>Cancel all</Button>
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
                                    variant='outline' colorScheme='teal'>
                                Cancel
                            </Button>
                        </ButtonGroup>
                    </CardFooter>
                </Card>)}
        </div>
    );
}
 
export default Cart;