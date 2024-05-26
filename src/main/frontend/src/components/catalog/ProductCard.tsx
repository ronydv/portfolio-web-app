import { Card, Stack, CardBody, Heading, Image, Text, CardFooter, Button, Tag, Badge, ButtonGroup, ColorMode, Box, useToast, Spacer } from "@chakra-ui/react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import useMatchMedia from "../../hooks/useMatchMedia";
import { useContext, useEffect } from "react";
import CartContext, { CartItemContext } from "../../context/CartProvider";

type ProductCardProps={
    product: Product;
    colorMode: ColorMode;
    tabIndex: number;
    categories: string[];
    types:string[]
}

const description =(product:Product): string | undefined =>{//shows just a certain amount of words in the card view
    if(product){
        return product.description && 
               product.description.length >= 87 ? product.description.slice(0, 87)+'...': product.description;
    }
}
const addCartItems=(items:Product[], product:Product,cartContext: CartItemContext | undefined)=>{
    cartContext?.setItem([...items,product]);
}
const handleNavigation = (id:number, navigate: NavigateFunction,
                          tabIndex:number, categories:string[], types:string[]) => {//todo: after being sure of this function, add the same to the navbar for the mobile version
    const searchParams = new URLSearchParams();
    const tab = tabIndex;
    const categoriesParam: string[] = categories
    const typesParam: string[] = types;
    searchParams.set('tab', tab.toString());
    searchParams.set('categories', JSON.stringify(categoriesParam));
    searchParams.set('types', JSON.stringify(typesParam));
    navigate({
        pathname: `/product-details/${id}`,
        search: searchParams.toString(),
    });
};
const DesktopVersionCard = ({ product, colorMode, tabIndex, categories, types }: ProductCardProps) => {
    const navigate = useNavigate();
    const cartContext=useContext<CartItemContext | undefined>(CartContext);
    let items:Product[]=cartContext?.item!;
    const notification = useToast();

    const showToast=()=>{
        notification({
            title: 'Product added.',
            description: "Click in the above icon from the right for confirmation.",
            status: 'info',
            duration: 4000,
            isClosable: true,
        });
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
                        {description(product)}
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
                    {/* <Link to={{pathname:`/product-details/${product?.id}`,search:`?tab=${tabIndex}`}}> */}
                        <Button onClick={()=>handleNavigation(product?.id!,navigate,tabIndex,categories, types)}
                                variant='solid' colorScheme='orange' mr={4}>
                            View Details
                        </Button>
                   {/*  </Link> */}
                    <Button onClick={()=>{
                                addCartItems(items,product,cartContext);
                                showToast();
                        }}>
                        Schedule service
                    </Button>
                </CardFooter>
            </Stack>
        </Card>
    );
};
const MobileVersionCard = ({ product, colorMode, tabIndex, categories, types }: ProductCardProps) => {
    const cartContext=useContext<CartItemContext | undefined>(CartContext);
    let items:Product[]=cartContext?.item!;
    const notification = useToast();

    const showToast=()=>{
        notification({
            title: 'Product added.',
            description: "Click in the above icon from the right for confirmation.",
            status: 'info',
            duration: 4000,
            isClosable: true,
        });
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
                        {description(product)}
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
                <Link to={{pathname:`/product-details/${product?.id}`,search:`?tab=${tabIndex}`}}>
                    <Button variant='solid' colorScheme='orange'>
                        View Details
                    </Button>
                </Link>
                <Spacer />
                <Button onClick={() => {
                    addCartItems(items, product, cartContext);
                    showToast();
                }}>
                    Schedule service
                </Button>
            </CardFooter>
        </Card>
    );
};
const ProductCard = ({ product,colorMode, tabIndex, categories,types }: ProductCardProps) => {
    const isDesktop = useMatchMedia();
    return (
        <>
            {isDesktop ? <DesktopVersionCard product={product} 
                                             colorMode={colorMode} 
                                             tabIndex={tabIndex}
                                             categories={categories}
                                             types={types} />

                       : <MobileVersionCard product={product}
                                            colorMode={colorMode}
                                            tabIndex={tabIndex}
                                            categories={categories}
                                            types={types}/>}
        </>
    );
};

export default ProductCard;