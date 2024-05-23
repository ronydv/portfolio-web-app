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
import useMatchMedia from "../../hooks/useMatchMedia";


const thumbnails = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
        slidesToSlide: 4
    },
};
const ProductDetails = () => {
    const isDesktop = useMatchMedia();
    const { id } = useParams<string>();
    const { data: product } = useSingleFetch<Product>(`/api/v1/product-management/products/${id}`);
    const darkMode = useColorModeValue('gray.600', 'gray.400');
    const carouselRef = useRef<Carousel>(null);
    const [imageIndex, setImageIndex] = useState<number>(0);
    const [count, setCount] = useState(0);
    let carouselDirection = '';

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
        console.log(carouselDirection);
    }, [imageIndex]);

    return (
        <div className={`${classes['product-details-container']} ${!isDesktop && classes.mobile}`}>
            <div className={`${classes.details} ${isDesktop && classes.desktop}`} >
                <Heading fontSize={'25px'} mb={3} color={darkMode}>{product?.name}</Heading>
                <Divider />
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

                <Button ml={1}>Schedule service</Button>
            </div>
            <div>
                {product?.images !== undefined &&
                    <MainImage selectedItem={imageIndex}
                        onChange={(index: number) => setImageIndex(index)}
                        showThumbs={false}
                        showStatus={false}
                        width={`${isDesktop && '550px'}`}
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