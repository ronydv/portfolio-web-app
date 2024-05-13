import { Tabs, TabList, Tab, TabPanels } from "@chakra-ui/react";
import classes from './catalog.module.css';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/minimal.css';
import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useSingleFetch } from "../../hooks/useSingleFetch";
type ProductsGridProps={
    setSector: React.Dispatch<React.SetStateAction<string>>
    selectedCategories: string[];
    selectedTypes: string[];
}
const ProductsGrid = ({setSector, selectedCategories, selectedTypes}:ProductsGridProps) => {
    const {data:sectors}=useFetch<Sector>("/api/v1/product-management/sector");
    const [tabIndex, setTabIndex] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);//only for the pagination gui, not used in the page url
    const handlePageChange = (page: number) => setCurrentPage(page);
    const pageSize = 4;
    const [url, setUrl]=useState("");
    const { data:products, error } = useSingleFetch<PaginatedProducts>(url);
    const [paginatedProducts, setPaginatedProducts] = useState<PaginatedProducts>({ products: [], totalProducts: 0 });

    const filter =(sector:string)=>{
        switch (true) {
            case selectedCategories.length > 0 && selectedTypes.length === 0:
                console.log("filtering products by categories");
                setUrl(`/api/v1/product-management/products/${currentPage}/${pageSize}/sector/${sector}/filter/${selectedCategories}/null`);
                break;
            case selectedCategories.length === 0 && selectedTypes.length > 0:
                console.log("filtering products by types");
                setUrl(`/api/v1/product-management/products/${currentPage}/${pageSize}/sector/${sector}/filter/null/${selectedTypes}`);
                break;
            case selectedCategories.length > 0 && selectedTypes.length > 0:
                console.log("filtering products by categories and types: ",selectedCategories,selectedTypes);
                setUrl(`/api/v1/product-management/products/${currentPage}/${pageSize}/sector/${sector}/filter/${selectedCategories}/${selectedTypes}`);
                break;
            default:
                console.log("fetch products without filtering");
                setUrl(`/api/v1/product-management/products/${currentPage}/${pageSize}/sector/${sector}`);
        }
    }

    useEffect(()=>{//fetch data according to the selected tab, categories or types
        sectors.forEach((sector, i)=>{
            if(tabIndex === i){
                setSector(sector.name);//update sector to set within the url for CatalogFilter.tsx
                filter(sector.name)
            }
        });
    },[sectors, tabIndex, selectedCategories, selectedTypes]);
    return ( 
        <div className={classes['grid-container']}>
            <Tabs colorScheme='red' index={tabIndex} onChange={(index) => setTabIndex(index)}>
                <TabList>
                    {sectors.map((sector,i) => <Tab key={i}>{sector.name}</Tab>)}
                </TabList>

                <TabPanels>
                    <ResponsivePagination
                        total={Math.ceil(products?.totalProducts! / pageSize)}
                        current={currentPage}
                        onPageChange={page => handlePageChange(page)}
                    />
                    {products?.products.map((product, i)=>(
                        <div key={i}>
                            {`Product{`}<br/>
                            &emsp;name:{product.name}<br/>
                            <p>{`}`}</p>
                        </div>
                    ))}
                </TabPanels>
            </Tabs>
        </div>
     );
}
 
export default ProductsGrid;