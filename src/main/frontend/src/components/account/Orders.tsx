import { TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot, useColorMode } from "@chakra-ui/react";
import { useState } from "react";
import ResponsivePagination from 'react-responsive-pagination';
import classes from './account-menu.module.css'

const Orders = () => {
    const auth: { userId: number; userName: string; } = { userId: 2, userName: "user" };//replace value with the user from AuthContext;
    const { colorMode } = useColorMode();
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (page: number) => setCurrentPage(page);

    return (
        <TableContainer className={`${classes['table-container']}
                                    ${colorMode === 'light' ? classes['pagination-light'] : classes['pagination-dark']}`}>
            <ResponsivePagination
                total={Math.ceil(5)}
                current={currentPage}
                onPageChange={page => handlePageChange(page)}
            />
            <Table variant='simple'>
                <TableCaption>Product checked means the administrator has reviewed the order</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Product</Th>
                        <Th>Status</Th>
                        <Th>Checked</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>inches</Td>
                        <Td>millimetres (mm)</Td>
                        <Td>25.4</Td>
                    </Tr>
                </Tbody>
                <Tfoot>
                    <Tr>
                        <Th>Product</Th>
                        <Th>Status</Th>
                        <Th>Checked</Th>
                    </Tr>
                </Tfoot>
            </Table>
        </TableContainer>
    );
};

export default Orders;
//todo: show orders by pending status, the backend service is already setup;