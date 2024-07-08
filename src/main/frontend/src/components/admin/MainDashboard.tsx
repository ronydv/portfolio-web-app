import { Link, Outlet, useLocation } from 'react-router-dom';
import { IoPricetags as Products } from "react-icons/io5";
import { IoAnalyticsOutline as Analytics } from "react-icons/io5";
import { RiCustomerService2Line as Customers } from "react-icons/ri";
import { GiHamburgerMenu as Burger } from "react-icons/gi";
import classes from './main-dashboard.module.css';
import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Flex, IconButton, useColorMode, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { IconType } from 'react-icons';
import ProductsDashboard from './products-management/ProductsDashboard';
import useMatchMedia from '../../hooks/useMatchMedia';

type LinkStyle={name:string, path:string, icon:IconType,}
const linkItems:LinkStyle[]=[
    {
        name:"Productos",
        path:"products-dashboard",
        icon:Products,
    },
    {
        name:"Analíticas",
        path:"analytics-dashboard",
        icon:Analytics,
    },
    {
        name:"Clientes",
        path:"customers-dashboard",
        icon:Customers,
    },
];
const MainDashboard = () => {
    const { colorMode } = useColorMode();
    const isDesktop = useMatchMedia();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const darkMode = useColorModeValue('gray.600', 'gray.400');
    const [activeButton, setActiveButton] = useState<string>("Productos");
    const location = useLocation();
    const handleButtonClick = (name: string) => setActiveButton(name);

    useEffect(() => {
        if (location.pathname === '/dashboard/products-dashboard') setActiveButton("Productos");
    }, [location.pathname]);

    return (
        <div className={`${classes.dashboard} ${!isDesktop && classes.mobile}`}>

            {isDesktop ?
                <div className={`${classes.links} ${colorMode === 'light' ? classes.light : classes.dark}`}>

                    {linkItems.map((item, i) => (
                        <Flex key={i}>

                            <div className={`${classes['active-border']} ${activeButton === item.name && classes.selected}`} />
                            <Link to={item.path}>
                                <Button variant='link' colorScheme='red' leftIcon={<item.icon />}
                                    color={darkMode}
                                    isActive={activeButton === item.name}
                                    onClick={() => handleButtonClick(item.name)}>
                                    {item.name}
                                </Button>
                            </Link>

                        </Flex>
                    ))
                    }
                </div>
                :
                <>{/* if it's not desktop mode, render a drawer */}
                <IconButton isRound={true} variant='ghost' aria-label='Dark Mode'
                    fontSize='20px' onClick={onOpen}
                    color={'gray'}
                    icon={<Burger />} />
                    <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
                        <DrawerOverlay />
                        <DrawerContent>
                            <DrawerHeader borderBottomWidth='1px'>Dashboard Menu</DrawerHeader>
                            <DrawerBody>
                                {linkItems.map((item, i) => (
                                    <Flex key={i}>
                                        <div className={`${classes['active-border']} ${activeButton === item.name && classes.selected}`} />
                                        <Link to={item.path}>
                                            <Button variant='link' leftIcon={<item.icon />}
                                                color={darkMode}
                                                isActive={activeButton === item.name}
                                                onClick={() => {
                                                    handleButtonClick(item.name);
                                                    onClose();
                                                }}>
                                                {item.name}
                                            </Button>
                                        </Link>
                                    </Flex>
                                ))
                                }
                            </DrawerBody>
                        </DrawerContent>
                    </Drawer>
                    </>}

            <div className={classes.outlet}>
                {/* render ProductDashboard in the first loading before clicking any navigation link*/}
                {activeButton === 'Productos' ? <ProductsDashboard setActiveButton={setActiveButton} />
                    : <Outlet />}
            </div>

        </div>
    );
};

export default MainDashboard;