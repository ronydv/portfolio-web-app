import { useEffect, useState } from "react";

const useMatchMedia = () => {
    const [isDesktop, setIsDesktop] = useState(matchMedia('(min-width:62em)').matches);

    useEffect(() => {
        const handleResize = () => {
            //switch to true/false if the screen width match the indicated value
            setIsDesktop(matchMedia('(min-width:62em)').matches);
        };
        window.addEventListener('resize', handleResize);
        return () => {// Cleanup the event listener on component unmount
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return isDesktop;
};
export default useMatchMedia;