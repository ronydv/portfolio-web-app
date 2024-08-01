import { Button, Text, Image, useColorModeValue, Flex, Box, Card, CardBody, CardFooter, CardHeader, Heading, useColorMode } from '@chakra-ui/react';
import { MdOutlineArrowOutward as Outward } from "react-icons/md";
import MainCover from '../../assets/mainCover.jpg'
import automationImage from '../../assets/automation.jpeg';
import machineryImage from '../../assets/machinery.jpeg';
import designImage from '../../assets/design.jpeg';
import classes from './home.module.css';
import { Link, useNavigate } from 'react-router-dom';
import useMatchMedia from '../../hooks/useMatchMedia';
type Service={
    title:string;
    image:string;
    description:string;
}
/* const services:Service[]=[
    {title:'****',
        image:'https://res.cloudinary.com/dlm0bynvi/image/upload/v1721395574/index/nuedkerapilgdhnyqbh6.jpg',
        description:'-----------------------------------'},

    {title:'****',
        image:'https://res.cloudinary.com/dlm0bynvi/image/upload/v1721395572/index/v65j7imimx5ojmuyrjgh.jpg',
        description:'------------------------------------'},

    {title:'****',
        image:'https://res.cloudinary.com/dlm0bynvi/image/upload/v1721395572/index/rswfcycqqjf4ypgrzybq.jpg',
        description:'-----'}
]; */
const Home = () => {
    const grayColor = useColorModeValue('gray.600','gray.400');
    const { colorMode } = useColorMode();
    const isDesktop=useMatchMedia();
    const navigate = useNavigate();
    
    return ( 
        <div style={{paddingTop: '5vh'}}>
            <section className={classes['call-to-actions']}>
                <div className={`${classes.cover} ${!isDesktop && classes.mobile}`}>
                    <Flex direction={'column'}>
                        <span className={`${classes.title} ${!isDesktop && classes.mobile}`}>
                            Title or description about the web app
                        </span>
                        <Text mt={3} fontSize={isDesktop ? 18 : 15} pr={isDesktop ? 20 : 0} color={grayColor} fontWeight={'600'}>
                            Brief explanatory intro for the app content
                        </Text>
                        {isDesktop ? 
                            <Box mt={7}>
                                <Button variant={'outline'} colorScheme='teal'
                                    rightIcon={<Outward />} onClick={() => navigate("/catalog")}>
                                    Explore
                                </Button>
                            </Box> :
                            <Button variant={'outline'} colorScheme='teal' mt={7} mb={5}
                                    rightIcon={<Outward />} onClick={() => navigate("/catalog")}>
                                    Explore
                            </Button>
                        }
                    </Flex>
                    <Image objectFit='cover' borderRadius={isDesktop ? '0 8px 8px 0' : 8}
                        clipPath={isDesktop ? 'polygon(10% 0%, 100% 0%, 100% 100%, 0% 100%)' : ''}
                        boxSize={isDesktop ? '35vw' : ''}
                        /* src={MainCover} */
                        src={'https://res.cloudinary.com/dlm0bynvi/image/upload/v1722476212/cover-demo-app.webp'}
                        alt={'main-cover'} />
                </div>
            </section>

{/*             <section className={classes.about}>
                <div className={`${classes.cards} ${!isDesktop && classes.mobile}`}>
                    {services.map((service, i) => {
                        return (
                            <Card backgroundColor={`${colorMode==='light'? 'var(--chakra-colors-gray-50)':
                                                                         'transparent'}`}
                                    key={i} align='center' size='sm' maxW={260}>
                                <CardHeader pb={'1px'}>
                                    <Heading size='md' color={grayColor}>{service.title}</Heading>
                                </CardHeader>
                                <CardBody>
                                    <Image objectFit='cover'
                                        borderRadius={5}
                                        boxSize={isDesktop ? '18vw' : ''}
                                        src={service.image}
                                        alt={'image' + service.title} />
                                    <Text pt={2}>{service.description}</Text>
                                </CardBody>
                            </Card>
                        );
                    })}
                </div>
            </section> */}
        </div>
     );
}
 
export default Home;