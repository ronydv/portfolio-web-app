import { useColorMode } from "@chakra-ui/react";
import Header from "./components/header/Header";
import classes from './index.module.css'
import { Outlet } from "react-router-dom";
import useMatchMedia from "./hooks/useMatchMedia";
import Navbar from "./components/navbar/Navbar";
import WhatsappLogo from './assets/whatsapp-logo.png';

const Layout = () => {
    const mode = useColorMode();
    const isDesktop=useMatchMedia();
    const greet:string="Buenas, estoy interesado en consultar un producto";

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
                    </nav>
                }

                <main className={classes.main}>
                    <Outlet />
                </main>

            </div>
            {isDesktop &&
                <div className={`${classes['whatsapp-icon']} ${mode.colorMode==='dark' && classes.dark}`}>
                    <a href={`https://wa.me/595971217202?text=${greet}`} target="_blank" rel="noopener noreferrer">
                        <img src={WhatsappLogo} alt="WhatsApp" />
                    </a>
                </div>
            }
            <footer style={{paddingLeft:'40px', marginTop:'10px'}}>
                <p>Industech &copy; 2024. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default Layout;