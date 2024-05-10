import { Tabs, TabList, Tab, TabPanels } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
type ProductsGridProps={
    setSector: React.Dispatch<React.SetStateAction<string>>
}
const ProductsGrid = ({setSector}:ProductsGridProps) => {
    const {data:sectors}=useFetch<Sector>("/api/v1/product-management/sector");
    const [tabIndex, setTabIndex] = useState(0);

    useEffect(()=>{
        sectors.forEach((sector, i)=>{
            if(tabIndex === i){
                setSector(sector.name);//update sector to set within the url for CatalogFilter.tsx
            }
        });
    },[sectors,tabIndex]);
    return ( 
        <div>
            <Tabs colorScheme='red' index={tabIndex} onChange={(index) => setTabIndex(index)}>
                <TabList>
                    {sectors.map((sector,i) => <Tab key={i}>{sector.name}</Tab>)}
                </TabList>

                <TabPanels>
                    <p>{tabIndex}</p>
                </TabPanels>
            </Tabs>
        </div>
     );
}
 
export default ProductsGrid;