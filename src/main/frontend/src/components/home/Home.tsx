import { Button, Text, Image, useColorModeValue, Flex, Box, Card, CardBody, CardFooter, CardHeader, Heading, useColorMode } from '@chakra-ui/react';
import { MdOutlineArrowOutward as Outward } from "react-icons/md";
import MainCover from '../../assets/mainCover.jpg'
import automationImage from '../../assets/automation.jpeg';
import machineryImage from '../../assets/machinery.jpeg';
import designImage from '../../assets/design.jpeg';
import classes from './home.module.css';
import { Link } from 'react-router-dom';
type Service={
    title:string;
    image:string;
    description:string;
}
const services:Service[]=[
    {title:'Diseños',
        image:designImage,
        description:'Diseños de plantas y equipos industriales enfocados a la agroindustria'},

    {title:'Maquinarias',
        image:machineryImage,
        description:'Manufactura e instalación de las maquinarias diseñadas'},

    {title:'Automatizaciones',
        image:automationImage,
        description:'Servicios de Automatización para equipos industriales'}
];
const Home = () => {
    const grayColor = useColorModeValue('gray.600','gray.400');
    const { colorMode } = useColorMode();
    
    return ( 
        <div style={{paddingTop: '5vh'}}>
            <section className={classes['call-to-actions']}>
                <div className={classes.cover}>
                    <Flex direction={'column'}>
                        <span className={classes.title}>
                            Diseño y manufactura de equipos industriales
                        </span>
                        <Text mt={3} fontSize={18} pr={20} color={grayColor} fontWeight={'600'}>
                            Pida un producto o servicio específico a medida o 
                            explore los más de 200 productos y servicios que tenemos a disposición.
                        </Text>
                        <Box mt={7}>
                            <Link to={'/catalog'}>
                                <Button variant={'outline'} colorScheme='red'
                                        rightIcon={<Outward/>}>
                                    Explorar
                                </Button>
                            </Link>
                        </Box>
                    </Flex>
                    <Image objectFit='cover'
                        clipPath={'polygon(10% 0%, 100% 0%, 100% 100%, 0% 100%)'}
                        boxSize={'35vw'}
                        src={MainCover}
                        alt={'main-cover'} />
                </div>
            </section>

            <section className={classes.about}>
                <div className={classes.cards}>
                    {services.map((service, i) => {
                        return (
                            <Card backgroundColor={`${colorMode==='light'? 'var(--chakra-colors-gray-50)':
                                                                         'transparent'}`}
                                    key={i} align='center' size='sm' maxW={300}>
                                <CardHeader pb={'1px'}>
                                    {/* <h1 className={classes.title}>{service.title}</h1> */}
                                    <Heading size='md' color={grayColor}>{service.title}</Heading>
                                </CardHeader>
                                <CardBody>
                                    <Image objectFit='cover'
                                        borderRadius={5}
                                        boxSize={'18vw'}
                                        src={service.image}
                                        alt={'image' + service.title} />
                                    <Text pt={2}>{service.description}</Text>
                                </CardBody>
                            </Card>
                        );
                    })}
                </div>
            </section>
        </div>
     );
}
 
export default Home;
/*'linear(to-t, #e53e3e, #941414)'*/