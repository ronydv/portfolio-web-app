import { Heading, FormLabel,Text, Input, Button, Checkbox, Grid, Tag, ColorMode, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Spacer, FormControl } from "@chakra-ui/react";
import { RiDeleteBinFill as DeleteIcon } from "react-icons/ri";
import classes from "./products-panel.module.css";
import { ChangeEvent, useEffect, useState } from "react";
import { useFetch } from "../../../hooks/useFetch";
import useInterceptor from "../../../hooks/useInterceptor";
import axios from "axios";


type CategoryList={names:string[]}
type CategoriesProps= {
    colorMode: ColorMode
    setProduct: React.Dispatch<React.SetStateAction<Product>>;
    product?:Product
}
const SelectCategories = ({ colorMode, setProduct, product }: CategoriesProps) => {
    const {data}=useFetch<Category>("/api/v1/product-management/categories");
    const axiosPrivate = useInterceptor();
    const [error, setError]=useState("");
    const [category, setCategory]= useState<Category>({});
    const [categories, setCategories] = useState<Category[]>([]);
    const [tags, setTags] = useState<CategoryList>({ names: [] });
    const [mount, setMount] = useState(false);
    const [renderTagsForModifyProduct, setRenderTagsForModifyProduct]=useState(false);
    const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setTags((prev) => {
            if (checked) return { names: [...prev.names, value] };
            else return { names: prev.names.filter((category) => category !== value) };
        });
    };

    const addCategory = async ()=>{
        try {              
            const response = await axiosPrivate.post<Category>("/api/v1/product-management/categories",
                category, {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
            });
            setCategories([...categories, response.data]);//add the new category to the list of categories for the accordion
        }catch(error){
            if(axios.isAxiosError(error)) setError(error.response?.data.message);
        }
    }
    const deleteCategory = async (category:Category)=>{
        try {              
            await axiosPrivate.delete<Category>(`/api/v1/product-management/categories/${category.id}`);
            setCategories(prevCategories => prevCategories.filter(c => c.id !== category.id));
        }catch(error){
            if(axios.isAxiosError(error)) setError(error.response?.data.message);
        }
    }

    useEffect(()=>{//when this component is mount from ModifyProduct, trigger this function for the last useEffect
        if(product?.categories?.length! > 0)setRenderTagsForModifyProduct(true);
    },[product])
    
    useEffect(() => {//render items in the accordion in the first component load
        setCategories(data);
        setMount(true);//used to trigger the last useEffect to render tags if this component is being used in ModifyProducts.tsx
    }, [data]);

    useEffect(() => {//update the categories in the product object through re-rendering this component
        setProduct(prevProduct => {
            const categoryList = tags.names.map(category => ({ name: category }));
            return ({ ...prevProduct, categories: categoryList });
        });
    }, [tags]);

    useEffect(()=>{//render tags if this component is being used in ModifyProducts.tsx
        if (product && product.categories) {
            setTags({ names: product.categories.map(category => category.name || '') });
        }
        setMount(false);
    },[mount,renderTagsForModifyProduct]);

    return (
        <section className={`${classes.categories} ${colorMode === 'light' ? classes.light : classes.dark}`}>
            <Heading as='h2' size='sm' marginRight={10}>Add Category</Heading>
            
            <FormControl as='fieldset' className={classes.form} isInvalid={error!==""}>
                <FormLabel mt={2}>{error ? <Text color={'red'}>{error}</Text>: 'Category Name'}</FormLabel>
                <Input type='text' placeholder="Insert category" onChange={(e) =>{
                            setCategory({ name: e.target.value })
                            setError("");
                }}/>
            </FormControl>
            <Button mt={2} onClick={addCategory}>Add</Button>

            <Accordion allowToggle={true} mt={3}>
                <AccordionItem>
                    <AccordionButton>
                        <Box as="span" flex='1' textAlign='left'>
                            Select categories
                        </Box><AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4} style={{ maxHeight: '200px', overflowY: 'auto' }}>
                        {tags.names.length > 0 && categories.map((category, i) => (
                            <div key={i} style={{ display: 'flex' }}>
                                <Checkbox value={category.name} colorScheme='red'
                                    //check the categories from the product props against categories from the accordion panel
                                    defaultChecked={tags.names.some(tagName => tagName === category.name)}
                                    onChange={(e) => handleCheckbox(e)}>
                                    {category.name}
                                </Checkbox>
                                <Spacer />
                                <DeleteIcon className={classes['action-icon']} color="red" onClick={() => deleteCategory(category)} />
                            </div>
                        ))}
                        {tags.names.length === 0 && categories.map((category, i) => (
                            <div key={i} style={{ display: 'flex' }}>
                                <Checkbox value={category.name} colorScheme='teal'
                                    onChange={(e) => handleCheckbox(e)}>
                                    {category.name}
                                </Checkbox>
                                <Spacer />
                                <DeleteIcon className={classes['action-icon']} color="red" onClick={() => deleteCategory(category)} />
                            </div>
                        ))}
                    </AccordionPanel>

                </AccordionItem>
            </Accordion>
            <Grid mt={2} templateColumns='repeat(3, 1fr)' gap={2}>
                {tags.names.length > 0 && tags.names.map((item, i) => (
                    <Tag key={i}>{item}</Tag>
                ))}
            </Grid>
        </section>
    );
}
 
export default SelectCategories;