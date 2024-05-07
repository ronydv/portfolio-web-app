import { Button, Checkbox, Flex, Text, Input, InputGroup, InputRightElement, Stack, useColorModeValue, Divider } from '@chakra-ui/react';
import classes from './catalog.module.css';
import { IoIosSearch as SearchIcon } from "react-icons/io";
import CatalogFilter from './CatalogFilter';


const Products = () => {
    const buttonBrands = useColorModeValue('gray.600','gray.400');
    
    return ( 
        <div className={classes.container}>
            <CatalogFilter/>

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