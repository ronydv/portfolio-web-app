import { Button, Input, InputGroup, InputRightElement, Table, Text, TableContainer, Tag, Tbody, Td, Th, Thead, Tr, useColorModeValue, Divider, TableCaption, useColorMode, IconButton, Spinner } from "@chakra-ui/react";
import { IoIosSearch as SearchIcon } from "react-icons/io";
import { FaUser as UserIcon} from "react-icons/fa";
import { FaSort as Sort } from "react-icons/fa6";
import ResponsivePagination from 'react-responsive-pagination';
import { RiDeleteBinFill as DeleteIcon } from "react-icons/ri";
import classes from './customers-panel.module.css';
import { useEffect, useRef, useState } from "react";
import { useSingleFetch } from "../../../hooks/useSingleFetch";
import useMatchMedia from "../../../hooks/useMatchMedia";
import useInterceptor from "../../../hooks/useInterceptor";
const CustomersDashboard = () => {
    
    const axiosPrivate = useInterceptor();
    const grayColor = useColorModeValue('gray.600', 'gray.400');
    const { colorMode } = useColorMode();
    const isDesktop = useMatchMedia();
    const [selectedButton, setSelectedButton]=useState(-1);

    //users section
    const [usersUrl, setUsersUrl] = useState("");
    const { data:users } = useSingleFetch<PaginatedUsers>(usersUrl);
    const [userId, setUserId]=useState(0);
    const usersPageSize = 6;
    const [currentUsersPage, setCurrentUsersPage] = useState(1);
    const [totalUsers, setTotalUsers] = useState(0);//set value to 0
    const handleUsersPageChange = (page: number) => setCurrentUsersPage(page);
    const inputRef = useRef<HTMLInputElement>(null);
    const [browse, setBrowse] = useState('');

    //orders section
    const [ordersUrl, setOrdersUrl] = useState("");
    const { data: orders, error, isLoading:loadingOrders } = useSingleFetch<Order>(ordersUrl);
    const ordersPageSize = 6;
    const [currentOrdersPage, setCurrentOrdersPage] = useState(1);
    const [toggleIsPending, setToggleIsPending] = useState(false);
    const [toggleIsChecked, setToggleIsChecked] = useState(false);
    const [totalOrders, setTotalOrders] = useState(0);
    const handleOrdersPageChange = (page: number) => setCurrentOrdersPage(page);
    const [isChecking, setIsChecking]=useState(false);//variable used upon checking/finalizing order
    const [isDeleting, setIsDeleting]=useState(false);//variable used upon deleting order

    useEffect(()=>{//load users
        if(browse){
            setUsersUrl(`/api/v1/users/search?page=${currentUsersPage}&page-size=${usersPageSize}&browse=${browse}`);
            setTotalUsers(users?.total!);
        }
        else {
            setUsersUrl(`/api/v1/users/user?page=${currentUsersPage}&page-size=${usersPageSize}`);
            setTotalUsers(users?.total!);
        }
    },[usersUrl, users, currentUsersPage, browse]);

    useEffect(() => {//load orders
        setOrdersUrl('/api/v1/orders/order' +
            `?page=${currentOrdersPage}&page-size=${ordersPageSize}&user-id=${userId}` +
            `&sort-pending=${toggleIsPending}&sort-checked=${toggleIsChecked}`);
        setTotalOrders(orders?.total!);
    }, [userId, ordersUrl, orders, toggleIsPending, toggleIsChecked, currentOrdersPage]);

    const isPendingTag = (isPending: boolean) => {
        if (isPending) return <Tag colorScheme={'red'}>{'Pending'}</Tag>;
        else return <Tag colorScheme={'green'}>{'Done'}</Tag>;
    };
    const isCheckedTag = (isChecked: boolean) => {
        if (isChecked) return <Tag colorScheme={'green'}>{'*Checked'}</Tag>;
        else return <Tag colorScheme={'orange'}>{'Unchecked'}</Tag>;
    };

    const sendOrderStatus= async (order:OrderView)=>{
        setIsChecking(true);
        const response = await axiosPrivate.put<OrderView>("/api/v1/orders/order",//add try catch if needed
            order, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        });
        setIsChecking(false);
        setOrdersUrl("");
    }

    const finalizeOrder = (order: OrderedProduct,buttonIndex:number) => {
        const finalize = (order: OrderedProduct) => {
            const finalizedOrder:OrderView={
                orderId:order.orderId,
                isPending:false,
                isChecked:order.isChecked };
            sendOrderStatus(finalizedOrder);
        };
        return (<Button variant={'ghost'} colorScheme="green" size={'sm'}
                        onClick={() => {
                                    setSelectedButton(buttonIndex);
                                    finalize(order);}}
                        >
                        {isChecking && selectedButton === buttonIndex ?
                                                <Spinner thickness='4px' speed='0.65s' color='teal.500' size='xs' />:'✓check'}
              </Button>);
    };

    const checkOrder = (order: OrderedProduct,buttonIndex:number) => {
        const check = (order: OrderedProduct) => {
            const checkedOrder:OrderView={
                orderId:order.orderId,
                isPending:order.isPending,
                isChecked:true };
            sendOrderStatus(checkedOrder);
        };
        return (<Button variant={'ghost'} colorScheme="green" size={'sm'}
                       onClick={() => {
                                    setSelectedButton(buttonIndex);
                                    check(order);}}
                        >
                        {isChecking && selectedButton === buttonIndex ?
                                                <Spinner thickness='4px' speed='0.65s' color='teal.500' size='xs' />:'✓check'}
              </Button>);
    };

    const deleteOrder = async(order: OrderedProduct) => {
        setIsDeleting(true);
        const response = await axiosPrivate.delete<string>(`/api/v1/orders/order/${order.orderId}`, {
            headers: {
                "Accept": "text/plain",//Expect plain text response from the backend
            },
            responseType: 'text'//the string response from the backend
        });
        setIsDeleting(false);
        setOrdersUrl("");//reset the orders table upon the selected order is deleted
    };

    const handleSearch = () => {
        const inputValue = inputRef.current!.value;
        if (inputValue !== undefined) {
            setCurrentUsersPage(1)//reset page position whenever a new value is submitted 
            setBrowse(inputValue);
        }
    };
    //when the value from the input is cleared, call the useEffect that uses the browse value dependency
    const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === "") {
            setCurrentUsersPage(1)//reset page position whenever the input is cleared
            setBrowse(e.target.value);
        }
    };

    return (
        <div>
            <InputGroup width={isDesktop ? '20vw' : '70vw'}>
                <Input type='text' placeholder='Search clients' ref={inputRef}                            
                            onChange={(e) => handleChangeSearch(e)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch()} />
                <InputRightElement  >
                    <SearchIcon className={classes['search-icon']} onClick={handleSearch} />
                </InputRightElement>
            </InputGroup>
            <div className={classes['users-orders-panel']}>
                {/* users table */}
                <div>
                    <div className={classes['users-list']}>
                        <Text placeContent={'center'} fontSize={'large'} fontWeight={'bold'} color={grayColor}>
                            Customer List
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
                                        <Th>Customer</Th>
                                        <Th>Email</Th>
                                        <Th>Phone</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {users?.users!.map( (user,i) => (
                                        <Tr key={user.id}>
                                            <Td paddingLeft={1}>
                                                <Button key={user.id} leftIcon={<UserIcon />} 
                                                        isActive={i === selectedButton}
                                                        variant={i === selectedButton ? 'solid': 'ghost'} 
                                                        colorScheme={i === selectedButton ? 'teal':''} 
                                                        onClick={() => {
                                                            setUserId(user.id!);
                                                            setSelectedButton(i);
                                                            setCurrentOrdersPage(1);//reset orders position when a new user is selected
                                                        }}>{user.name}
                                                </Button>
                                            </Td>
                                            <Td color={i === selectedButton ? '#3182ce':''} 
                                                textDecoration={i === selectedButton ? 'underline':''}>{user.email}</Td>
                                            <Td color={i === selectedButton ? '#3182ce':''} 
                                                textDecoration={i === selectedButton ? 'underline':''}>{user.phone}</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
                {/* orders table */}
                <div>
                    <Divider />
                    {!error ?
                        <>
                            <Text placeContent={'center'} fontSize={'large'} fontWeight={'bold'} color={grayColor}>
                                Customer orders: "<span style={{ color: 'blue' }}>{orders?.userName}</span>"
                            </Text>

                            {loadingOrders ? 'loading orders...' :
                                <div className={`${classes['paginator-container']}
                                        ${colorMode === 'light' ? classes['pagination-light'] : classes['pagination-dark']}`}>
                                    <ResponsivePagination
                                        total={Math.ceil(totalOrders / ordersPageSize)}
                                        current={currentOrdersPage}
                                        onPageChange={page => handleOrdersPageChange(page)}
                                    />
                                </div>}

                            <TableContainer width={isDesktop ? '45vw' : '70vw'}>
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
                                        {orders?.orderedProducts?.length! > 0 && orders?.orderedProducts?.map((order, i) => (
                                            <Tr key={i}>
                                                <Td>{order.productName}</Td>
                                                <Td>
                                                    {isPendingTag(order.isPending!)}
                                                    {finalizeOrder(order,i)}
                                                </Td>
                                                <Td>
                                                    {isCheckedTag(order.isChecked!)}
                                                    {checkOrder(order,i)}
                                                </Td>
                                                <Td paddingLeft={1}>
                                                    <IconButton isRound={true} variant='ghost' aria-label='Dark Mode'
                                                        onClick={() => {
                                                            deleteOrder(order);
                                                            setSelectedButton(i);
                                                        }}
                                                        fontSize='20px'
                                                        isDisabled={!order.isPending && order.isChecked}/* TODO: ADD BROWSE FUNCTION */
                                                        color={'red'}
                                                        icon={isDeleting && selectedButton === i ?
                                                            <Spinner thickness='4px' speed='0.65s' color='teal.500' size='xs' />
                                                            :
                                                            <DeleteIcon />
                                                        } />
                                                </Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </>
                        :
                        <Text width={isDesktop ? '45vw' : '70vw'}>Customer does not contain orders</Text>}
                </div>

            </div>
        </div>
    );
};

export default CustomersDashboard;