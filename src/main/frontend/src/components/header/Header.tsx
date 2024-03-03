import { Button, Heading, Spacer, useColorMode, Text, IconButton, useColorModeValue } from "@chakra-ui/react";
import { FaMoon as Moon} from "react-icons/fa6";
import { MdSunny as Sun} from "react-icons/md";
import classes from './header.module.css';
import { Link } from "react-router-dom";
import useMatchMedia from "../../hooks/useMatchMedia";

const Header = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    const darkMode = useColorModeValue('gray.600','gray.400');
    const isDesktop=useMatchMedia();

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
                    <Button variant='outline' color={darkMode} borderColor={darkMode}>Home</Button>
                </Link>
                <Button variant='link' color={darkMode}>About</Button>
                <Button variant='link' color={darkMode}>Contact</Button>
                <Button variant='link' color={darkMode}>Services</Button>
            </div>}

            <Spacer flex={0.2}/>

            <div className={classes.container}>
                <Link to={'/login'}><Button variant='outline'> Log in</Button></Link>

                <Link to={'/signup'}><Button> Sign up</Button></Link>

                <IconButton isRound={true} variant='ghost' aria-label='Dark Mode'
                    fontSize='20px' onClick={toggleColorMode}
                    color={darkMode}
                    icon={colorMode === 'light' ? <Moon /> : <Sun />} />
            </div>
        </div>
    );
};

export default Header;