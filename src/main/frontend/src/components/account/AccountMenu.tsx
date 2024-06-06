import { useState } from "react";
import classes from './account-menu.module.css'
import { Button, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { RiAccountBoxFill as Profile } from "react-icons/ri";
import { MdHomeRepairService as Orders } from "react-icons/md";
import { RiLogoutBoxLine as Logout } from "react-icons/ri";
import useLogout from "../../hooks/useLogout";
import { Link, useNavigate } from "react-router-dom";
const menu=[
    {
        menuItem:'Profile',
        url:'/profile',
        icon: <Profile/>
    },
    {
        menuItem:'Orders',
        url:'/orders',
        icon:<Orders/>
    },
]

const AccountMenu = () => {
    const [dropdown, setDropdown] = useState(false);
    const logout = useLogout();
    const navigate = useNavigate();
    const grayColor = useColorModeValue('gray.600','gray.400');
    const { colorMode } = useColorMode();
    const closeSession = async () => {
        await logout();
        navigate('/');
    }
    
    return (
        <div className={classes['account-option']}>
            <ul className={classes.menu}>
                <li className={classes['menu-items']} onMouseEnter={() => setDropdown(true)} 
                                                      onMouseLeave={() => setDropdown(false)}>
                    <Button variant='ghost' colorScheme='teal' leftIcon={<Profile/>}>
                        account
                    </Button>
                    <ul className={`${classes.dropdown} ${dropdown && classes.show} 
                                    ${colorMode === 'light' ? classes.light : classes.dark}`}>
                        {menu.map((item, i) => (
                            <Link to={item.url} key={i}>
                                <li className={classes['menu-items']}>
                                    <Button mb={2} variant={'link'} leftIcon={item.icon} color={grayColor}>
                                        {item.menuItem}
                                    </Button>
                                </li>
                            </Link>
                        ))}
                        <li className={classes['menu-items']}>
                            <Button variant={'link'} leftIcon={<Logout />} color={grayColor}
                                onClick={closeSession}>
                                Logout
                            </Button>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}
 
export default AccountMenu;