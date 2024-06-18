import { Button, Input, InputGroup, InputRightElement, Table, Text, TableContainer, Tag, Tbody, Td, Th, Thead, Tr, useColorModeValue, Divider, TableCaption } from "@chakra-ui/react";
import { IoIosSearch as SearchIcon } from "react-icons/io";
import { FaUser as UserIcon} from "react-icons/fa";
import { FaSort as Sort } from "react-icons/fa6";
import { CiCircleCheck as Check } from "react-icons/ci";
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
    const isDesktop = useMatchMedia();
    const { data:users } = useFetch<User>("/api/v1/users/user");
    const [selectedUser, setSelectedUser]=useState(0);
    const [userId, setUserId]=useState(0);
    const [url, setUrl] = useState("");
    const [totalOrders, setTotalOrders] = useState(0);
    const pageSize = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const [toggleIsPending, setToggleIsPending] = useState(false);
    const [toggleIsChecked, setToggleIsChecked] = useState(false);
    const { data: orders, error } = useSingleFetch<Order>(url);
    const [response, setResponse] = useState<OrderView>({});

    useEffect(() => {
        setUrl('/api/v1/orders/order' +
            `?page=${currentPage}&page-size=${pageSize}&user-id=${userId}` +
            `&sort-pending=${toggleIsPending}&sort-checked=${toggleIsChecked}`);

        setTotalOrders(orders?.total!);
    }, [userId, url, orders, toggleIsPending, toggleIsChecked, response]);

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
        setResponse(response.data);
        setUrl("");
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
                        <TableContainer width={isDesktop ? '40vw' : '70vw'}>
                            <Table variant='simple' size={isDesktop ? 'md' : 'sm'}>
                            <TableCaption placement="top" fontSize={'large'} fontWeight={'bold'} color={grayColor}>
                                    Customer list, click in the user to check its orders
                            </TableCaption>
                                <Thead>
                                    <Tr>
                                        <Th>Client</Th>
                                        <Th>Email</Th>
                                        <Th>Phone</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {users.map( (user,i) => (
                                        <Tr key={user.id}>
                                            <Td paddingLeft={1}>
                                                <Button key={user.id} leftIcon={<UserIcon />} 
                                                        isActive={i === selectedUser}
                                                        variant={i === selectedUser ? 'solid': 'ghost'} 
                                                        colorScheme={i === selectedUser ? 'red':''} 
                                                        onClick={() => {
                                                            setUserId(user.id!);
                                                            setSelectedUser(i);
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
                <Text as={'h2'} color={grayColor} fontWeight={'bold'}></Text>
                <Divider/>
                    <TableContainer width={isDesktop ? '40vw' : '70vw'}>
                        <Table variant='simple' size={isDesktop ? 'md' : 'sm'}>
                        <TableCaption placement="top" fontSize={'large'} fontWeight={'bold'} color={grayColor}>
                                Requests from client: "{orders?.userName}"
                        </TableCaption>
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
                                {orders?.orderedProducts?.map((order,i) => (
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