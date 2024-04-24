import { Button, Heading, Spacer, useColorMode, Text, IconButton, useColorModeValue, MenuButton, Menu, MenuItem, MenuList } from "@chakra-ui/react";
import { FaMoon as Moon} from "react-icons/fa6";
import { MdSunny as Sun} from "react-icons/md";
import classes from './header.module.css';
import { Link, useNavigate } from "react-router-dom";
import useMatchMedia from "../../hooks/useMatchMedia";
import useLogout from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";

const Header = () => {
    const {auth:{user}} : UserContext = useAuthContext();
    const navigate = useNavigate();
    const logout = useLogout();
    const { colorMode, toggleColorMode } = useColorMode()
    const linksBtn = useColorModeValue('gray.600','gray.400');
    const dashboardBtn = useColorModeValue('blue.400','blue.300');
    const isDesktop=useMatchMedia();

    const closeSession = async () => {
        await logout();
        navigate('/');
    }

    return (
        <div className={classes.header}>

            <div className={classes.container} >
            
                <Heading as='h1' size='lg' whiteSpace={"nowrap"} 
                         fontSize={{ base: "30px", lg: "30px" }}
                         lineHeight={{base:'1.2',lg: "1.2"}}>
                    <Text as='span' bgGradient='linear(to-t, #e53e3e, #941414)'bgClip='text'>Indus</Text>
                    <span className={classes.span}>tech</span>
                </Heading>
            </div>

            <Spacer />

            {isDesktop && <div className={classes.container}>
                <Link to={'/'}>
                    <Button marginRight={2} variant='link' color={linksBtn}>Home</Button>
                </Link>
                <Link to={'/products'}>
                    <Button marginRight={2} variant='link' color={linksBtn}>Products</Button>
                </Link>
                <Link to={'/designs'}>
                    <Button marginRight={2} variant='link' color={linksBtn}>Designs</Button>
                </Link>
                <Link to={'/'}>
                    <Button marginRight={2} variant='link' color={linksBtn}>Contact</Button>
                </Link>
                <Link to={'/'}>
                    <Button marginRight={2} variant='link' color={linksBtn}>About</Button>
                </Link>
            </div>}

            <Spacer flex={0.2}/>

            <div className={classes.container}>
                <Button variant='outline' color={dashboardBtn}
                            onClick={() => navigate("/dashboard/products-dashboard")}>
                    Dashboard
                </Button>
                
                
                {user?.isEnabled ?
                        <Button onClick={closeSession}>Logout</Button>
                        :
                        <Link to='/login'><Button variant='outline'> Log in</Button></Link>
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