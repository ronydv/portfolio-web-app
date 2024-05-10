import { Stack, Checkbox, Divider, Text, useColorMode, Flex } from '@chakra-ui/react';
import classes from './catalog.module.css';
import { useFetch } from '../../hooks/useFetch';
import { useEffect, useState } from 'react';

type CatalogFilterProps={
    sector: string;
}
const CatalogFilter = ({sector}:CatalogFilterProps) => {//componnet to get categories and product types by sector
    const { colorMode } = useColorMode();
    const [categoryUrl, setCategoryUrl]=useState<string>("");
    const [typeUrl, setTypeUrl]=useState<string>("");
    const {data:categories}=useFetch<Category>(categoryUrl);
    const {data:types}=useFetch<Type>(typeUrl);

    useEffect(()=>{//set url with sector everytime the sector state is modified in ProductGrid.tsx
        setCategoryUrl(`/api/v1/product-management/categories/${sector}`);
        setTypeUrl(`/api/v1/product-management/types/${sector}`);
    },[sector,categoryUrl,typeUrl]);
    
    return (
        
        <div className={`${classes.filter} ${colorMode === 'light' ? classes.light : classes.dark}`}>
            {/* categories sector */}
            <Flex direction={'row'}>
                <div className={classes['filter-title-border']} />
                <Text fontSize='lg'>Categories: </Text>
            </Flex>
            <Stack mb={3} paddingLeft={5}>
                {categories.map((category, i) => (
                    <Checkbox
                        key={i}
                        value={category.name}
                        onChange={(e) => console.log(e.target.value)}>{category.name}
                    </Checkbox>
                ))}
            </Stack>

            {/* product type sector */}
            <Flex direction={'row'}>
                <div className={classes['filter-title-border']} />
                <Text fontSize='lg'>Types: </Text>
            </Flex>
            <Stack mb={3} paddingLeft={5}>
                {types.map((type, i) => (
                    <Checkbox
                        key={i}
                        value={type.productType}
                        onChange={(e) => console.log(e.target.value)}
                    >{type.productType}
                    </Checkbox>
                ))}
            </Stack>

        </div>
    );
}
 
export default CatalogFilter;