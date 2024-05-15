import { Card, Stack, CardBody, Heading, Image, Text, CardFooter, Button, Tag } from "@chakra-ui/react";

const ProductCard = () => {
    return (
        <Card direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'>
            <Image objectFit='cover'
                maxW={{ base: '100%', sm: '200px' }}
                src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                alt='Caffe Latte' />


            <Stack>
                <CardBody>
                        <Heading size='md'>The perfect latte</Heading>

                        <Text py='2'>
                            Caffè latte is a coffee beverage of Italian origin made with espresso
                            and steamed milk.
                        </Text>
                        <p>{'Type'}</p>
                        <span style={{color:'var(--chakra-colors-blue-300)', margin:'4px'}}>•</span>{'Cat-a'}
                        <span style={{color:'var(--chakra-colors-blue-300)',margin:'4px'}}>•</span>{'Cat-a'} 
                        <span style={{color:'var(--chakra-colors-blue-300)',margin:'4px'}}>•</span>{'Cat-a'}
                        <p/>
                        <Tag mt={1} colorScheme="blue"> 4 images</Tag>
                </CardBody>

                <CardFooter pt={1}>
                            <Button variant='solid' colorScheme='teal' mr={4}>
                                View Details
                            </Button>
                            <Button variant={'outline'} colorScheme='blue'>
                                schedule service
                            </Button>
                </CardFooter>
            </Stack>
        </Card>
    );
};

export default ProductCard;