import { Button, Checkbox, Flex, Text, Input, InputGroup, InputRightElement, Stack, useColorModeValue, Divider } from '@chakra-ui/react';
import classes from './catalog.module.css';
import { IoIosSearch as SearchIcon } from "react-icons/io";
import CatalogFilter from './CatalogFilter';
import ProductsGrid from './ProductsGrid';
import { useState } from 'react';


const Catalog = () => {
    const buttonBrands = useColorModeValue('gray.600','gray.400');
    const [sector,setSector]=useState<string>("");
    const [selectedCategories, setSelectedCategories]=useState<string[]>([]);
    const [selectedTypes, setSelectedTypes]=useState<string[]>([]);
    
    return ( 
        <div className={classes.container}>
            <CatalogFilter sector={sector}
                           setSelectedCategories={setSelectedCategories}
                           setSelectedTypes={setSelectedTypes}/>

            <div className={classes['right-container']}>
                <InputGroup maxWidth={'60%'} mb={5}>
                    <Input type='text' placeholder='Search Product' />
                    <InputRightElement  >
                        <SearchIcon className={classes['search-icon']} />
                    </InputRightElement>
                </InputGroup>

                <section>
                    <ProductsGrid setSector={setSector}
                                  selectedCategories={selectedCategories}
                                  selectedTypes={selectedTypes}/>
                </section>
            </div>
        </div>
     );
}
 
export default Catalog;