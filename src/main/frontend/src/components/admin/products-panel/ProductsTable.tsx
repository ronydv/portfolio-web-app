import { TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot } from "@chakra-ui/react";
import { useFetch } from "../../../hooks/useFetch";

const ProductsTable = () => {
    const {data}=useFetch<Product>("/api/v1/product-management/products");
    console.log(data);
    return (
        <TableContainer>
            <Table variant='simple'>
                <TableCaption>Imperial to metric conversion factors</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Product</Th>
                        <Th>Category</Th>
                        <Th isNumeric>Stock</Th>
                        <Th isNumeric>Price</Th>
                        <Th>Status</Th>
                        <Th>Action</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data.map((product, i) => (
                        <Tr key={i}>
                            <Td>{product.brand}</Td>
                            <Td>{product.categories?.map((category,z) =>(<p key={z}>{category.name}</p>))}</Td>
                            <Td isNumeric>{product.quantity}</Td>
                            <Td isNumeric>{product.price} ₲</Td>
                            <Td isNumeric>{product.status}</Td>
                            <Td isNumeric>update/delete</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
};

export default ProductsTable;