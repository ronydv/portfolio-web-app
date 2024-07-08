import { Button, Text, FormControl, FormLabel, Heading, Input, NumberInput, NumberInputField, Spacer, Textarea, useColorMode, Flex, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Divider } from "@chakra-ui/react";
import { FaArrowLeft as LeftIcon } from "react-icons/fa6";
import { MdOutlineChevronRight as ChevronRightIcon } from "react-icons/md";
import classes from "./products-panel.module.css";
import { FormEvent, useEffect, useState } from "react";
import SelectCategories from "./SelectCategories";
import axios from "axios";
import useInterceptor from "../../../hooks/useInterceptor";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AddImages from "./AddImages";
import SelectSector from "./SelectSector";
import SelectType from "./SelectType";

export type ImageObject = {
    src: string;
    alt: string;
    file: File;
};

const AddProduct = () => {
    const axiosPrivate = useInterceptor();
    const navigate = useNavigate();
    const { colorMode } = useColorMode();
    const [error, setError]=useState<string>("");
    const [product, setProduct]= useState<Product>({});
    const [formData, setFormData] = useState<FormData>(new FormData());
    const [selectedImages, setSelectedImages] = useState<ImageObject[]>([]);//filled in AddImages component
    const [files, setFiles] = useState<File[]>([]);//filled in AddImages component
    const [isLoading, setIsLoading]=useState(false);
    const [typesUrl, setTypesUrl]=useState("");
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            setIsLoading(true);
            formData.append("product", JSON.stringify(product));//add product (key-value)
            files.forEach((file) => formData.append("images", file));// Append images to FormData
            const response = await axiosPrivate.post<Product>("/api/v1/product-management/products",
                formData, {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "multipart/form-data",
                },
            });
            setIsLoading(false);
            setFormData(new FormData());//reset formData after submitting
            setTypesUrl("");//every time this is set to "" a useEffect runs for re-rendering the types in SelectType.tsx
        } catch (err) {
            setIsLoading(false);
            setFormData(new FormData());
            if (axios.isAxiosError(err)){
                setError(err.response?.data.message);
                if(err.response?.data?.detail) setError(err.response?.data?.detail);
            }
        }
    }
    //Todo: manage exception for SelectType
    return (
        <div >
            <form onSubmit={handleSubmit}> 
                <section className={`${classes.title} ${colorMode === 'light' ? classes.light : classes.dark}`}>
                    <Flex direction={'column'}>
                        <Heading as='h2' size='md' marginRight={10}>Agregar producto</Heading>
                        <Breadcrumb spacing='8px' separator={<ChevronRightIcon color='gray.500' />}>
                            <BreadcrumbItem>
                                <p>Productos</p>
                            </BreadcrumbItem>

                            <BreadcrumbItem isCurrentPage>
                                <p >Agregar Producto</p>
                            </BreadcrumbItem>
                        </Breadcrumb>
                    </Flex>
                    <Spacer />
                    <Button variant='outline' colorScheme='blue' marginRight={5}
                            leftIcon={<LeftIcon />}
                            onClick={() => navigate("/dashboard/products-dashboard")}>
                        Volver
                    </Button>
                    <Button type="submit" variant='solid' colorScheme="blue"
                            isLoading={isLoading}
                            loadingText='Submitting'>
                        Agregar producto
                    </Button>
                </section>

                <div className={classes['inputs-container']}>
                    <div>
                        <section className={`${classes['general-information']} ${colorMode === 'light' ? classes.light : classes.dark}`}>
                            <Heading as='h2' size='sm' marginRight={10}>Información General</Heading>
                            <Divider/>

                            <SelectSector setProduct={setProduct} error={error} setError={setError}/>

                            <FormLabel mt={2}>Nombre del producto</FormLabel>
                            <Input type='text' onChange={(e) => setProduct({...product,name:e.target.value})} />

                            <FormLabel mt={2}>Descripción</FormLabel>
                            <Textarea minWidth={'25vw'} onChange={(e) => setProduct({...product,description:e.target.value})} />
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
                                          setProduct={setProduct}/>
                                          
                        <AddImages colorMode={colorMode} 
                                   formData={formData} 
                                   setFormData={setFormData}
                                   error={error}
                                   setError={setError}
                                   selectedImages={selectedImages}
                                   setSelectedImages={setSelectedImages}
                                   files={files}
                                   setFiles={setFiles}/>
                    </div>

                </div>
            </form>
        </div>
    );
}
 
export default AddProduct;