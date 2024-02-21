import { Box, Flex } from "@chakra-ui/react";
import Header from "./components/header/Header";
import classes from './index.module.css'
import { Outlet } from "react-router-dom";
const Layout = () => {
    return (
        <div className={classes.layout}>
            <header>
                <Header />
            </header>

            <div className={classes.content}>

                <nav className={classes.sidebar}>{/* `side bar` */}</nav>

                <main className={classes.main}>
                    <Outlet/>
                </main>

            </div>

        </div>
    );
};

export default Layout;