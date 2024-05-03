import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Checkbox, ColorMode, Heading, Input, Radio, RadioGroup, Select, Spacer, Stack } from "@chakra-ui/react";
import classes from "./products-panel.module.css";
import { RiDeleteBinFill as DeleteIcon } from "react-icons/ri";
import { ChangeEvent, useEffect, useState } from "react";
import { useFetch } from "../../../hooks/useFetch";
import useInterceptor from "../../../hooks/useInterceptor";
import axios from "axios";
type SelectTypeProps= {
    product: Product;
    setProduct: React.Dispatch<React.SetStateAction<Product>>;
    error:string
    setError: React.Dispatch<React.SetStateAction<string>>
}

const SelectType =({ product, setProduct, error, setError }:SelectTypeProps) => {
    const axiosPrivate = useInterceptor();
    const [url, setUrl]=useState("");
    const {data}=useFetch<Type>("/api/v1/product-management/types");
    const [types, setTypes]= useState<Type[]>([]);

    const handleRadio = (e: string) => {
        setProduct({ ...product, productType: e });
        console.log(product);
    }
    const deleteType = async (type: Type)=>{
        console.log(type);
        try{
            await axiosPrivate.delete<Type>(`/api/v1/product-management/types/${type.id}`);
            setTypes(prevTypes => prevTypes.filter(t => t.productType !== type.productType));
        }catch(error){
            if(axios.isAxiosError(error)) setError(error.response?.data.message);
        }
    }

    useEffect(() => {//render items in the accordion in the first component load
        setTypes(data);
    }, [data]);

    return (
        <>
            <Heading as='h2' size='sm' marginRight={10} mb={2}>Product Type</Heading>
            <Accordion /* allowToggle={true} */ mt={3}>
                <AccordionItem>
                    <AccordionButton>

                        <Input type="text" placeholder="Add type or select existing type"
                               onChange={(e)=>{handleRadio(e.target.value)}}/>
                        <AccordionIcon />
                    </AccordionButton>

                    <AccordionPanel pb={4} style={{ maxHeight: '200px', overflowY: 'auto' }}>
                        <RadioGroup defaultValue='2' onChange={(e)=>{handleRadio(e)}}>
                            <Stack spacing={1} direction='column'>
                                {types.map((type, i) => (
                                    <div key={i} style={{ display: 'flex' }}>
                                        <Radio colorScheme='red' value={type.productType}>{type.productType}</Radio>
                                        <Spacer />
                                        <DeleteIcon color="red" onClick={()=>{deleteType(type)}} className={classes['action-icon']} />
                                    </div>
                                ))}
                            </Stack>
                        </RadioGroup>

                    </AccordionPanel>

                </AccordionItem>
            </Accordion>
        </>
     );
}
 
export default SelectType;