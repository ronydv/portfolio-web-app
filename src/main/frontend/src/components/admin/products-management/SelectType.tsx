import { Accordion, AccordionButton, AccordionIcon, AccordionItem, Text, AccordionPanel, Heading, Input, Radio, RadioGroup, Spacer, Stack } from "@chakra-ui/react";
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
    setTypesUrl: React.Dispatch<React.SetStateAction<string>>
    typesUrl: string
}

const SelectType =({ product, setProduct, error, setError, setTypesUrl, typesUrl }:SelectTypeProps) => {
    const axiosPrivate = useInterceptor();
    const {data}=useFetch<Type>(typesUrl);
    const [types, setTypes]= useState<Type[]>([]);
    const [selectedType, setSelectedType] = useState<string>('');


    const handleRadio = (e: string) => {
        setProduct({ ...product, productType: e });
        setSelectedType(e);
        setError("");
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
        if(Array.isArray(data) && data.length > 0) setTypes(data);
    }, [data]);

    useEffect(()=>{
        setTypesUrl("/api/v1/product-management/types");
    },[typesUrl]);
    


    return (
        <>
            <Heading as='h2' size='sm' marginRight={10} mb={2}>
                {error?.includes('type') ? <Text color={'red'}>{error}</Text>: <Text>Product type</Text> }
                </Heading>
            <Accordion /* allowToggle={true} */ mt={3}>
                <AccordionItem>
                    <AccordionButton>

                        <Input type="text" placeholder="Add or select existing type"
                               value={product?.productType ? product?.productType: selectedType}
                               onChange={(e)=>{handleRadio(e.target.value)}}/>
                        <AccordionIcon />
                    </AccordionButton>

                    <AccordionPanel pb={4} style={{ maxHeight: '200px', overflowY: 'auto' }}>
                        <RadioGroup onChange={(e)=>{handleRadio(e)}} value={selectedType}>
                            <Stack spacing={1} direction='column'>
                                {Array.isArray(types) && types.length > 0 && types.map((type, i) => (
                                    <div key={i} style={{ display: 'flex' }}>
                                        <Radio colorScheme='teal' value={type.productType}>{type.productType}</Radio>
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