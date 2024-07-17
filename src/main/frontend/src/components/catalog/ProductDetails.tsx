import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSingleFetch } from "../../hooks/useSingleFetch";
import classes from './catalog.module.css';
import { Heading, useColorModeValue, Text, Box, Badge, Button, Divider, useToast } from "@chakra-ui/react";
import { useEffect, useRef, useState, useContext } from "react";
import { FaArrowLeft as LeftIcon } from "react-icons/fa6";
import { MdKeyboardDoubleArrowLeft as LeftArrow,MdOutlineKeyboardDoubleArrowRight as RightArrow } from "react-icons/md";
import { Carousel as MainImage } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import useMatchMedia from "../../hooks/useMatchMedia";
import CartContext from "../../context/CartProvider";
import { CartItemContext } from "../../context/CartProvider";

const thumbnails = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
        slidesToSlide: 4
    },
};
const ProductDetails = () => {
    const cartContext=useContext<CartItemContext | undefined>(CartContext);
    let items:Product[]=cartContext?.items!;
    const isDesktop = useMatchMedia();
    const notification = useToast();
    const { id } = useParams<string>();
    const { data: product, isLoading } = useSingleFetch<Product>(`/api/v1/product-management/products/${id}`);
    const darkMode = useColorModeValue('gray.600', 'gray.400');
    const carouselRef = useRef<Carousel>(null);
    const [imageIndex, setImageIndex] = useState<number>(0);
    const [count, setCount] = useState(0);
    let carouselDirection = '';
    
    const navigate = useNavigate();
    const location = useLocation();

    const handleGoBack = () => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.get('tab');
        searchParams.get('categories');
        searchParams.get('types');
        searchParams.get('page');
        searchParams.get('browse');
        navigate({
            pathname: '/catalog',
            search: searchParams.toString(),
        });
    }
    const arrowPrev = (clickHandler: () => void, hasPrev: boolean) => {
        return (
            <div className={`${classes['carousel-arrow']} ${classes.left} ${!hasPrev && classes.hidden}`}
                onClick={clickHandler} onKeyDown={(e) => { console.log(e.code); }}>
                <LeftArrow />
            </div>
        );
    };
    const arrowNext = (clickHandler: () => void, hasNext: boolean) => {
        return (
            <div className={`${classes['carousel-arrow']} ${classes.right} ${!hasNext && classes.hidden}`}
                onClick={clickHandler} onKeyDown={(e) => { console.log(e.code); }}>
                <RightArrow />
            </div>
        );
    };

    const addCartItems=(items:Product[], product:Product,cartContext: CartItemContext | undefined)=>{
        cartContext?.setItems([...items,product]);
    }

    const showToast=()=>{
        notification({
            title: 'Producto agregado al carrito.',
            description: isDesktop ? 
                        "Click en el icono del carrito de arriba a la derecha para confirmar." :
                        "Click en el icono del carrito en el panel de la izquierda para confirmar ",
            status: 'info',
            duration: 4000,
            isClosable: true,
        });
    }

    useEffect(() => {
        if (product?.images) {
            if (imageIndex > count) {
                setCount(imageIndex);
                carouselDirection = 'forward';
            }
            if (imageIndex <= count) {
                setCount(imageIndex);
                carouselDirection = 'backwards';
            }
            switch (carouselDirection) {
                case 'forward':
                    if (imageIndex >= (thumbnails.desktop.items - 1) && imageIndex < product.images.length - 2)
                         carouselRef.current?.goToSlide(count);
                    break;
                case 'backwards':
                    if (imageIndex > 1) carouselRef.current?.goToSlide(imageIndex - 2);
                    break;
            }
        }
    }, [imageIndex]);

    return (
        <div className={`${classes['product-details-container']} ${!isDesktop && classes.mobile}`}>
            <div className={`${classes.details} ${isDesktop && classes.desktop}`} >
                <Heading fontSize={'25px'} mb={3} color={darkMode}>{product?.name}</Heading>
                <Button leftIcon={<LeftIcon/>} variant={'outline'}
                        onClick={handleGoBack} colorScheme="blue" mb={2}>
                    Volver
                </Button>
                <Divider />
                <Box mb={2} mt={1}>
                    <Badge variant='solid' fontSize='15px' colorScheme='red'>{product?.productType}</Badge>
                    {/* set the categories inside a loop */}
                    {Array.isArray(product?.categories) && product?.categories?.map((category, i) => (
                        <Text key={i} fontSize={'lg'}>
                            <span style={{ color: 'var(--chakra-colors-blue-300)', margin: '4px' }}>•</span>
                            {category.name}
                        </Text>
                    ))}
                    <p />
                </Box>
                <Text as={'pre'} fontFamily={'sans-serif'} whiteSpace={'pre-wrap'}>
                    {product?.description && product.description}
                </Text>
                {isLoading && <Text fontSize={18}>Cargando...</Text>}
                {product?.images !== undefined && isDesktop &&
                    <Carousel responsive={thumbnails}
                        containerClass={`${classes.thumbnails} ${product.images.length < (thumbnails.desktop.items+1)
                                        && classes.width}`}
                        ref={carouselRef}>
                        {product.images.map((image, i) => {
                            return <img key={i} className={`${imageIndex === i && classes.selected}`}
                                src={image.url}
                                onClick={() => { setImageIndex(i); }} />;
                        })}
                    </Carousel>}

                <Button ml={1} mt={4}
                    onClick={() => {
                        addCartItems(items, product!, cartContext);
                        showToast();
                    }}>Agendar servicio</Button>
            </div>
            <div>
                {product?.images !== undefined &&
                    <MainImage selectedItem={imageIndex}
                        onChange={(index: number) => setImageIndex(index)}
                        showThumbs={false}
                        showStatus={false}
                        width={`${isDesktop ? '550px':''}`}
                        dynamicHeight={true}
                        renderArrowPrev={arrowPrev}
                        renderArrowNext={arrowNext}>
                        {product.images.map((image, i) => {
                            return (
                                <img className={classes['product-image']}
                                    key={i}
                                    src={image.url}
                                    alt={('image' + i)} />
                            );
                        })}
                    </MainImage>}
            </div>
        </div>
    );
};

export default ProductDetails;