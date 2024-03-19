import { Heading, FormLabel, Input, Button, Menu, MenuButton,
     MenuList, MenuGroup, MenuItem, Checkbox, Grid, Tag, ColorMode } from "@chakra-ui/react";
import { FiChevronDown as ChevronDownIcon } from "react-icons/fi";
import { RiDeleteBinFill as DeleteIcon } from "react-icons/ri";
import classes from "./add-product.module.css";
import { ChangeEvent, useEffect, useState } from "react";

const categoriesSample:{name:string}[]=[
    {name:'Electronics'},
    {name:'Installation'},
    {name:'Connectors'},
    {name:'Wires'},
    {name:'Capacitors'},
];
type CategoryList={names:string[]}
type CategoriesProps= {
    colorMode: ColorMode
    setProduct: React.Dispatch<React.SetStateAction<Product>>;
}
const SelectCategories = ({ colorMode, setProduct }: CategoriesProps) => {

    const [categories, setCategories] = useState<CategoryList>({ names: [] });

    const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        console.log(`${value} is ${checked}`);
        setCategories((prev) => {
            if (checked) return { names: [...prev.names, value] };
            else return { names: prev.names.filter((category) => category !== value) };
        });
    };
    useEffect(() => {
        /* update the categories in the product object through re-rendering this component */
        setProduct(prevProduct => {
            const categoryList = categories.names.map(category => ({ name: category }));
            return ({ ...prevProduct, categories: categoryList });
        });
    }, [categories]);

    return (
        <section className={`${classes.categories} ${colorMode === 'light' ? classes.light : classes.dark}`}>
            <Heading as='h2' size='sm' marginRight={10}>Add category</Heading>
            <FormLabel mt={2}>Category name</FormLabel>
            <Input type='text' placeholder="Insert category" />
            <Button mt={2}>Add</Button>
            <Menu closeOnSelect={false}>
                <MenuButton mt={3} as={Button} color={'blue.300'} variant={'outline'}
                    rightIcon={<ChevronDownIcon />}>
                    Select existing categories
                </MenuButton>
                <MenuList>
                    <MenuGroup title='Categories'>
                        {categoriesSample.map((category, i) => (
                            <MenuItem key={i}>
                                <Checkbox value={category.name} marginRight={5}
                                    onChange={(e) => handleCheckbox(e)}>
                                    {category.name}
                                </Checkbox>
                                <DeleteIcon color="red" onClick={() => console.log("deleted")} />
                            </MenuItem>
                        ))}
                    </MenuGroup>
                </MenuList>
            </Menu>
            <Grid mt={2} templateColumns='repeat(3, 1fr)' gap={2}>
                {categories.names.map((item, i) => (
                    <Tag key={i}>{item}</Tag>
                ))}
            </Grid>
        </section>
    );
}
 
export default SelectCategories;