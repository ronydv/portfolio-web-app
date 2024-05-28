import { Button, Heading, Spacer, useColorMode, Text, IconButton, useColorModeValue, MenuButton, Menu, MenuItem, MenuList } from "@chakra-ui/react";
import { FaMoon as Moon} from "react-icons/fa6";
import { MdSunny as Sun} from "react-icons/md";
import classes from './header.module.css';
import { Link, useNavigate } from "react-router-dom";
import useMatchMedia from "../../hooks/useMatchMedia";
import useLogout from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useContext } from "react";
import CartContext, { CartItemContext } from "../../context/CartProvider";

const Header = () => {
    const {auth:{user}} : UserContext = useAuthContext();
    const navigate = useNavigate();
    const logout = useLogout();
    const { colorMode, toggleColorMode } = useColorMode()
    const linksBtn = useColorModeValue('gray.600','gray.400');
    const isDesktop=useMatchMedia();

    const handleNavigation = () => {//todo: after being sure of this function, add the same to the navbar for the mobile version
/*         const tab = 1;//works
        const categories: string[] = [];
        const types: string[] = [];
        const page= 1;
        const searchParams = new URLSearchParams();
        searchParams.set('tab', tab.toString());
        searchParams.set('categories', JSON.stringify(categories));
        searchParams.set('types', JSON.stringify(types));
        searchParams.set('page', page.toString()); */
        navigate({
            pathname: '/catalog',
            //search: searchParams.toString(),
        });
    };

    const closeSession = async () => {
        await logout();
        navigate('/');
    }

    return (
        <div className={classes.header}>

            <div className={classes.container} >
            
                <Heading as='h1' size='lg' whiteSpace={"nowrap"} 
                         fontSize={{ base: "25px", lg: "25px" }}
                         lineHeight={{base:'1.2',lg: "1.2"}}>
                    <Text as='span'
                          bgGradient='linear(to-t, #e53e3e, #941414)'
                          bgClip='text' fontFamily={'abnes'}>IndusTEch</Text>
                    
                </Heading>
            </div>

            <Spacer />

            {isDesktop && <div className={classes.container}>
                <Link to={'/'}>
                    <Button marginRight={2} variant='link' color={linksBtn}>Home</Button>
                </Link>
                <a>{/* wrapper tag to avoid misalignment inside the div */}
                    <Button onClick={handleNavigation} marginRight={2} variant='link' color={linksBtn}>Catalog</Button>
                </a>
                <Link to={'/'}>
                    <Button marginRight={2} variant='link' color={linksBtn}>Contact</Button>
                </Link>
                <Link to={'/'}>
                    <Button marginRight={2} variant='link' color={linksBtn}>About</Button>
                </Link>
            </div>}

            <Spacer flex={0.2}/>

            <div className={classes.container}>
                <Button variant='outline' colorScheme="orange"
                            onClick={() => navigate("/dashboard/products-dashboard")}>
                    Dashboard
                </Button>
                
                
                {user?.isEnabled ?
                        <Button onClick={closeSession}>Logout</Button>
                        :
                        <Link to='/login'><Button variant='outline' colorScheme="red"/*"teal"*/> Log in</Button></Link>
                }

                <Link to='/signup'><Button> Sign up</Button></Link>

                <IconButton isRound={true} variant='ghost' aria-label='Dark Mode'
                    fontSize='20px' onClick={toggleColorMode}
                    color={linksBtn}
                    icon={colorMode === 'light' ? <Moon /> : <Sun />} />
            </div>
        </div>
    );
};

export default Header;