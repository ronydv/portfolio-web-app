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
import axios from "axios";

const Orders = () => {
    const isDesktop = useMatchMedia();
    const axiosPrivate = useInterceptor();
    const { auth: user } = useAuthContext();
    const grayColor = useColorModeValue('gray.600', 'gray.400');
    const { colorMode } = useColorMode();
    const pageSize = 6;
    const [totalElements, setTotalElements] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [fetchByUser, setFetchByUser] = useState("");
    const [fetchAll, setFetchAll] = useState("");
    const [fetchStatuses, setFetchStatuses] = useState("");
    const { data: ordersByuser, error: errorFromOrdersByUser, isLoading:loadingUserOrders } = useSingleFetch<Order>(fetchByUser);
    const { data: orders, error: errorFromOrders, isLoading:loadingAllOrders } = useFetch<OrderView>(fetchAll);
    const { data: statuses, error: errorFromStatuses } = useSingleFetch<OrderStatus>(fetchStatuses);
    const handlePageChange = (page: number) => setCurrentPage(page);
    const [toggleIsPending, setToggleIsPending] = useState(false);
    const [toggleIsChecked, setToggleIsChecked] = useState(false);
    const [response, setResponse] = useState<OrderView>({});
    const [isChecking, setIsChecking]= useState(false);
    const [selectedButton, setSelectedButton]=useState(-1);
    const [tableMessage, setTableMessage]=useState("");

    useEffect(() => {
        if (axios.isAxiosError(errorFromOrdersByUser)) setTableMessage(errorFromOrdersByUser.response?.data.message);
    }, [errorFromOrdersByUser]);

    useEffect(() => {
        //orders for admin view
        if (user.user?.authorities?.find((role: Role) => role.authority === Role.ADMIN)) {
            setFetchAll('/api/v1/orders/order/all' +
                `?page=${currentPage}&page-size=${pageSize}&sort-pending=${toggleIsPending}&sort-checked=${toggleIsChecked}`);
            orders.length > 0 && setTotalElements(orders[0].total!);
            setFetchStatuses('/api/v1/orders/order/status');
            if(orders){
                setTableMessage("*Producto checkeado significa que el administrador ha revisado la orden");
            }
        //orders for user view
        } else {
            setFetchByUser('/api/v1/orders/order' +
                `?page=${currentPage}&page-size=${pageSize}&user-id=${user.user?.id}` +
                `&sort-pending=${toggleIsPending}&sort-checked=${toggleIsChecked}`);
            setTotalElements(ordersByuser?.total!);
            if(ordersByuser){
                setTableMessage("*Producto checkeado significa que el administrador ha revisado la orden");
            }
        }
    }, [orders, ordersByuser, toggleIsChecked, toggleIsPending, currentPage, response]);

    const isPendingTag = (isPending: boolean) => {
        if (isPending) return <Tag colorScheme={'red'}>{'Pendiente'}</Tag>;
        else return <Tag colorScheme={'green'}>{'Finalizado'}</Tag>;
    };
    const isCheckedTag = (isChecked: boolean) => {
        if (isChecked) return <Tag colorScheme={'green'}>{'*Checkeado'}</Tag>;
        else return <Tag colorScheme={'orange'}>{'No checkeado'}</Tag>;
    };

    const checkOrder = (index: number) => {
        const check = async (index: number) => {
            orders[index].isChecked = true;
            setIsChecking(true)
            const response = await axiosPrivate.put<OrderView>("/api/v1/orders/order",//add try catch if needed
                orders[index], {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
            });
            setIsChecking(false);
            setResponse(response.data);
            setFetchStatuses("");//update the url so the useEffect from above will be called and therefore updated data will be received 
        };
        return <Button variant={'ghost'} colorScheme="green" leftIcon={<Check />} size={'sm'}
                        onClick={() => {
                                    setSelectedButton(index);
                                    check(index);
                }}>{isChecking && selectedButton === index ?'Checkeando...':'Checkear'}
            </Button>;
    };

    return (
        <Box mt={5}>
            <Restricted to={[Role.ADMIN]}>
                <Tag size={'lg'} colorScheme="orange">Pedidos sin checkear: {statuses?.uncheckedOrders} </Tag>
            </Restricted>
            <div className={`${classes['table-container']}
                                    ${colorMode === 'light' ? classes['pagination-light'] : classes['pagination-dark']}`}>
                <ResponsivePagination
                    total={Math.ceil(totalElements/pageSize)}
                    current={currentPage}
                    onPageChange={page => handlePageChange(page)}
                />
            </div>
            <TableContainer width={!isDesktop ? '60vw': ''}>
                    <Table variant='simple' size={isDesktop ? 'md': 'sm'}>
                        {<TableCaption>{tableMessage}</TableCaption>}
                        <Thead>
                            <Tr>
                                <Restricted to={[Role.ADMIN]}>
                                    <Th>Cliente</Th>
                                </Restricted>
                                <Th>Producto</Th>
                                <Th>
                                    <Button variant={'ghost'} rightIcon={<Sort />} color={grayColor}
                                        onClick={() => setToggleIsPending(!toggleIsPending)}>
                                        Status
                                    </Button>
                                </Th>
                                <Th>
                                    <Button variant={'ghost'} rightIcon={<Sort />} color={grayColor}
                                        onClick={() => setToggleIsChecked(!toggleIsChecked)}>
                                        Checkeado
                                    </Button>
                                </Th>
                                <Restricted to={[Role.ADMIN]}>
                                    <Th>Acción</Th>
                                </Restricted>
                            </Tr>
                        </Thead>
                        {loadingAllOrders || loadingUserOrders ? <p>Cargando...</p>:
                        <Tbody>
                        {user.user?.authorities?.find((role: Role) => role.authority === Role.ADMIN) ?
                            orders?.map((order, i) => (
                                <Tr key={i}>
                                    <Td>{order.userName}</Td>
                                    <Td>{order.productName}</Td>
                                    <Td>{isPendingTag(order.isPending!)}</Td>
                                    <Td>{isCheckedTag(order.isChecked!)}</Td>
                                    <Td>{checkOrder(i)}</Td>
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
                        }
                        <Tfoot>
                            <Tr>
                                <Restricted to={[Role.ADMIN]}>
                                    <Th>Cliente</Th>
                                </Restricted>
                                <Th>Producto</Th>
                                <Th>Status</Th>
                                <Th>Checkeado</Th>
                                <Restricted to={[Role.ADMIN]}>
                                    <Th>Acción</Th>
                                </Restricted>
                            </Tr>
                        </Tfoot>
                    </Table>
                </TableContainer>
        </Box>
    );
};

export default Orders;