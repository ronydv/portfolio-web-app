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

    useEffect(()=>{//render tags in the first component loading if this component is being used in ModifyProducts.tsx
        if (product && product.categories) {
            setTags({ names: product.categories.map(category => category.name || '') });
        }
        setMount(false);
        console.log(tags);
    },[mount]);

    return (
        <section className={`${classes.categories} ${colorMode === 'light' ? classes.light : classes.dark}`}>
            <Heading as='h2' size='sm' marginRight={10}>Agregar categoría</Heading>
            
            <FormControl as='fieldset' className={classes.form} isInvalid={error!==""}>
                <FormLabel mt={2}>{error ? <Text color={'red'}>{error}</Text>: 'Nombre de la Categoría'}</FormLabel>
                <Input type='text' placeholder="Insertar categoría" onChange={(e) =>{
                            setCategory({ name: e.target.value })
                            setError("");
                }}/>
            </FormControl>
            <Button mt={2} onClick={addCategory}>Agregar</Button>

            <Accordion allowToggle={true} mt={3}>
                <AccordionItem>
                    <AccordionButton>
                        <Box as="span" flex='1' textAlign='left'>
                            Seleccionar categorías
                        </Box><AccordionIcon />
                    </AccordionButton>

                    <AccordionPanel pb={4} style={{ maxHeight: '200px', overflowY: 'auto' }}>
                        {categories.map((category, i) => (
                            <div key={i} style={{ display: 'flex' }}>
                                <Checkbox value={category.name} colorScheme='red'
                                    //check the categories from the product props against categories from the accordion panel
                                    defaultChecked={ product?.categories ? product.categories.some(c => c.name === category.name) : false }
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