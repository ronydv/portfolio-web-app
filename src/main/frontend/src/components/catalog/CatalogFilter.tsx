import { Stack, Checkbox, Divider, Text } from '@chakra-ui/react';
import classes from './catalog.module.css';

const categories:string[]=["cat a","cat b","cat c","cat d"];
const types:string[]=["type1","type2","type3","type4"];
const CatalogFilter = () => {
    return (
        <div className={classes.filter}>
            {/* categories sector */}
            <Text mb={2} fontSize='lg'>Categories: </Text>
            <Stack mb={3}>
                <Checkbox>All products</Checkbox>
                {categories.map((category, i) => (
                    <Checkbox key={i} value={category}>{category}</Checkbox>
                ))}
            </Stack>

            <Divider />
            {/* product type sector */}
            <Text mt={2} mb={2} fontSize='lg'>Type: </Text>
            <Stack mb={3}>
                <Checkbox>All products</Checkbox>
                {types.map((type, i) => (
                    <Checkbox key={i} value={type}>{type}</Checkbox>
                ))}
            </Stack>

        </div>
    );
}
 
export default CatalogFilter;