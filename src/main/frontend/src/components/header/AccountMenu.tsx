import { useState } from "react";
import './account-menu.css'
import { Button } from "@chakra-ui/react";
import { RiAccountBoxFill as Profile } from "react-icons/ri";
import { MdHomeRepairService as Orders } from "react-icons/md";
import { RiLogoutBoxLine as Logout } from "react-icons/ri";
import useLogout from "../../hooks/useLogout";
import { useNavigate } from "react-router-dom";
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

    const closeSession = async () => {
        await logout();
        navigate('/');
    }
    
    return (
        <div className="account-option">
            <ul className='menu'>
                <li className="menu-items">
                    <Button variant='ghost' colorScheme='teal' leftIcon={<Profile/>}
                            onClick={() => setDropdown((prev) => !prev)}>
                        account
                    </Button>
                    <ul className={`dropdown ${dropdown ? "show" : ""}`}>
                        {menu.map((item, i) => (
                            <li className="menu-items">
                                <Button mb={2} variant={'link'} leftIcon={item.icon}>
                                    {item.menuItem}
                                </Button>
                            </li>
                        ))}
                        <li className="menu-items">
                            <Button variant={'link'} leftIcon={<Logout/>}
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