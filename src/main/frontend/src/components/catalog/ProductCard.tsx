import { Card, Stack, CardBody, Heading, Image, Text, CardFooter, Button, Tag, Badge, ButtonGroup, ColorMode, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useMatchMedia from "../../hooks/useMatchMedia";

type ProductCardProps={
    product: Product;
    colorMode: ColorMode;
}
const DesktopVersionCard = ({ product,colorMode }: ProductCardProps) => {
    const description =(): string | undefined =>{
        if(product){
            return product.description && 
                   product.description.length >= 87 ? product.description.slice(0, 87)+'...': product.description;
        }
    }
    return (
        <Card direction={{ base: 'column', sm: 'row' }} p={3} /* maxWidth={'70vw'} */
            overflow='hidden'
            variant={colorMode==='light'?'elevated':'elevatedDark'}>
            <Image objectFit='cover'
                maxW={{ base: '100%', sm: '200px' }}
                src={product.images?.[0]?.url}
                alt={product.name} />

            <Stack>
                <CardBody pb={1}>
                    <Heading size='md'>{product.name}</Heading>

                    <Text py='2'>
                        {description()}
                    </Text>

                    <Badge variant='solid' colorScheme='red'>{product.productType}</Badge>
                    {/* set the categories inside a loop */}
                    {product.categories?.map((category, i) => (
                        <span key={i}>
                            <span style={{ color: 'var(--chakra-colors-blue-300)', margin: '4px' }}>•</span>
                            {category.name}
                        </span>
                    ))}
                    <p />
                    <Tag mt={1} colorScheme="orange"> {product.images?.length} images</Tag>
                </CardBody>

                <CardFooter pt={1}>
                    <Link to={`/product-details/${product?.id}`}>
                        <Button variant='solid' colorScheme='orange' mr={4}>
                            View Details
                        </Button>
                    </Link>
                    <Button >
                        Schedule service
                    </Button>
                </CardFooter>
            </Stack>
        </Card>
    );
};
const MobileVersionCard = ({ product,colorMode }: ProductCardProps) => {
    const description =(): string | undefined =>{
        if(product){
            return product.description && 
                   product.description.length >= 87 ? product.description.slice(0, 87)+'...': product.description;
        }
    }
    return (
        <Card maxW='sm' variant={colorMode === 'light' ? 'elevated' : 'elevatedDark'}>
            <CardBody pb={2}>
                <Image objectFit='cover'
                    borderRadius='lg'
                    src={product.images?.[0]?.url}
                    alt={product.name} />

                <Stack mt='6' spacing='2'>
                    <Heading size='md'>{product.name}</Heading>
                    <Text>
                        {description()}
                    </Text>
                    <Box>
                        <Badge variant='solid' colorScheme='red'>{product.productType}</Badge>
                        {/* set the categories inside a loop */}
                        {product.categories?.map((category, i) => (
                            <span key={i}>
                                <span style={{ color: 'var(--chakra-colors-blue-300)', margin: '4px' }}>•</span>
                                {category.name}
                            </span>
                        ))}
                        <p />
                        <Tag mt={1} colorScheme="orange"> {product.images?.length} images</Tag>
                    </Box>
                </Stack>
            </CardBody>
            <CardFooter pt={1}>
                <ButtonGroup spacing='2'>
                    <Link to={`/product-details/${product?.id}`}>
                        <Button variant='solid' colorScheme='orange' mr={4}>
                            View Details
                        </Button>
                    </Link>
                    <Button >
                        Schedule service
                    </Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
    );
};
const ProductCard = ({ product,colorMode }: ProductCardProps) => {
    const isDesktop = useMatchMedia();
    return (
        <>
            {isDesktop ? <DesktopVersionCard product={product} colorMode={colorMode} />
                       : <MobileVersionCard product={product} colorMode={colorMode}/>}
        </>
    );
};

export default ProductCard;