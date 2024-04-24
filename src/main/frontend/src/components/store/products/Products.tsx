import { Button, Checkbox, Flex, Text, Input, InputGroup, InputRightElement, Stack, useColorModeValue, Divider } from '@chakra-ui/react';
import classes from './products.module.css';
import { IoIosSearch as SearchIcon } from "react-icons/io";
import { useEffect, useRef } from 'react';
const categories:string[]=["wires","connectors","boards","chipsets"];
const productsType:string[]=["Choice sameple with name 1","Choice sameple with name 1","Choice sameple with name 1","Choice sameple with name 1"]

const Products = () => {
    const buttonBrands = useColorModeValue('gray.600','gray.400');
    
    return ( 
        <div className={classes.container}>
            <Flex direction={'column'} mt={10}>{/* replace margin top by align-items:center */}
                <Text mb={2} fontSize='lg'>Categories: </Text>
                <Stack mb={3}>
                    <Checkbox>All products</Checkbox>
                    {categories.map((category, i) => (
                        <Checkbox key={i} value={category}>{category}</Checkbox>
                    ))}
                </Stack>
                <Divider/>
                <Text mt={2} mb={2} fontSize='lg'>Type: </Text>

                {/* Product names */}

            </Flex>

            <div style={{paddingLeft:20}}>
                <InputGroup maxWidth={'60%'} mt={5} mb={5}>
                    <Input type='text' placeholder='Search Product' />
                    <InputRightElement  >
                        <SearchIcon className={classes['search-icon']} />
                    </InputRightElement>
                </InputGroup>

                <section>
                        products list
                </section>
            </div>
        </div>
     );
}
 
export default Products;