import { TableContainer, Table, Image, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot, Tag, Flex } from "@chakra-ui/react";
import { useFetch } from "../../../hooks/useFetch";
import useMatchMedia from "../../../hooks/useMatchMedia";
import { useEffect, useState } from "react";
import ResponsivePagination from 'react-responsive-pagination';
import classes from "./products-panel.module.css";
import 'react-responsive-pagination/themes/minimal.css';
import useInterceptor from "../../../hooks/useInterceptor";

type PaginatedProducts={
    products:Array<Product>;
    totalProducts:number
}
const ProductsTable = () => {
    const axiosPrivate = useInterceptor();
    const pageSize=4;
    const [currentPage, setCurrentPage] = useState(1);//only for the pagination gui, not used in the page url
    const [url,setUrl]=useState("");
    const [paginatedProducts,setPaginatedProducts]=useState<PaginatedProducts>({products:[],totalProducts:0})
    const isDesktop = useMatchMedia();

    //TODO: ADD PAGINATION
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
    useEffect(()=>{/*function to update the url state */
        setUrl(`/api/v1/product-management/products/${currentPage}/${pageSize}`);
    },[currentPage]);

    useEffect(() => {/*function to call the API with the new url */
        if (url) {
            const getProducts = async () => {
                try {
                    const response = await axiosPrivate.get<PaginatedProducts>(url);
                    setPaginatedProducts(response.data);
                } catch (error) {
                    console.log(error);
                }
            };
            getProducts();
        }
    }, [url])

    return (
        <div className={classes['table-container']}>
            <ResponsivePagination
                total={Math.ceil(paginatedProducts.totalProducts/pageSize)}
                current={currentPage}
                onPageChange={page => handlePageChange(page)}
            />
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
                        {paginatedProducts.products.map((product, i) => (
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
        </div>
    );
};

export default ProductsTable;