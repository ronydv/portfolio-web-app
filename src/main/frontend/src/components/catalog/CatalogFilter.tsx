import { Stack, Checkbox, Divider, Text } from '@chakra-ui/react';
import classes from './catalog.module.css';
import { useFetch } from '../../hooks/useFetch';



const CatalogFilter = () => {
    const {data:types}=useFetch<Type>("/api/v1/product-management/types/designs");
    const {data:categories}=useFetch<Category>("/api/v1/product-management/categories/designs");
    return (
        <div className={classes.filter}>
            {/* categories sector */}
            <Text mb={2} fontSize='lg'>Categories: </Text>
            <Stack mb={3}>
                <Checkbox>All products</Checkbox>
                {categories.map((category, i) => (
                    <Checkbox key={i} value={category.name}>{category.name}</Checkbox>
                ))}
            </Stack>

            <Divider />
            {/* product type sector */}
            <Text mt={2} mb={2} fontSize='lg'>Type: </Text>
            <Stack mb={3}>
                <Checkbox>All products</Checkbox>
                {types.map((type, i) => (
                    <Checkbox key={i} value={type.productType}>{type.productType}</Checkbox>
                ))}
            </Stack>

        </div>
    );
}
 
export default CatalogFilter;