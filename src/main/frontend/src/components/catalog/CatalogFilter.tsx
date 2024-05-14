import { Stack, Checkbox, Divider, Text, useColorMode, Flex } from '@chakra-ui/react';
import classes from './catalog.module.css';
import { useFetch } from '../../hooks/useFetch';
import { ChangeEvent, useEffect, useState } from 'react';

type CatalogFilterProps={
    sector: string;
    selectedCategories: string[];
    selectedTypes: string[];
    setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
    setSelectedTypes: React.Dispatch<React.SetStateAction<string[]>>;
}
//componnet to get categories and product types by sector
const CatalogFilter = ({sector, selectedCategories, selectedTypes, setSelectedCategories, setSelectedTypes}:CatalogFilterProps) => {
    const { colorMode } = useColorMode();
    const [categoryUrl, setCategoryUrl]=useState<string>("");
    const [typeUrl, setTypeUrl]=useState<string>("");
    const {data:categories}=useFetch<Category>(categoryUrl);
    const {data:types}=useFetch<Type>(typeUrl);
    const isCategorySelected = (category: string):boolean => selectedCategories?.includes(category);
    const isTypeSelected = (type: string):boolean => selectedTypes?.includes(type);


    useEffect(()=>{//set url with sector everytime the sector state is modified in ProductGrid.tsx
        setCategoryUrl(`/api/v1/product-management/categories/${sector}`);
        setTypeUrl(`/api/v1/product-management/types/${sector}`);
    },[sector,categoryUrl,typeUrl]);

    const handleCategoriesCheckbox=(e: ChangeEvent<HTMLInputElement>)=>{
        const { value, checked } = e.target;
        setSelectedCategories((prev) => {
            if(checked) return [...prev, value];
            else return prev.filter((category) => category !== value );
        });
    }
    const handleTypesCheckbox=(e: ChangeEvent<HTMLInputElement>)=>{
        const { value, checked } = e.target;
        setSelectedTypes((prev) => {
            if(checked) return [...prev, value];
            else return prev.filter((type) => type !== value );
        });
    }
    
    return (
        
        <div className={`${classes.filter} ${colorMode === 'light' ? classes.light : classes.dark}`}>
            {/* categories sector */}
            <Flex direction={'row'}>
                <div className={classes['filter-title-border']} />
                <Text fontSize='lg'>Categories: </Text>
            </Flex>
            <Stack mb={3} paddingLeft={5}>
                {categories.map((category, i) => (
                    <Checkbox colorScheme='red'
                        key={i}
                        value={category.name}
                        isChecked={isCategorySelected(category?.name!)}//false if the setSelectedCategories is set to empty in the useEffect of ProductGrid.tsx
                        onChange={(e) => handleCategoriesCheckbox(e)}>{category.name}
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
                    <Checkbox colorScheme='red'
                        key={i}
                        value={type.productType}
                        isChecked={isTypeSelected(type?.productType!)}
                        onChange={(e) => handleTypesCheckbox(e)}
                    >{type.productType}
                    </Checkbox>
                ))}
            </Stack>

        </div>
    );
}
 
export default CatalogFilter;