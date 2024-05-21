import { useParams } from "react-router-dom";
import { useSingleFetch } from "../../hooks/useSingleFetch";
import classes from './catalog.module.css';
import { Heading, useColorModeValue, Text, Image, Box, Badge, Tag, Button, Divider, CardProps } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { MdKeyboardDoubleArrowLeft as LeftArrow,MdOutlineKeyboardDoubleArrowRight as RightArrow } from "react-icons/md";
import { Carousel as MainImage } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const images = [
    "https://res.cloudinary.com/dlm0bynvi/image/upload/v1/products/lu8s20vtbaxoabdoelbb",
    "https://res.cloudinary.com/dlm0bynvi/image/upload/v1/products/bgbsgyq5ddf9ni1bewje",
    "https://res.cloudinary.com/dlm0bynvi/image/upload/v1/products/d7cskjm6b22himamtpxs",
    "https://res.cloudinary.com/dlm0bynvi/image/upload/v1/products/lu8s20vtbaxoabdoelbb",
    "https://res.cloudinary.com/dlm0bynvi/image/upload/v1/products/bgbsgyq5ddf9ni1bewje",
    "https://res.cloudinary.com/dlm0bynvi/image/upload/v1/products/d7cskjm6b22himamtpxs",
    "https://res.cloudinary.com/dlm0bynvi/image/upload/v1/products/lu8s20vtbaxoabdoelbb",
    "https://res.cloudinary.com/dlm0bynvi/image/upload/v1/products/bgbsgyq5ddf9ni1bewje",
    "https://res.cloudinary.com/dlm0bynvi/image/upload/v1/products/d7cskjm6b22himamtpxs",
  ];
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide:4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide:3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide:2
    }
  };
const ProductDetails = () => {
    const { id } = useParams<string>();
    const { data: product } = useSingleFetch<Product>(`/api/v1/product-management/products/${id}`);
    const darkMode = useColorModeValue('gray.600', 'gray.400');
    const carouselRef = useRef<Carousel>(null);
    const [imageIndex, setImageIndex] = useState<number>(0);

    const arrowPrev =(clickHandler: () => void, hasPrev:boolean)=>{
        return (
            <div className={`${classes['carousel-arrow']} ${classes.left} ${!hasPrev && classes.hidden}`}
                 onClick={clickHandler} onKeyDown={(e)=>{console.log(e.code)}}>
                <LeftArrow/>
            </div>
        )
    }
    const arrowNext =(clickHandler: () => void, hasNext:boolean)=>{
        return (
            <div className={`${classes['carousel-arrow']} ${classes.right} ${!hasNext && classes.hidden}`} 
                 onClick={clickHandler} onKeyDown={(e)=>{console.log(e.code)}}>
                <RightArrow />
            </div>
        )
    }
    useEffect(()=>{
        if (imageIndex === 3){
            carouselRef?.current?.goToSlide(2)
        };
    },[imageIndex])
    return ( 
        <div className={classes['product-details-container']}>
            <div className={classes.details} >
                <Heading fontSize={'25px'} mb={3} color={darkMode}>{product?.name}</Heading>
                <Divider/>
                <Box mb={2} mt={1}>
                    <Badge variant='solid' fontSize='15px' colorScheme='red'>{product?.productType}</Badge>
                    {/* set the categories inside a loop */}
                    {product?.categories?.map((category, i) => (
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

                <Carousel responsive={responsive} containerClass={classes.thumbnails} ref={carouselRef}>
                    {images.map((image, i)=>{
                            return <Image objectFit='cover' className={`${imageIndex===i && classes.selected}`} 
                                src={image}
                                onClick={() => { setImageIndex(i); } } />
                        })}
                </Carousel>

                <Button ml={1}>Schedule service</Button>
            </div>
            <div tabIndex={1}>
                <MainImage selectedItem={imageIndex} onChange={(index:number) => setImageIndex(index)}
                          showThumbs={false} showStatus={false} width={'550px'} dynamicHeight={true}
                          renderArrowPrev={arrowPrev} renderArrowNext={arrowNext}>
                    {images?.map((image, i) => {
                        return (
                            <img className={classes['product-image']}
                                key={i}
                                src={image}
                                alt={('image' + i)} />
                        );
                    })}
                </MainImage>
            </div>
        </div>
     );
}
 
export default ProductDetails;