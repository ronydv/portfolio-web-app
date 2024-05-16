import { Card, Stack, CardBody, Heading, Image, Text, CardFooter, Button, Tag, Badge } from "@chakra-ui/react";
type ProductCardProps={
    product: Product;
}
const ProductCard = ({product}:ProductCardProps) => {
    return (
        <Card direction={{ base: 'column', sm: 'row' }} p={3}
            overflow='hidden'
            variant='outline'>
            <Image objectFit='cover'
                maxW={{ base: '100%', sm: '200px' }}
                src={product.images?.[0]?.url}
                alt={product.name} />


            <Stack>
                <CardBody pb={1}>
                        <Heading size='md'>{product.name}</Heading>

                        <Text py='2'>
                            {'Caffè latte is a coffee beverage of Italian origin made with espresso and steamed milk.'}
                            {product.description}
                        </Text>
                        
                        <Badge variant='solid' colorScheme='red'>{product.productType}</Badge>
                        {/* set the categories inside a loop */}
                        {product.categories?.map((category,i)=>(
                            <span key={i}>
                                <span style={{color:'var(--chakra-colors-blue-300)', margin:'4px'}}>•</span>
                                {category.name}
                            </span>
                        ))}
                        <p/>
                        <Tag mt={1} colorScheme="green"> {product.images?.length} images</Tag>
                </CardBody>

                <CardFooter pt={1}>
                            <Button variant='solid' colorScheme='green' mr={4}>
                                View Details
                            </Button>
                            <Button >
                                Schedule service
                            </Button>
                </CardFooter>
            </Stack>
        </Card>
    );
};

export default ProductCard;