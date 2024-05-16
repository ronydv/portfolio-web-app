import { Tabs, TabList, Tab, TabPanels, useColorMode } from "@chakra-ui/react";
import classes from './catalog.module.css';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/minimal.css';
import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useSingleFetch } from "../../hooks/useSingleFetch";
import ProductCard from "./ProductCard";
type ProductsGridProps={
    browse: string;
    setSector: React.Dispatch<React.SetStateAction<string>>
    selectedCategories: string[];
    selectedTypes: string[];
    setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
    setSelectedTypes: React.Dispatch<React.SetStateAction<string[]>>;
    tabIndex: number;
    setTabIndex: React.Dispatch<React.SetStateAction<number>>;
    sectors: Sector[];
}
const ProductsGrid = ({browse, setSector, selectedCategories, selectedTypes,setSelectedCategories, 
                       setSelectedTypes, tabIndex, setTabIndex, sectors}:ProductsGridProps) => {
    
    const { colorMode } = useColorMode();
    const [currentPage, setCurrentPage] = useState(1);//only for the pagination gui, not used in the page url
    const handlePageChange = (page: number) => setCurrentPage(page);
    const pageSize = 4;
    const [url, setUrl]=useState("");
    const { data:products, error } = useSingleFetch<PaginatedProducts>(url);

    const filter =(sector:string)=>{
        switch (true) {
            case selectedCategories.length > 0 && selectedTypes.length === 0:
                setUrl(`/api/v1/product-management/products/${currentPage}/${pageSize}/sector/${sector}/filter/${selectedCategories}/null`);
                break;
            case selectedCategories.length === 0 && selectedTypes.length > 0:
                setUrl(`/api/v1/product-management/products/${currentPage}/${pageSize}/sector/${sector}/filter/null/${selectedTypes}`);
                break;
            case selectedCategories.length > 0 && selectedTypes.length > 0:
                setUrl(`/api/v1/product-management/products/${currentPage}/${pageSize}/sector/${sector}/filter/${selectedCategories}/${selectedTypes}`);
                break;
            default:
                setUrl(`/api/v1/product-management/products/${currentPage}/${pageSize}/sector/${sector}`);
        }
    }

    useEffect(()=>{//fetch data according to the selected tab, categories or types
        if (browse === "") {
            sectors.forEach((sector, i) => {
                if (tabIndex === i) {
                    setSector(sector.name);//update sector to set within the url for CatalogFilter.tsx
                    filter(sector.name);
                }
            });
        }else {
            setUrl(`/api/v1/product-management/products/${browse}/${currentPage}/${pageSize}`);
        }
        sectors.forEach((sector, i) => {//allow switch tabs even if the browse tab is currently with values
            if (tabIndex === i) {
                setSector(sector.name);//update sector to set within the url for CatalogFilter.tsx
                filter(sector.name);
            }
        });
    },[sectors, browse, currentPage, tabIndex, selectedCategories, selectedTypes, url]);
    
    useEffect(() => {//reset the value of the current page and values of the filters whenever the tab is changed
        setCurrentPage(1);
        setSelectedCategories([]);//when this is empty, it uncheck the checkboxes from CatalogFilter.tsx
        setSelectedTypes([]);
    }, [tabIndex]);

    useEffect(() => {//reset the value of the current page and switch tab whenever the browser value is changed
        setCurrentPage(1);
        if(browse !== "")setTabIndex(sectors.length);//sector.lenght is the last value of the tab which is <Tab>Browse Result:</Tab>
        else setTabIndex(0);
    }, [browse]);

    useEffect(()=>setCurrentPage(1),[selectedCategories, selectedTypes]);//reset page whenever the filter is used
    return ( 
        <div className={`${classes['product-list-container']} 
                         ${colorMode === 'light' ? classes['pagination-light'] : classes['pagination-dark']}`}>
            <Tabs colorScheme='red' index={tabIndex} onChange={(index) => setTabIndex(index)}>
                <TabList>
                    {sectors.map((sector,i) => <Tab key={i}>{sector.name}</Tab>)}
                    {browse && <Tab>Browse Result:</Tab>}
                </TabList>

                <TabPanels>
                    <ResponsivePagination 
                        total={Math.ceil(products?.totalProducts! / pageSize)}
                        current={currentPage}
                        onPageChange={page => handlePageChange(page)}
                    />
                    {products?.products.map((product, i)=>(
                        <div key={i} className={classes['card-container']}>
                            <ProductCard product={product}/>
                        </div>
                    ))}
                </TabPanels>
            </Tabs>
        </div>
     );
}
 
export default ProductsGrid;