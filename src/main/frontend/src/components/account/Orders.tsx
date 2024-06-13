import { TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot, Text, Button, useColorModeValue, useColorMode, Tag, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ResponsivePagination from 'react-responsive-pagination';
import classes from './account-menu.module.css';
import { useSingleFetch } from "../../hooks/useSingleFetch";
import { FaSort as Sort } from "react-icons/fa6";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Role } from '../../react-app-env.d';
import { useFetch } from "../../hooks/useFetch";
import Restricted from "../authentication/Restricted";
import { CiCircleCheck as Check } from "react-icons/ci";
import useInterceptor from "../../hooks/useInterceptor";
import useMatchMedia from "../../hooks/useMatchMedia";

const Orders = () => {//todo: get the user from authContext
    const isDesktop = useMatchMedia();
    const axiosPrivate = useInterceptor();
    const { auth: user } = useAuthContext();
    //replace value with the user from AuthContext and check Cart component as well;
    const auth: { userId: number; userName: string; } = { userId: 2, userName: "user" };
    const grayColor = useColorModeValue('gray.600', 'gray.400');
    const { colorMode } = useColorMode();
    const pageSize = 6;
    const [totalElements, setTotalElements] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [fetchByUser, setFetchByUser] = useState("");
    const [fetchAll, setFetchAll] = useState("");
    const [fetchUnchecked, setFetchUnchecked] = useState("");
    const { data: ordersByuser, error: errorFromOrdersByUser } = useSingleFetch<Order>(fetchByUser);
    const { data: orders, error: errorFromOrders } = useFetch<OrderView>(fetchAll);
    const { data: countUnchecked, error: errorFromCountUnchecked } = useSingleFetch<number>(fetchUnchecked);
    const handlePageChange = (page: number) => setCurrentPage(page);
    const [toggleIsPending, setToggleIsPending] = useState(false);
    const [toggleIsChecked, setToggleIsChecked] = useState(false);
    const [response, setResponse] = useState<OrderView>({});
    useEffect(() => {
        if (user.user?.authorities?.find((role: Role) => role.authority === Role.ADMIN)) {
            setFetchAll('/api/v1/orders/order/all' +
                `?page=${currentPage}&page-size=${pageSize}&sort-pending=${toggleIsPending}&sort-checked=${toggleIsChecked}`);
            orders.length && setTotalElements(orders[0].total!);
            setFetchUnchecked('/api/v1/orders/order/unchecked');
        } else {
            setFetchByUser('/api/v1/orders/order' +
                `?page=${currentPage}&page-size=${pageSize}&user-id=${user.user?.id}` +
                `&sort-pending=${toggleIsPending}&sort-checked=${toggleIsChecked}`);
            setTotalElements(ordersByuser?.total!);
        }
    }, [orders, ordersByuser, toggleIsChecked, toggleIsPending, currentPage, response]);

    const isPendingTag = (isPending: boolean) => {
        if (isPending) return <Tag colorScheme={'red'}>{'Pending'}</Tag>;
        else return <Tag colorScheme={'green'}>{'Done'}</Tag>;
    };
    const isCheckedTag = (isChecked: boolean) => {
        if (isChecked) return <Tag colorScheme={'green'}>{'*Checked'}</Tag>;
        else return <Tag colorScheme={'orange'}>{'Unchecked'}</Tag>;
    };

    const checkOrder = (index: number) => {
        const check = async (index: number) => {
            orders[index].isChecked = true;
            const response = await axiosPrivate.put<OrderView>("/api/v1/orders/order",//add try catch if needed
                orders[index], {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
            });
            setResponse(response.data);
            setFetchUnchecked("");
        };
        return <Button variant={'ghost'} colorScheme="green" leftIcon={<Check />} size={'sm'}
            onClick={() => check(index)}>check</Button>;
    };

    return (
        <Box mt={5}>
            <Restricted to={[Role.ADMIN]}>
                <Tag size={'lg'} colorScheme="orange">Unchecked orders: {countUnchecked} </Tag>
            </Restricted>
            <div className={`${classes['table-container']}
                                    ${colorMode === 'light' ? classes['pagination-light'] : classes['pagination-dark']}`}>
                <ResponsivePagination
                    total={Math.ceil(totalElements/pageSize)}
                    current={currentPage}
                    onPageChange={page => handlePageChange(page)}
                />
            </div>
            <TableContainer>
                    <Table variant='simple' size={isDesktop ? 'md': 'sm'}>
                        {isDesktop &&<TableCaption>*Product checked means the administrator has reviewed the order</TableCaption>}
                        <Thead>
                            <Tr>
                                <Restricted to={[Role.ADMIN]}>
                                    <Th>Client</Th>
                                </Restricted>
                                <Th>Product</Th>
                                {isDesktop && <Th>
                                    <Button variant={'ghost'} rightIcon={<Sort />} color={grayColor}
                                        onClick={() => setToggleIsPending(!toggleIsPending)}>
                                        Status
                                    </Button>
                                </Th>}
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
                                        {isDesktop && <Td>{isPendingTag(order.isPending!)}</Td>}
                                        <Td>{isCheckedTag(order.isChecked!)}</Td>
                                        <Td>{checkOrder(i)}</Td>
                                    </Tr>
                                ))
                                :
                                ordersByuser?.orderedProducts?.map((order, i) => (
                                    <Tr key={i}>
                                        <Td>{order.productName}</Td>
                                        {isDesktop && <Td>{isPendingTag(order.isPending!)}</Td>}
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
                                {isDesktop && <Th>Status</Th>}
                                <Th>Checked</Th>
                                <Restricted to={[Role.ADMIN]}>
                                    <Th>Action</Th>
                                </Restricted>
                            </Tr>
                        </Tfoot>
                    </Table>
                </TableContainer>
        </Box>
    );
};

export default Orders;