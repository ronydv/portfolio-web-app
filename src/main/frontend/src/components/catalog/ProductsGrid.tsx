import { Tabs, TabList, Tab, TabPanels, useColorMode, Icon, Spinner, Button } from "@chakra-ui/react";
import classes from './catalog.module.css';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/minimal.css';
import { useEffect, useState } from "react";
import { useSingleFetch } from "../../hooks/useSingleFetch";
import { SiAltiumdesigner as Designs } from "react-icons/si";
import { FaGears as Machinery } from "react-icons/fa6";
import { LiaMicrochipSolid as Automations } from "react-icons/lia";
import { IoIosSearch as SearchIcon } from "react-icons/io";
import ProductCard from "./ProductCard";
import { IconType } from "react-icons";
import useMatchMedia from "../../hooks/useMatchMedia";
import axios from "axios";

const icons: IconType[]= [Designs, Machinery, Automations];
type ProductsGridProps={
    browse: string;
    loadingSectors:boolean
    setSector: React.Dispatch<React.SetStateAction<string>>
    selectedCategories: string[];
    selectedTypes: string[];
    tabIndex: number;
    setTabIndex: React.Dispatch<React.SetStateAction<number>>;
    sectors: Sector[];
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}
const ProductsGrid = ({browse, loadingSectors, setSector, selectedCategories, selectedTypes,tabIndex,
                       setTabIndex, sectors, currentPage, setCurrentPage }:ProductsGridProps) => {
    
    const isDesktop = useMatchMedia();
    const { colorMode } = useColorMode();
    const handlePageChange = (page: number) => setCurrentPage(page);//only for the pagination gui, not used in the page url
    const pageSize = 4;
    const [url, setUrl]=useState("");
    const { data, error, isLoading } = useSingleFetch<PaginatedProducts>(url);
    const [products, setProducts] = useState<PaginatedProducts | null>(null);

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

    useEffect(()=>{
        setProducts(data);
        if(axios.isAxiosError(error))setProducts(null);
    },[data,error]);

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

    useEffect(() => {//reset the value of the current page and switch tab whenever the browser value is changed
        setCurrentPage(1);
        if(browse !== ""){
            setTabIndex(sectors.length);//sector.lenght is the last value of the tab which is <Tab>Browse Result:</Tab>
        }else{
            setTabIndex(0);
        } 
    }, [browse]);

    const resultsTab =(browse:string)=>{
        if(browse) return (
            isDesktop ? <Tab>Search result:</Tab>:<Tab><Icon as={SearchIcon}/></Tab>
        )
    }
    const statusMessage = () =>{
        if(isLoading){return <p>Loading products...</p>}
        if(axios.isAxiosError(error)){return <p>{error.response?.data.message}</p>}
    }
    return ( 
        <div className={`${classes['product-list-container']} 
                         ${colorMode === 'light' ? classes['pagination-light'] : classes['pagination-dark']}`}>

            <Tabs colorScheme='teal' index={tabIndex} variant='enclosed'
                  onChange={(index) => setTabIndex(index)}>
                                {loadingSectors ? <Spinner thickness='4px'
                                            speed='0.65s' emptyColor='gray.200'
                                            color='purple.500' size='md' /> 
                    :
                <TabList>
                    {Array.isArray(sectors) && sectors.map((sector,i) => {
                        if(isDesktop) return <Tab key={i}>{sector.name}</Tab>
                        else return <Tab key={i}><Icon as={icons[i]} pr={1}/>{ tabIndex=== i && sector.name}</Tab>
                    })}
                    {resultsTab(browse)}
                </TabList>}
                <TabPanels>
                {statusMessage() }
                    <ResponsivePagination 
                        total={Math.ceil(products?.totalProducts! / pageSize)}
                        current={currentPage}
                        onPageChange={page => handlePageChange(page)}
                    />
                {!isLoading && products?.products  && products.products?.map((product, i)=>(
                        <div key={i} className={classes['card-container']}>
                            <ProductCard product={product} 
                                         colorMode={colorMode}
                                         tabIndex={tabIndex}
                                         categories={selectedCategories}
                                         types={selectedTypes}
                                         page={currentPage}
                                         browse={browse}/>
                        </div>
                    ))}
                </TabPanels>
            </Tabs>
        </div>
     );
}
 
export default ProductsGrid;