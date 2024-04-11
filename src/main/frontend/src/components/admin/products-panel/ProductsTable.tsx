import { TableContainer, Table, Image, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot, Tag, Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import useMatchMedia from "../../../hooks/useMatchMedia";
import { useEffect, useState } from "react";
import ResponsivePagination from 'react-responsive-pagination';
import classes from "./products-panel.module.css";
import 'react-responsive-pagination/themes/minimal.css';
import { useSingleFetch } from "../../../hooks/useSingleFetch";


type PaginatedProducts={
    products:Array<Product>;
    totalProducts:number
}
type ProductsTableProps = {
    browse: string;
};
const ProductsTable = ({browse}:ProductsTableProps) => {
    const isDesktop = useMatchMedia();
    const [currentPage, setCurrentPage] = useState(1);//only for the pagination gui, not used in the page url
    const pageSize=4;
    const [url,setUrl]=useState("");
    const {data}=useSingleFetch<PaginatedProducts>(url);
    const [paginatedProducts,setPaginatedProducts]=useState<PaginatedProducts>({products:[],totalProducts:0})
    const [tabIndex, setTabIndex] = useState(0)

    
    const handlePageChange = (page:number) => setCurrentPage(page);
    const renderStatus =(product: Product):JSX.Element|undefined=>{
        if(product.quantity! < 1){
            return <Tag size={'md'}  variant='solid' colorScheme='red'>no stock</Tag>
        }
        if(product.quantity! > 0 && product.quantity! <= 5){
            return <Tag size={'md'}  variant='solid' colorScheme='yellow'>low stock</Tag>
        }
        if(product.quantity! > 5){
            return <Tag size={'md'}  variant='solid' colorScheme='green'>in stock</Tag>
        }
    }
    useEffect(()=>{/* update the url state to fetch data with a updated url */
        if(browse === ""){
            //show all stock products if an event occurs in this tab
            tabIndex === 0 && setUrl(`/api/v1/product-management/products/${currentPage}/${pageSize}`); 
        }else{
            setUrl(`/api/v1/product-management/products/${browse}/${currentPage}/${pageSize}`);
        }
        //show low stock products if an event occurs in this tab
        tabIndex === 1 && setUrl(`/api/v1/product-management/products/${currentPage}/${pageSize}/low-stock`);
        //show empty stock products if an event occurs in this tab
        tabIndex === 2 && setUrl(`/api/v1/product-management/products/${currentPage}/${pageSize}/empty-stock`);
    },[browse,currentPage,tabIndex,url]);

    useEffect(()=>setCurrentPage(1),[tabIndex]);//reset the value of the current page whenever the tab is changed
    useEffect(()=>{//set the page to 1 and switch tab to all products whenever the browser value is changed
        setCurrentPage(1);
        setTabIndex(0);
    },[browse]);
    useEffect(() => { data && setPaginatedProducts(data) }, [data]);/* after fetching the data with the new url, update the table */

    return (
        <div className={classes['table-container']}>
            <ResponsivePagination
                total={Math.ceil(paginatedProducts.totalProducts/pageSize)}
                current={currentPage}
                onPageChange={page => handlePageChange(page)}
            />
            <Tabs index={tabIndex} onChange={(index) => setTabIndex(index)}>
                <TabList>
                    <Tab>All</Tab>
                    <Tab>Low Stock</Tab>
                    <Tab>Out of Stock</Tab>
                </TabList>

                <TabPanels >
                        <TableContainer pt={1}>
                            <Table variant='simple' size={isDesktop ? 'md' : 'sm'}>
                                {/* <TableCaption>Products</TableCaption> */}
                                <Thead>
                                    <Tr>
                                        <Th pr={isDesktop ? '' : '4px'}>Product</Th>
                                        {isDesktop && <Th>Category</Th>}
                                        {isDesktop && <Th isNumeric>Stock</Th>}
                                        {isDesktop && <Th isNumeric>Price</Th>}
                                        <Th pr={isDesktop ? '' : '4px'} >Status</Th>
                                        <Th pr={isDesktop ? '' : '4px'} >Action</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {paginatedProducts.products?.map((product, i) => (
                                        <Tr key={i}>
                                            <Td pr={isDesktop ? '' : '4px'}>
                                                <Flex direction={'row'} columnGap={1} alignItems={'center'}>
                                                    {isDesktop && <Image src={product?.images?.[0]?.url || ''} width={45} />}
                                                    {product.brand}
                                                </Flex>
                                            </Td>
                                            {isDesktop && <Td>{product.categories?.map((category, z) => (<p key={z}>{category.name}</p>))}</Td>}
                                            {isDesktop && <Td isNumeric>{product.quantity}</Td>}{/* render only if screen is desktop */}
                                            {isDesktop && <Td isNumeric>{product.price} ₲</Td>}
                                            <Td pr={isDesktop ? '' : '4px'}>{product.status}{renderStatus(product)}</Td>
                                            <Td pr={isDesktop ? '' : '4px'}>u/d</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                </TabPanels>
            </Tabs>
        </div>
    );
};

export default ProductsTable;