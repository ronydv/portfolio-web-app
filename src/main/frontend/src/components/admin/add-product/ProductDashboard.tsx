import { Button, Checkbox, CheckboxGroup, Flex, FormLabel, Grid, Heading, Icon, Input, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, NumberInput, NumberInputField, Radio, RadioGroup, Select, Spacer, Tag, Textarea, useColorMode, useColorModeValue } from "@chakra-ui/react";
import classes from "./add-product.module.css";
import { FiChevronDown as ChevronDownIcon } from "react-icons/fi";
import { RiDeleteBinFill as DeleteIcon } from "react-icons/ri";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { parse } from "path";
import Pricing from "./Pricing";
import SelectCategories from "./SelectCategories";

const ProductDashboard = () => {
    const { colorMode } = useColorMode();
    const [product, setProduct]= useState<Product>({});
    
    const handleSubmit = async (event:FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        /* console.log("categories: ",categories); */
        console.log("product: ",product);
    }
    
    return (
        <div >
            <form onSubmit={handleSubmit}> 
                <section className={`${classes.title} ${colorMode === 'light' ? classes.light : classes.dark}`}>
                    <Heading as='h2' size='md' marginRight={10}>Add product</Heading>
                    <Spacer />
                    <Button variant='outline' color={'blue.300'} marginRight={5}>Go back</Button>
                    <Button type="submit">Add Product</Button>
                </section>

                <div className={classes['inputs-container']}>
                    <div>
                        <section className={`${classes['general-information']} ${colorMode === 'light' ? classes.light : classes.dark}`}>
                            <Heading as='h2' size='sm' marginRight={10}>General information</Heading>
                            <FormLabel mt={2}>Brand</FormLabel>
                            <Input type='text' onChange={(e) => setProduct({...product,brand:e.target.value})} />

                            <FormLabel mt={2}>Product Name</FormLabel>
                            <Input type='text' onChange={(e) => setProduct({...product,name:e.target.value})} />

                            <FormLabel mt={2}>Quantity</FormLabel>
                            <NumberInput defaultValue={0} onChange={(e) => setProduct({...product,quantity:parseInt(e)})}>
                                <NumberInputField />
                            </NumberInput>

                            <FormLabel mt={2}>Description</FormLabel>
                            <Textarea onChange={(e) => setProduct({...product,description:e.target.value})} />
                        </section>
                        <Pricing product={product} setProduct={setProduct} colorMode={colorMode}/>
                    </div>

                    <div>
                        <SelectCategories colorMode={colorMode} setProduct={setProduct}/>
                    </div>

                </div>
            </form>
        </div>
    );
}
 
export default ProductDashboard;