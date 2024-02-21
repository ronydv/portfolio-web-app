import { Box, Button, Center, Flex, Heading, Spacer, useColorMode, Text, IconButton, useColorModeValue, Icon } from "@chakra-ui/react";
import { FaMoon as Moon} from "react-icons/fa6";
import { MdSunny as Sun} from "react-icons/md";
import classes from './header.module.css';
import { Link } from "react-router-dom";

const Header = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    const darkMode = useColorModeValue('gray.600','gray.400');
    return (
        <div className={classes.header}>

            <div className={classes.container} >
            
                <Heading as='h1' size='lg'>
                    <Text as='span' bgGradient='linear(to-t, #26ab9e, #266f77)'bgClip='text'>Indus</Text>
                    <span className={classes.span}>tech</span>
                </Heading>
            </div>

            <Spacer />

            <div className={classes.container}>
                <Link to={'/'}>
                    <Button variant='outline' color={darkMode}>Home</Button>
                </Link>
                <Button variant='link' color={darkMode}>About</Button>
                <Button variant='link' color={darkMode}>Contact</Button>
                <Button variant='link' color={darkMode}>Services</Button>
            </div>

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