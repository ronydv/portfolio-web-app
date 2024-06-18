import { Button, Input, InputGroup, InputRightElement, Table, Text, TableContainer, Tag, Tbody, Td, Th, Thead, Tr, useColorModeValue, Divider, TableCaption, useColorMode } from "@chakra-ui/react";
import { IoIosSearch as SearchIcon } from "react-icons/io";
import { FaUser as UserIcon} from "react-icons/fa";
import { FaSort as Sort } from "react-icons/fa6";
import ResponsivePagination from 'react-responsive-pagination';
import { useFetch } from "../../../hooks/useFetch";
import classes from './customers-panel.module.css';
import { useEffect, useState } from "react";
import { useSingleFetch } from "../../../hooks/useSingleFetch";
import useMatchMedia from "../../../hooks/useMatchMedia";
import useInterceptor from "../../../hooks/useInterceptor";
const CustomersDashboard = () => {
    //TODO: ADD PAGINATION
    const axiosPrivate = useInterceptor();
    const grayColor = useColorModeValue('gray.600', 'gray.400');
    const { colorMode } = useColorMode();
    const isDesktop = useMatchMedia();

    //users section
    const [usersUrl, setUsersUrl] = useState("");
    const { data:users } = useSingleFetch<PaginatedUsers>(usersUrl);
    const [selectedUser, setSelectedUser]=useState(0);
    const [userId, setUserId]=useState(0);
    const usersPageSize = 6;
    const [currentUsersPage, setCurrentUsersPage] = useState(1);
    const [totalUsers, setTotalUsers] = useState(0);//set value to 0
    const handleUsersPageChange = (page: number) => setCurrentUsersPage(page);

    //orders section
    const [ordersUrl, setOrdersUrl] = useState("");
    const { data: orders, error } = useSingleFetch<Order>(ordersUrl);
    const ordersPageSize = 6;
    const [currentOrdersPage, setCurrentOrdersPage] = useState(1);
    const [toggleIsPending, setToggleIsPending] = useState(false);
    const [toggleIsChecked, setToggleIsChecked] = useState(false);
    const [totalOrders, setTotalOrders] = useState(0);
    const handleOrdersPageChange = (page: number) => setCurrentOrdersPage(page);

    useEffect(()=>{//load users
        setUsersUrl(`/api/v1/users/user?page=${currentUsersPage}&page-size=${usersPageSize}`);
        setTotalUsers(users?.total!);
        console.log(totalUsers)
    },[usersUrl, users, currentUsersPage]);

    useEffect(() => {//load orders
        setOrdersUrl('/api/v1/orders/order' +
            `?page=${currentOrdersPage}&page-size=${ordersPageSize}&user-id=${userId}` +
            `&sort-pending=${toggleIsPending}&sort-checked=${toggleIsChecked}`);
        setTotalOrders(orders?.total!);
    }, [userId, orders, toggleIsPending, toggleIsChecked, currentOrdersPage]);

    const isPendingTag = (isPending: boolean) => {
        if (isPending) return <Tag colorScheme={'red'}>{'Pending'}</Tag>;
        else return <Tag colorScheme={'green'}>{'Done'}</Tag>;
    };
    const isCheckedTag = (isChecked: boolean) => {
        if (isChecked) return <Tag colorScheme={'green'}>{'*Checked'}</Tag>;
        else return <Tag colorScheme={'orange'}>{'Unchecked'}</Tag>;
    };

    const sendOrderStatus= async (order:OrderView)=>{
        const response = await axiosPrivate.put<OrderView>("/api/v1/orders/order",//add try catch if needed
            order, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        });
        setOrdersUrl("");
    }

    const finalizeOrder = (order: OrderedProduct) => {
        const finalize = (order: OrderedProduct) => {
            const finalizedOrder:OrderView={
                orderId:order.orderId,
                isPending:false,
                isChecked:order.isChecked };
            sendOrderStatus(finalizedOrder);
        };
        return (<Button variant={'ghost'} colorScheme="green" size={'sm'}
                       onClick={() => finalize(order)}>✓check
              </Button>);
    };

    const checkOrder = (order: OrderedProduct) => {
        const check = (order: OrderedProduct) => {
            const checkedOrder:OrderView={
                orderId:order.orderId,
                isPending:order.isPending,
                isChecked:true };
            sendOrderStatus(checkedOrder);
        };
        return (<Button variant={'ghost'} colorScheme="green" size={'sm'}
                       onClick={() => check(order)}>✓check
              </Button>);
    };
    
    return (
        <div>
            <InputGroup width={isDesktop ? '20vw' : '70vw'}>
                <Input type='text' placeholder='Search Customer' />
                <InputRightElement  >
                    <SearchIcon className={classes['search-icon']} />
                </InputRightElement>
            </InputGroup>
            <div className={classes['users-orders-panel']}>
                <div>
                    <div className={classes['users-list']}>
                        <Text placeContent={'center'} fontSize={'large'} fontWeight={'bold'} color={grayColor}>
                            Customers List
                        </Text>
                        <div className={`${classes['paginator-container']}
                                    ${colorMode === 'light' ? classes['pagination-light'] : classes['pagination-dark']}`}>
                            <ResponsivePagination
                                total={Math.ceil(totalUsers / usersPageSize)}
                                current={currentUsersPage}
                                onPageChange={page => handleUsersPageChange(page)}
                            />
                        </div>
                        <TableContainer width={isDesktop ? '40vw' : '70vw'}>
                            <Table variant='simple' size={isDesktop ? 'md' : 'sm'}>
                                <Thead>
                                    <Tr>
                                        <Th>Client</Th>
                                        <Th>Email</Th>
                                        <Th>Phone</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {users?.users.map( (user,i) => (
                                        <Tr key={user.id}>
                                            <Td paddingLeft={1}>
                                                <Button key={user.id} leftIcon={<UserIcon />} 
                                                        isActive={i === selectedUser}
                                                        variant={i === selectedUser ? 'solid': 'ghost'} 
                                                        colorScheme={i === selectedUser ? 'red':''} 
                                                        onClick={() => {
                                                            setUserId(user.id!);
                                                            setSelectedUser(i);
                                                            setCurrentOrdersPage(1);
                                                        }}>{user.name}
                                                </Button>
                                            </Td>
                                            <Td color={i === selectedUser ? '#aa2d2f':''} 
                                                textDecoration={i === selectedUser ? 'underline':''}>{user.email}</Td>
                                            <Td color={i === selectedUser ? '#aa2d2f':''} 
                                                textDecoration={i === selectedUser ? 'underline':''}>{user.phone}</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>

                <div>
                    <Divider />
                    <Text placeContent={'center'} fontSize={'large'} fontWeight={'bold'} color={grayColor}>
                        Orders details from customer "{orders?.userName}"
                    </Text>
                    <div className={`${classes['paginator-container']}
                                    ${colorMode === 'light' ? classes['pagination-light'] : classes['pagination-dark']}`}>
                        <ResponsivePagination
                            total={Math.ceil(totalOrders / ordersPageSize)}
                            current={currentOrdersPage}
                            onPageChange={page => handleOrdersPageChange(page)}
                        />
                    </div>
                    <TableContainer width={isDesktop ? '40vw' : '70vw'}>
                        <Table variant='simple' size={isDesktop ? 'md' : 'sm'}>
                            <Thead>
                                <Tr>
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

                                </Tr>
                            </Thead>
                            <Tbody>
                                {orders?.orderedProducts?.map((order, i) => (
                                    <Tr key={i}>
                                        <Td>{order.productName}</Td>
                                        <Td>
                                            {isPendingTag(order.isPending!)}
                                            {finalizeOrder(order)}
                                        </Td>
                                        <Td>
                                            {isCheckedTag(order.isChecked!)}
                                            {checkOrder(order)}
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </div>

            </div>
        </div>
    );
};

export default CustomersDashboard;