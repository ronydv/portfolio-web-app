import { TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot, Tag } from "@chakra-ui/react";
import { useFetch } from "../../../hooks/useFetch";
import useMatchMedia from "../../../hooks/useMatchMedia";

const ProductsTable = () => {
    const {data}=useFetch<Product>("/api/v1/product-management/products");
    const isDesktop = useMatchMedia();
    
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
    return (
        <TableContainer pt={10}>
            <Table variant='simple' size={isDesktop ? 'md':'sm'}>
                {/* <TableCaption>Products</TableCaption> */}
                <Thead>
                    <Tr>
                        <Th pr={isDesktop ? '':'4px'}>Product</Th>
                        {isDesktop && <Th>Category</Th>}
                        {isDesktop && <Th isNumeric>Stock</Th>}
                        {isDesktop && <Th isNumeric>Price</Th>}
                        <Th pr={isDesktop ? '':'4px'} >Status</Th>
                        <Th pr={isDesktop ? '':'4px'} >Action</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data.map((product, i) => (
                        <Tr key={i}>
                            <Td pr={isDesktop ? '':'4px'}>{product.brand}</Td>
                            {isDesktop && <Td>{product.categories?.map((category,z) =>(<p key={z}>{category.name}</p>))}</Td>}
                            {isDesktop && <Td isNumeric>{product.quantity}</Td>}{/* render only if screen is desktop */}
                            {isDesktop && <Td isNumeric>{product.price} ₲</Td>}
                            <Td pr={isDesktop ? '':'4px'}>{product.status}{renderStatus(product)}</Td>
                            <Td pr={isDesktop ? '':'4px'}>u/d</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
};

export default ProductsTable;