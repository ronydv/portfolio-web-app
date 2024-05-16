import { Stack, Checkbox, Divider, Text, useColorMode, Flex, useColorModeValue } from '@chakra-ui/react';
import classes from './catalog.module.css';
import { useFetch } from '../../hooks/useFetch';
import { ChangeEvent, useEffect, useState } from 'react';

type CatalogFilterProps={
    sector: string;
    selectedCategories: string[];
    selectedTypes: string[];
    setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
    setSelectedTypes: React.Dispatch<React.SetStateAction<string[]>>;
    tabIndex:number;
    sectors: Sector[];
}
//componnet to get categories and product types by sector
const CatalogFilter = ({sector, selectedCategories, selectedTypes, setSelectedCategories, 
                        setSelectedTypes, tabIndex, sectors}:CatalogFilterProps) => {
    const colorGray = useColorModeValue('gray.600','gray.400');
    const { colorMode } = useColorMode();
    const [categoryUrl, setCategoryUrl]=useState<string>("");
    const [typeUrl, setTypeUrl]=useState<string>("");
    const {data:categories}=useFetch<Category>(categoryUrl);
    const {data:types}=useFetch<Type>(typeUrl);
    const isCategorySelected = (category: string):boolean => selectedCategories?.includes(category);
    const isTypeSelected = (type: string):boolean => selectedTypes?.includes(type);
    const [disableCheckbox, setDisableCheckbox]=useState<boolean>(false);

    useEffect(()=>{//set url with sector everytime the sector state is modified in ProductGrid.tsx
        setCategoryUrl(`/api/v1/product-management/categories/${sector}`);
        setTypeUrl(`/api/v1/product-management/types/${sector}`);
    },[sector,categoryUrl,typeUrl]);

    useEffect(()=>{//disable checkboxes whenever the tab for browse elements is opened
        sectors.length > 0 && tabIndex === (sectors.length) ? 
                setDisableCheckbox(true):setDisableCheckbox(false);
    },[tabIndex])

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
                
                <Text fontSize='lg' color={colorGray} pl={3} fontFamily={'sans-serif'} fontWeight={600}>Categories: </Text>
            </Flex>
            <Stack mb={3} paddingLeft={5}>
                {categories.map((category, i) => (
                    <Checkbox colorScheme='green'
                        key={i}
                        value={category.name}
                        isDisabled={disableCheckbox}
                        isChecked={isCategorySelected(category?.name!)}//false if the setSelectedCategories is set to empty in the useEffect of ProductGrid.tsx
                        onChange={(e) => handleCategoriesCheckbox(e)}>{category.name}
                    </Checkbox>
                ))}
            </Stack>

            {/* product type sector */}
            <Flex direction={'row'}>
                {/* <div className={classes['filter-title-border']} /> */}
                <Text fontSize='lg' color={colorGray} pl={3} fontFamily={'sans-serif'} fontWeight={600}>Types: </Text>
            </Flex>
            <Stack mb={3} paddingLeft={5}>
                {types.map((type, i) => (
                    <Checkbox colorScheme='green'
                        key={i}
                        value={type.productType}
                        isDisabled={disableCheckbox}
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