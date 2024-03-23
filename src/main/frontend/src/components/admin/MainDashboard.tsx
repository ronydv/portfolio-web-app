import { Link, Outlet, useLocation } from 'react-router-dom';
import { IoPricetags as Products } from "react-icons/io5";
import { IoAnalyticsOutline as Analytics } from "react-icons/io5";
import { RiCustomerService2Line as Customers } from "react-icons/ri";
import classes from './main-dashboard.module.css';
import { Button, Flex, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { IconType } from 'react-icons';
import ProductsDashboard from './products-panel/ProductsDashboard';

type LinkStyle={name:string, path:string, icon:IconType,}
const linkItems:LinkStyle[]=[
    {
        name:"Products",
        path:"products-dashboard",
        icon:Products,
    },
    {
        name:"Analytics",
        path:"analytics-dashboard",
        icon:Analytics,
    },
    {
        name:"Customers",
        path:"customers-dashboard",
        icon:Customers,
    },
];
const MainDashboard = () => {
    const { colorMode } = useColorMode()
    const darkMode = useColorModeValue('gray.600','gray.400');
    const [activeButton, setActiveButton] = useState<string>("Products");
    const location = useLocation();
    const handleButtonClick = (name:string) => {
      setActiveButton(name);
    };
    
    useEffect(()=>{
        if(location.pathname==='/dashboard/products-dashboard') setActiveButton("Products");
    },[location.pathname])

    return (
        <div className={classes.dashboard}>

            <div className={`${classes.links} ${colorMode === 'light' ? classes.light : classes.dark}`}>

                {linkItems.map((item, i) => (
                    <Flex key={i}>

                        <div className={`${classes['active-border']} ${activeButton === item.name && classes.selected}`}/>
                        <Link to={item.path}>
                            <Button variant='link' leftIcon={<item.icon />}
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

            <div className={classes.outlet}>
                {/* render ProductDashboard in the first loading before clicking any navigation link*/}
                {activeButton==='Products' ? <ProductsDashboard setActiveButton={setActiveButton} />
                                           : <Outlet />}
            </div>

        </div>
    );
}
 
export default MainDashboard;