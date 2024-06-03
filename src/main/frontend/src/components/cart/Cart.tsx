import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Text, Image, Stack, useColorModeValue, Flex, useColorMode, Badge, Box, Tag } from "@chakra-ui/react";
import { useContext } from "react";
import classes from './cart.module.css';
import CartContext, { CartItemContext } from "../../context/CartProvider";
const Cart = () => {
    const darkMode = useColorModeValue('gray.600', 'gray.400');
    const { colorMode } = useColorMode();
    const cartContext=useContext<CartItemContext | undefined>(CartContext);
    const { item, setItem } = cartContext || {};
    const userId:{}={userId:2,userName:"user"};//replace value with the user from AuthContext;

    const clearCart=()=>{
        setItem && setItem([]);
        localStorage.removeItem('cart-item');
    }
    const removeItem=(index:number)=>{
        setItem && setItem(prevItems => prevItems.filter((_, i) => i !== index));
    }
    return (
        <div className={classes.container}>
            <Heading fontSize={'25px'} mb={3} color={darkMode}>
                {item?.length! > 0 ? 'Schedule the following services:' : 'No items have been selected'}
            </Heading>

            {item?.length! > 0 && <Flex columnGap={4} mb={5}>
                <Button>Send request</Button>
                <Button variant={'outline'} colorScheme={'red'} onClick={clearCart}>Cancel all</Button>
            </Flex>}

            {item?.map((product, i) =>
                <Card key={i} maxW='md' mb={4}
                    bgColor={`${colorMode === 'dark' && 'gray.900'}`}>
                    <CardBody>
                        <Image src={product.images && product.images[0].url}
                               alt='Green double couch with wooden legs' 
                               borderRadius='lg'/>
                        <Stack mt='6' spacing='3'>
                            <Heading size='md'>{product.name}</Heading>
                            <Text>
                                This sofa is perfect for modern tropical spaces, baroque inspired
                                spaces, earthy toned spaces and for people who love a chic design with a
                                sprinkle of vintage design.{product.description}
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
                                Cancel
                            </Button>
                        </ButtonGroup>
                    </CardFooter>
                </Card>)}
        </div>
    );
}
 
export default Cart;