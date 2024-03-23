import { Button, Text, FormControl, FormLabel, Heading, Input, NumberInput, NumberInputField, Spacer, Textarea, useColorMode, Flex, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { FaArrowLeft as LeftIcon } from "react-icons/fa6";
import { FaChevronRight as ChevronRightIcon } from "react-icons/fa6";
import classes from "./products-panel.module.css";
import { FormEvent, useState } from "react";
import Pricing from "./Pricing";
import SelectCategories from "./SelectCategories";
import axios from "axios";
import useInterceptor from "../../../hooks/useInterceptor";
import { Link, useLocation, useNavigate } from "react-router-dom";

const AddProduct = () => {
    const axiosPrivate = useInterceptor();
    const navigate = useNavigate();
    const { colorMode } = useColorMode();
    const [error, setError]=useState<string>(" ");
    const [product, setProduct]= useState<Product>({});
    
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("product: ", product);
        try {
            const response = await axiosPrivate.post<Category>("/api/v1/product-management/product",
                product, {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
            });
            console.log(response.data);
        } catch (err) {
            if (axios.isAxiosError(err)){
                setError(err.response?.data.message);
                console.log(error);
            }
        }
    }
    
    return (
        <div >
            <form onSubmit={handleSubmit}> 
                <section className={`${classes.title} ${colorMode === 'light' ? classes.light : classes.dark}`}>
                    <Flex direction={'column'}>
                        <Heading as='h2' size='md' marginRight={10}>Add product</Heading>
                        <Breadcrumb spacing='8px' separator={<ChevronRightIcon color='gray.500' />}>
                            <BreadcrumbItem>
                                <p>Products</p>
                            </BreadcrumbItem>

                            <BreadcrumbItem isCurrentPage>
                                <p >Add Product</p>
                            </BreadcrumbItem>
                        </Breadcrumb>
                    </Flex>
                    <Spacer />
                        <Button variant='outline' color={'blue.300'} marginRight={5}
                            leftIcon={<LeftIcon/>}
                             onClick={()=>navigate("/dashboard/products-dashboard")}>
                                Go back
                        </Button>
                    <Button type="submit">Add Product</Button>
                </section>

                <div className={classes['inputs-container']}>
                    <div>
                        <section className={`${classes['general-information']} ${colorMode === 'light' ? classes.light : classes.dark}`}>
                            <Heading as='h2' size='sm' marginRight={10}>General information</Heading>

                            <FormControl as='fieldset' isInvalid={error.includes('Product.brand')}>
                                <FormLabel mt={2}>
                                    {error.includes('Product.brand') || product.brand===""
                                                                     ? <Text color={'red'}>{'Empty Field'}</Text>
                                                                     : 'Brand'}
                                </FormLabel>
                                <Input type='text' onChange={(e) => {
                                                        setProduct({ ...product, brand: e.target.value });
                                                        setError("");
                                }} />
                            </FormControl>

                            <FormLabel mt={2}>Product Name</FormLabel>
                            <Input type='text' onChange={(e) => setProduct({...product,name:e.target.value})} />

                            <FormLabel mt={2}>Quantity</FormLabel>
                            <NumberInput defaultValue={0} onChange={(e) => setProduct({...product,quantity:parseInt(e)})}>
                                <NumberInputField />
                            </NumberInput>

                            <FormLabel mt={2}>Description</FormLabel>
                            <Textarea onChange={(e) => setProduct({...product,description:e.target.value})} />
                        </section>
                        <Pricing product={product} setProduct={setProduct} setError={setError}
                                 colorMode={colorMode} error={error}/>
                    </div>

                    <div>
                        <SelectCategories colorMode={colorMode} setProduct={setProduct}/>
                    </div>

                </div>
            </form>
        </div>
    );
}
 
export default AddProduct;