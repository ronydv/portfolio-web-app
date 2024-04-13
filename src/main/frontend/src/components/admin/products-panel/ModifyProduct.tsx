import { Breadcrumb, BreadcrumbItem, Button, Text, Flex, FormControl, FormLabel, Heading, Input, NumberInput, NumberInputField, Spacer, Textarea, useColorMode } from "@chakra-ui/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft as LeftIcon } from "react-icons/fa6";
import { MdOutlineChevronRight as ChevronRightIcon } from "react-icons/md";
import classes from "./products-panel.module.css";
import { useEffect, useState } from "react";
import { useSingleFetch } from "../../../hooks/useSingleFetch";
import Pricing from "./Pricing";
import SelectCategories from "./SelectCategories";
const ModifyProduct = () => {
    const { colorMode } = useColorMode();
    const { id } = useParams<string>();
    const navigate = useNavigate();
    const location = useLocation();
    const queryAction:string|null = new URLSearchParams(location.search).get('action');
    const { data } = useSingleFetch<Product>(`/api/v1/product-management/products/${id}`);
    const [product, setProduct]= useState<Product>({});
    const [error, setError]=useState<string>("");

    useEffect(() => { data && setProduct(data); },[data]);
    
    return ( 
        <div>
            {/* modify product with id {id} and action {queryAction} */}
            <div >
                <form>
                    <section className={`${classes.title} ${colorMode === 'light' ? classes.light : classes.dark}`}>
                        <Flex direction={'column'}>
                            <Heading as='h2' size='md' marginRight={10}>Modify product</Heading>
                            <Breadcrumb spacing='8px' separator={<ChevronRightIcon color='gray.500' />}>
                                <BreadcrumbItem>
                                    <p>Products</p>
                                </BreadcrumbItem>
                                <BreadcrumbItem>
                                    <p>Table</p>
                                </BreadcrumbItem>
                                <BreadcrumbItem isCurrentPage>
                                    <p >Edit Product</p>
                                </BreadcrumbItem>
                            </Breadcrumb>
                        </Flex>
                        <Spacer />
                        <Button variant='outline' color={'blue.300'} marginRight={5}
                            leftIcon={<LeftIcon />}
                            onClick={() => navigate("/dashboard/products-dashboard")}>
                            Go back
                        </Button>
                        <Button type="submit"
                            /* isLoading={isLoading} */
                            loadingText='Submitting'>
                            Save Changes
                        </Button>
                    </section>

                    <div className={classes['inputs-container']}>
                        <div>
                            <section className={`${classes['general-information']} ${colorMode === 'light' ? classes.light : classes.dark}`}>
                                <Heading as='h2' size='sm' marginRight={10}>General information</Heading>

                                <FormControl as='fieldset' isInvalid={error?.includes('Product.brand')}>
                                    <FormLabel mt={2}>
                                        {error?.includes('Product.brand') || product.brand === ""
                                            ? <Text color={'red'}>{'Empty Field'}</Text>
                                            : 'Brand'}
                                    </FormLabel>
                                    <Input defaultValue={product.brand} type='text' onChange={(e) => {
                                        setProduct({ ...product, brand: e.target.value });
                                        setError("");
                                    }} />
                                </FormControl>

                                <FormLabel mt={2}>Product Name</FormLabel>
                                <Input defaultValue={product.name} type='text' onChange={(e) => {
                                    setProduct({ ...product, name: e.target.value });
                                }} />

                                <FormLabel mt={2}>Quantity</FormLabel>
                                <Input defaultValue={product.quantity} type='number' onChange={(e) => {
                                    setProduct({ ...product, quantity: parseInt(e.target.value) });
                                }} />

                                <FormLabel mt={2}>Description</FormLabel>
                                <Textarea defaultValue={product.description} onChange={(e) => {
                                    setProduct({ ...product, description: e.target.value });
                                }} />
                            </section>
                            <Pricing product={product} setProduct={setProduct} setError={setError}
                                colorMode={colorMode} error={error} />
                        </div>

                        <div>
                            <SelectCategories colorMode={colorMode} 
                                              setProduct={setProduct}
                                              product={product}
                                               />
                        </div>

                    </div>
                </form>
            </div>
        </div>
     );
}
 
export default ModifyProduct;
//this component is being developed in modify-product branch, delete this branch in case anything goes wrong