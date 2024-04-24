import { Heading, Select, Text } from "@chakra-ui/react";
import { useFetch } from "../../../hooks/useFetch";
import { ChangeEvent, useState } from "react";

type SelectSectorProps={
    product?:Product
    setProduct: React.Dispatch<React.SetStateAction<Product>>;
    setError: React.Dispatch<React.SetStateAction<string>>;
    error:string;
}
const SelectSector = ({product,setProduct, error, setError}:SelectSectorProps) => {
    const {data:sector}=useFetch<Sector>("/api/v1/product-management/sector");
    
    const handleSector = (event: ChangeEvent<HTMLSelectElement>) => {
        setProduct((prev) => {
            return { ...prev, sector: event.target.value };
        });
        setError("");
    };
    return (
        <div style={{marginTop:'3px'}}>
            <Heading as='h3' size='xs' mt={2} mb={2} mr={10}>
                {error ? <Text color={'red'}>{error}</Text>: <Text>Sector</Text> }
            </Heading>
            <Select placeholder={product?.sector ? product.sector :'Select sector'}
                    onChange={(e)=>{handleSector(e)}}>
                {sector.map((sector,i) =>(
                    <option key={i} value={sector.name}>{sector.name}</option>
                ))}
            </Select>
        </div>
    );
}
 
export default SelectSector;