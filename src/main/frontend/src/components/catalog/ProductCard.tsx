import { Card, Stack, CardBody, Heading, Image, Text, CardFooter, Button, Tag, Badge,
         ColorMode, Box, useToast, Spacer } from "@chakra-ui/react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import useMatchMedia from "../../hooks/useMatchMedia";
import { useContext } from "react";
import CartContext, { CartItemContext } from "../../context/CartProvider";

type ProductCardProps={
    product: Product;
    colorMode: ColorMode;
    tabIndex: number;
    categories: string[];
    types:string[];
    page:number;
    browse:string
}

const description =(product:Product): string | undefined =>{//shows just a certain amount of words in the card view
    if(product){
        return product.description && 
               product.description.length >= 87 ? product.description.slice(0, 87)+'...': product.description;
    }
}
const addCartItems=(items:Product[], product:Product,cartContext: CartItemContext | undefined)=>{
    cartContext?.setItems([...items,product]);
}
const handleNavigation = (id:number, navigate: NavigateFunction, tabIndex:number,
                         categories:string[], types:string[], page:number,browse:string) => {
    const searchParams = new URLSearchParams();
    searchParams.set('tab', tabIndex.toString());
    searchParams.set('categories', JSON.stringify(categories));
    searchParams.set('types', JSON.stringify(types));
    searchParams.set('page', page.toString());
    searchParams.set('browse', browse);
    navigate({
        pathname: `/product-details/${id}`,
        search: searchParams.toString(),
    });
};
const DesktopVersionCard = ({ product, colorMode, tabIndex, categories, types, page, browse }: ProductCardProps) => {
    const navigate = useNavigate();
    const isDesktop = useMatchMedia();
    const cartContext=useContext<CartItemContext | undefined>(CartContext);
    let items:Product[]=cartContext?.items!;
    const notification = useToast();

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
                    <Tag mt={1} colorScheme="orange"> {product.images?.length} imágenes</Tag>
                </CardBody>

                <CardFooter pt={1}>
                    {/* <Link to={{pathname:`/product-details/${product?.id}`,search:`?tab=${tabIndex}`}}> */}
                        <Button onClick={()=>handleNavigation(product?.id!,navigate,tabIndex,categories, types, page, browse)}
                                variant='solid' colorScheme='orange' mr={4}>
                            Ver Detalles
                        </Button>
                   {/*  </Link> */}
                    <Button onClick={()=>{
                                addCartItems(items,product,cartContext);
                                showToast();
                        }}>
                        Agendar servicio
                    </Button>
                </CardFooter>
            </Stack>
        </Card>
    );
};
const MobileVersionCard = ({ product, colorMode, tabIndex, categories, types, page, browse }: ProductCardProps) => {
    const navigate = useNavigate();
    const isDesktop = useMatchMedia();
    const cartContext=useContext<CartItemContext | undefined>(CartContext);
    let items:Product[]=cartContext?.items!;
    const notification = useToast();

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
    return (
        <Card maxW='sm' variant={colorMode === 'light' ? 'elevated' : 'elevatedDark'}>
            <CardBody pb={2}>
                <Image objectFit='cover'
                    borderRadius='lg'
                    src={product.images?.[0]?.url}
                    alt={product.name} />

                <Stack mt='6' spacing='2'>
                    <Heading size='md'>{product.name}</Heading>
                    <Text wordBreak={"break-all"}>
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
                        <Tag mt={1} colorScheme="orange"> {product.images?.length} imágenes</Tag>
                    </Box>
                </Stack>
            </CardBody>
            <CardFooter pt={1}>
                {/* <Link to={{pathname:`/product-details/${product?.id}`,search:`?tab=${tabIndex}`}}> */}
                <Button onClick={()=>handleNavigation(product?.id!,navigate,tabIndex,categories, types, page, browse)}
                        variant='solid' colorScheme='orange'>
                    Ver Detalles
                </Button>
                <Spacer />
                <Button onClick={() => {
                    addCartItems(items, product, cartContext);
                    showToast();
                }}>
                    Agendar servicio
                </Button>
            </CardFooter>
        </Card>
    );
};
const ProductCard = ({ product, colorMode, tabIndex, categories,types, page, browse }: ProductCardProps) => {
    const isDesktop = useMatchMedia();
    return (
        <>
            {isDesktop ? <DesktopVersionCard product={product} 
                                             colorMode={colorMode} 
                                             tabIndex={tabIndex}
                                             categories={categories}
                                             types={types}
                                             page={page}
                                             browse={browse} />

                       : <MobileVersionCard product={product}
                                            colorMode={colorMode}
                                            tabIndex={tabIndex}
                                            categories={categories}
                                            types={types}
                                            page={page}
                                            browse={browse}/>}
        </>
    );
};

export default ProductCard;