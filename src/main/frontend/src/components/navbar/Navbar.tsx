import { IconButton, useColorModeValue } from "@chakra-ui/react";
import { FaHome as HomeIcon } from "react-icons/fa";
import { FaAddressCard as AboutIcon } from "react-icons/fa6";
import { FaPhoneVolume as ContactIcon } from "react-icons/fa6";
import { FaHandshakeSimple as ServiceIcon } from "react-icons/fa6";
import { IoStorefrontSharp as StoreIcon} from "react-icons/io5";
import classes from './navbar.module.css';
import { Link } from "react-router-dom";
const Navbar = () => {
    const darkMode = useColorModeValue('gray.600','gray.400');
    
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
        </div>
    );
}
 
export default Navbar;