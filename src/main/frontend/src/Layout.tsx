import { useColorMode } from "@chakra-ui/react";
import Header from "./components/header/Header";
import classes from './index.module.css'
import { Outlet } from "react-router-dom";
import useMatchMedia from "./hooks/useMatchMedia";
import Navbar from "./components/navbar/Navbar";
const Layout = () => {
    const mode = useColorMode();
    const isDesktop=useMatchMedia();
    return (
        <div className={classes.layout}>
            <header>
                <Header />
            </header>

            <div className={classes.content}>

                {!isDesktop &&
                <nav className={`${classes.sidebar} ${mode.colorMode==='dark' ? 
                                                        classes.darkmode:classes.lightmode}`}>
                    <Navbar/>
                </nav>}

                <main className={classes.main}>
                    <Outlet />
                </main>

            </div>

        </div>
    );
};

export default Layout;