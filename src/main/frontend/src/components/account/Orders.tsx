import { TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot, Button, useColorModeValue, useColorMode, Tag } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ResponsivePagination from 'react-responsive-pagination';
import classes from './account-menu.module.css'
import { useSingleFetch } from "../../hooks/useSingleFetch";
import { FaSort as Sort} from "react-icons/fa6";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Role } from '../../react-app-env.d';
import { useFetch } from "../../hooks/useFetch";
import Restricted from "../authentication/Restricted";
import { CiCircleCheck as Check } from "react-icons/ci";
const Orders = () => {
    const { auth:user } = useAuthContext();
    //replace value with the user from AuthContext and check Cart component as well;
    const auth: { userId: number; userName: string; } = { userId: 2, userName: "user" };
    const grayColor = useColorModeValue('gray.600','gray.400');
    const { colorMode } = useColorMode();
    const pageSize = 6;
    const [totalElements, setTotalElements]=useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [fetchByUser, setFetchByUser]=useState("");
    const [fetchAll, setFetchAll]=useState("");
    const { data:ordersByuser, error:errorFromOrdersByUser } = useSingleFetch<Order>(fetchByUser);
    const { data:orders, error:errorFromOrders } = useFetch<OrderList>(fetchAll);
    const handlePageChange = (page: number) => setCurrentPage(page);
    const [toggleIsPending, setToggleIsPending]=useState(false);
    const [toggleIsChecked, setToggleIsChecked]=useState(false);

    useEffect(()=>{
        if (user.user?.authorities?.find((role: Role) => role.authority === Role.ADMIN)) {
            setFetchAll('/api/v1/orders/order/all'+
            `?page=${currentPage}&page-size=${pageSize}&sort-pending=${toggleIsPending}&sort-checked=${toggleIsChecked}`);
            orders.length && setTotalElements(orders[0].total!);
            
        }else{
            setFetchByUser('/api/v1/orders/order'+
                   `?page=${currentPage}&page-size=${pageSize}&user-id=${auth.userId}`+
                    `&sort-pending=${toggleIsPending}&sort-checked=${toggleIsChecked}`);
            setTotalElements(ordersByuser?.total!);
        }
    },[orders, ordersByuser, toggleIsChecked,toggleIsPending, currentPage]);

    const isPendingTag=(isPending:boolean)=>{
        if(isPending) return <Tag colorScheme={'red'}>{'Pending'}</Tag>
        else return <Tag colorScheme={'green'}>{'Done'}</Tag>
    }
    const isCheckedTag=(isChecked:boolean)=>{
        if(isChecked) return <Tag colorScheme={'green'}>{'Checked'}</Tag>
        else return <Tag colorScheme={'orange'}>{'Unchecked'}</Tag>
    }
    const checkOrder=()=>{
        const check=()=>{
            console.log("checked order")
        }
        return <Button variant={'ghost'} colorScheme="green" leftIcon={<Check/>} size={'sm'} 
                       onClick={check}>check</Button>
    }

    return (
        <TableContainer className={`${classes['table-container']}
                                    ${colorMode === 'light' ? classes['pagination-light'] : classes['pagination-dark']}`}>
            <ResponsivePagination
                total={Math.ceil(totalElements / pageSize)}
                current={currentPage}
                onPageChange={page => handlePageChange(page)}
            />
            <Table variant='simple'>
                <TableCaption>Product checked means the administrator has reviewed the order</TableCaption>
                <Thead>
                    <Tr>
                        <Restricted to={[Role.ADMIN]}>
                            <Th>Client</Th>
                        </Restricted>
                        <Th>Product</Th>
                        <Th>
                            <Button variant={'ghost'} rightIcon={<Sort />} color={grayColor}
                                onClick={() => setToggleIsPending(!toggleIsPending)}>
                                Status
                            </Button>
                        </Th>
                        <Th>
                            <Button variant={'ghost'} rightIcon={<Sort />} color={grayColor}
                                onClick={() => setToggleIsChecked(!toggleIsChecked)}>
                                Checked
                            </Button>
                        </Th>
                        <Restricted to={[Role.ADMIN]}>
                            <Th>Action</Th>
                        </Restricted>
                    </Tr>
                </Thead>
                <Tbody>
                    {user.user?.authorities?.find((role: Role) => role.authority === Role.ADMIN) ?
                        orders?.map((order, i) => (
                            <Tr key={i}>
                                <Td>{order.userName}</Td>
                                <Td>{order.productName}</Td>
                                <Td>{isPendingTag(order.isPending!)}</Td>
                                <Td>{isCheckedTag(order.isChecked!)}</Td>
                                <Td>{checkOrder()}</Td>
                            </Tr>
                        ))
                        :
                        ordersByuser?.orderedProducts?.map((order, i) => (
                            <Tr key={i}>
                                <Td>{order.productName}</Td>
                                <Td>{isPendingTag(order.isPending!)}</Td>
                                <Td>{isCheckedTag(order.isChecked!)}</Td>
                            </Tr>
                        ))}
                </Tbody>
                <Tfoot>
                    <Tr>
                        <Restricted to={[Role.ADMIN]}>
                            <Th>Client</Th>
                        </Restricted>
                        <Th>Product</Th>
                        <Th>Status</Th>
                        <Th>Checked</Th>
                        <Restricted to={[Role.ADMIN]}>
                            <Th>Action</Th>
                        </Restricted>
                    </Tr>
                </Tfoot>
            </Table>
        </TableContainer>
    );
};

export default Orders;