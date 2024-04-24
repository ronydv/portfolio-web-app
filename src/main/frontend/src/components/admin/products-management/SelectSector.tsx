import { Select } from "@chakra-ui/react";
import { useFetch } from "../../../hooks/useFetch";
import { ChangeEvent, useState } from "react";

type SelectSectorProps={
    setProduct: React.Dispatch<React.SetStateAction<Product>>;
}
const SelectSector = ({setProduct}:SelectSectorProps) => {
    const {data:sector}=useFetch<Sector>("/api/v1/product-management/sector");

    const handleSector = (event: ChangeEvent<HTMLSelectElement>) => {
        setProduct((prev) => {
            console.log(prev);
            return { ...prev, sector: event.target.value };
        });
    };
    return (
        <div style={{marginTop:'3px'}}>
            <Select placeholder='Select Sector' onChange={(e)=>{handleSector(e)}}>
                {sector.map((sector,i) =>(
                    <option key={i} value={sector.name}>{sector.name}</option>
                ))}
            </Select>
        </div>
    );
}
 
export default SelectSector;
//todo: add sector choicebox to the AddProduct component