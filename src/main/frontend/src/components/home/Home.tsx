import { Button, Text, Image } from '@chakra-ui/react';
import MainCover from '../../assets/mainCover.jpg'
import classes from './home.module.css';

const Home = () => {

    return ( 
        <div className={classes.main}>
            <section className={classes['call-to-actions']}>
                <div>
                    <Text fontSize='40px' fontWeight={'600'}>
                        Diseño, automatización y manufactura de equipos industriales
                    </Text>
                    <Image objectFit='cover'
                        boxSize={'35vw'}
                        src={MainCover}
                        alt={'main-cover'} />
                </div>
            </section>
        </div>
     );
}
 
export default Home;