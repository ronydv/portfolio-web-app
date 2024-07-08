import { Breadcrumb, BreadcrumbItem, Button, Flex, FormLabel, Heading, Input, Spacer, Textarea, useColorMode, Divider } from "@chakra-ui/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft as LeftIcon } from "react-icons/fa6";
import { MdOutlineChevronRight as ChevronRightIcon } from "react-icons/md";
import classes from "./products-panel.module.css";
import { FormEvent, useEffect, useState } from "react";
import { useSingleFetch } from "../../../hooks/useSingleFetch";
import SelectCategories from "./SelectCategories";
import axios from "axios";
import useInterceptor from "../../../hooks/useInterceptor";
import SelectSector from "./SelectSector";
import SelectType from "./SelectType";
const ModifyProduct = () => {
    const axiosPrivate = useInterceptor();
    const { colorMode } = useColorMode();
    const { id } = useParams<string>();
    const navigate = useNavigate();
    const { data } = useSingleFetch<Product>(`/api/v1/product-management/products/${id}`);
    const [product, setProduct]= useState<Product>({});
    const [error, setError]=useState<string>("");
    const [isLoading, setIsLoading]=useState(false);
    const [typesUrl, setTypesUrl]=useState("");
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            setIsLoading(true);
            const response = await axiosPrivate.put<Product>("/api/v1/product-management/products",
                product, {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
            });
            setTypesUrl("");
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            if (axios.isAxiosError(err)) {
                setError(err.response?.data.message);
                if (err.response?.data?.detail) setError(err.response?.data?.detail);
            }
        }
    }
    useEffect(() => { data && setProduct(data); },[data]);
    
    return ( 
        <div>
            <div >
                <form onSubmit={handleSubmit}>
                    <section className={`${classes.title} ${colorMode === 'light' ? classes.light : classes.dark}`}>
                        <Flex direction={'column'}>
                            <Heading as='h2' size='md' marginRight={10}>
                                Modificar Producto
                            </Heading>
                            <Breadcrumb spacing='8px' separator={<ChevronRightIcon color='gray.500' />}>
                                <BreadcrumbItem>
                                    <p>Productos</p>
                                </BreadcrumbItem>
                                <BreadcrumbItem>
                                    <p>Tabla</p>
                                </BreadcrumbItem>
                                <BreadcrumbItem isCurrentPage>
                                    <p>Actualizar</p>
                                </BreadcrumbItem>
                            </Breadcrumb>
                        </Flex>
                        <Spacer />
                        <Button variant='outline' colorScheme='blue' marginRight={5}
                            leftIcon={<LeftIcon />}
                            onClick={() => navigate("/dashboard/products-dashboard")}>
                            Volver
                        </Button>
                        <Button type="submit" variant={'solid'}
                            isLoading={isLoading}
                            loadingText='Submitting'
                            colorScheme={'blue'}>
                            Guardar cambios
                        </Button>
                    </section>

                    <div className={classes['inputs-container']}>
                        <div>
                            <section className={`${classes['general-information']} ${colorMode === 'light' ? classes.light : classes.dark}`}>
                                <Heading as='h2' size='sm' marginRight={10}>Información General</Heading>
                                <Divider/>
                                
                                <SelectSector 
                                    product={product}
                                    setProduct={setProduct} 
                                    error={error} 
                                    setError={setError}/>

                                <FormLabel mt={2}>Nombre del producto</FormLabel>
                                <Input defaultValue={product.name} type='text' onChange={(e) => {
                                    setProduct({ ...product, name: e.target.value });
                                }} />

                                <FormLabel mt={2}>Descripción</FormLabel>
                                <Textarea minWidth={'25vw'} defaultValue={product.description} onChange={(e) => {
                                    setProduct({ ...product, description: e.target.value });
                                }} />
                            </section>
                            <section className={`${classes['product-type']} ${colorMode === 'light' ? classes.light : classes.dark}`}>
                            <SelectType product={product} 
                                        setProduct={setProduct}
                                        setError={setError}
                                        error={error}
                                        setTypesUrl={setTypesUrl}
                                        typesUrl={typesUrl}/>
                        </section>
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