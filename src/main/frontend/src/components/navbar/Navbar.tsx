import { Button, Flex, Text, IconButton, useColorModeValue } from "@chakra-ui/react";
import { FaHome as HomeIcon } from "react-icons/fa";
import { FaAddressCard as AboutIcon } from "react-icons/fa6";
import { FaPhoneVolume as ContactIcon } from "react-icons/fa6";
import { FaCartShopping as Cart} from "react-icons/fa6";
import { IoStorefrontSharp as StoreIcon} from "react-icons/io5";
import classes from './navbar.module.css';
import { Link } from "react-router-dom";
import { useContext } from "react";
import CartContext, { CartItemContext } from "../../context/CartProvider";
const Navbar = () => {
    const darkMode = useColorModeValue('gray.600','gray.400');
    const cartContext=useContext<CartItemContext | undefined>(CartContext);
    return ( 
        <div className={classes.navbar}>
            <Link to='/'>
                <IconButton isRound={true} variant='ghost' aria-label='Dark Mode'
                    fontSize='20px'
                    color={darkMode}
                    icon={<HomeIcon />} />
            </Link>
            
            <Link to='/catalog'>
                <IconButton isRound={true} variant='ghost' aria-label='Dark Mode'
                    fontSize='20px'
                    color={darkMode}
                    icon={<StoreIcon />} />
            </Link>

            <IconButton isRound={true} variant='ghost' aria-label='Dark Mode'
                fontSize='20px'
                color={darkMode}
                icon={<ContactIcon />} />

            <IconButton isRound={true} variant='ghost' aria-label='Dark Mode'
                fontSize='20px'
                color={darkMode}
                icon={<AboutIcon />} />
            
            <div className={classes['cart-container']}>
                    <Link to={'/cart'}>
                    <IconButton isRound={true} variant='ghost' aria-label='Dark Mode'
                        fontSize='20px'
                        color={darkMode}
                        icon={<Cart/>} /> 
                    </Link>
                    <Flex className={classes['cart-value']} bgColor={'orange.200'}>
                        <Text as={'span'} fontWeight={'900'} fontSize={'12px'} color={'gray.600'}>{cartContext?.items.length}</Text>
                    </Flex>
                </div>
        </div>
    );
}
 
export default Navbar;