import { TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot, Button, useColorModeValue, useColorMode, Tag } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ResponsivePagination from 'react-responsive-pagination';
import classes from './account-menu.module.css'
import { useSingleFetch } from "../../hooks/useSingleFetch";
import { FaSort as Sort} from "react-icons/fa6";

const Orders = () => {
    //replace value with the user from AuthContext and check Cart component as well;
    const auth: { userId: number; userName: string; } = { userId: 2, userName: "user" };
    const grayColor = useColorModeValue('gray.600','gray.400');
    const { colorMode } = useColorMode();
    const pageSize = 25;
    const [currentPage, setCurrentPage] = useState(1);
    const [url, setUrl]=useState("");
    const { data:orders, error } = useSingleFetch<Order>(url);
    const handlePageChange = (page: number) => setCurrentPage(page);
    const [toggleIsPending, setToggleIsPending]=useState(false);
    const [toggleIsChecked, setToggleIsChecked]=useState(false);
//TODO: CREATE VIEW FOR THE ADMIN 
    useEffect(()=>{
        setUrl('/api/v1/orders/order'+
                `?page=${currentPage}&page-size=${pageSize}&user-id=${auth.userId}`+
                `&sort-pending=${toggleIsPending}&sort-checked=${toggleIsChecked}`);
        console.log("is pending toggled: ",toggleIsPending," is checked togled: ",toggleIsChecked);
        console.log(orders?.orderedProducts && orders?.orderedProducts[0].isChecked);
    },[orders, toggleIsChecked,toggleIsPending, currentPage]);

    const isPendingTag=(isPending:boolean)=>{
        if(isPending) return <Tag colorScheme={'red'}>{'Pending'}</Tag>
        else return <Tag colorScheme={'green'}>{'Done'}</Tag>
    }
    const isCheckedTag=(isChecked:boolean)=>{
        if(isChecked) return <Tag colorScheme={'green'}>{'Checked'}</Tag>
        else return <Tag colorScheme={'orange'}>{'Unchecked'}</Tag>
    }
    return (
        <TableContainer className={`${classes['table-container']}
                                    ${colorMode === 'light' ? classes['pagination-light'] : classes['pagination-dark']}`}>
            <ResponsivePagination
                total={Math.ceil(orders?.total! / pageSize)}
                current={currentPage}
                onPageChange={page => handlePageChange(page)}
            />
            <Table variant='simple'>
                <TableCaption>Product checked means the administrator has reviewed the order</TableCaption>
                <Thead>
                    <Tr>
                        <Th>
                            Product
                        </Th>
                        <Th>
                            <Button variant={'ghost'} rightIcon={<Sort />} color={grayColor}
                                    onClick={()=> setToggleIsPending(!toggleIsPending)}>
                                Status
                            </Button>
                        </Th>
                        <Th>
                            <Button variant={'ghost'} rightIcon={<Sort />} color={grayColor}
                                    onClick={()=> setToggleIsChecked(!toggleIsChecked)}>
                                Checked
                            </Button>
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {orders?.orderedProducts?.map((order, i) => (
                        <Tr key={i}>
                            <Td>{order.productName}</Td>
                            <Td>{isPendingTag(order.isPending!)}</Td>
                            <Td>{isCheckedTag(order.isChecked!)}</Td>
                        </Tr>
                    ))}
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