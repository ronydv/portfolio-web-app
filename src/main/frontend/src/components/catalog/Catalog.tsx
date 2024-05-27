import { Button, Checkbox, Flex, Text, Input, InputGroup, InputRightElement, Stack, useColorModeValue, Divider, IconButton, useDisclosure, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Spacer } from '@chakra-ui/react';
import classes from './catalog.module.css';
import { IoIosSearch as SearchIcon } from "react-icons/io";
import { GiHamburgerMenu as Burger } from "react-icons/gi";
import { FaCartShopping as Cart} from "react-icons/fa6";
import CatalogFilter from './CatalogFilter';
import ProductsGrid from './ProductsGrid';
import { useContext, useEffect, useRef, useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import useMatchMedia from '../../hooks/useMatchMedia';
import CartContext, { CartItemContext } from '../../context/CartProvider';
import { useLocation, useNavigate } from 'react-router-dom';

// check explanation below in the page for the useEffect(()=>,[currentPage]), and the useEffect(()=>,[selectedCategories,selecteTypes])
const Catalog = () => {
    const isDesktop = useMatchMedia();
    const cartColor = useColorModeValue('gray.600','gray.400');
    const cartContext=useContext<CartItemContext | undefined>(CartContext);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { data: sectors } = useFetch<Sector>("/api/v1/product-management/sector");
    const [sector, setSector] = useState<string>("");
    const [tabIndex, setTabIndex] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [browse, setBrowse] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const tabQuery:number = parseInt(queryParams.get('tab')!)||0;
    const categoriesQuery:string = queryParams.get('categories')!;
    const categories:string[] = categoriesQuery ? JSON.parse(categoriesQuery) : [];
    const typesQuery:string = queryParams.get('types')!;
    const types:string[]=typesQuery ? JSON.parse(typesQuery) : [];
    const pageQuery:number = parseInt(queryParams.get('page')!)||1;

    const [previousTab, setPreviousTab]=useState(tabIndex);//used to avoid conflicts when fetching values from query params
    const [previousPage, setPreviousPage]=useState(currentPage);
    useEffect(()=>{//load elements with query values in the first mount
        setSelectedCategories(categories);
        setSelectedTypes(types);
        setTabIndex(tabQuery);
        setPreviousTab(tabQuery);
        setCurrentPage(pageQuery);
        setPreviousPage(pageQuery);
        //console.log("current page: ",pageQuery,"previous page: ",previousPage);
    },[]);

    useEffect(()=>{//update values when the next tab is selected
        if(previousTab !== tabIndex){
            setCurrentPage(1)
            setSelectedCategories([]);
            setSelectedTypes([]);
            setTabIndex(tabIndex);
            setPreviousTab(tabIndex);//store the previous tab index , this is updated when the next tab is selected
            navigate(location.pathname, { replace: true });
        }
    },[tabIndex]);

    useEffect(()=>{//used as a flow control for the rendering of the previous state 
        if(pageQuery===previousPage) setPreviousPage(0);
    },[currentPage]);

    useEffect(()=>{//switch page to 1 whenever the filter is used
        if(previousPage !== currentPage)setCurrentPage(1);
    },[selectedCategories, selectedTypes]);

    const handleSearch = () => {
        const inputValue = inputRef.current!.value;
        if (inputValue !== undefined) {
            setBrowse(inputValue);
        }
    };
    const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === "") {
            setBrowse(e.target.value);
        }
    };

    return (
        <div className={`${classes.container} ${!isDesktop && classes.mobile}`}>
            {isDesktop ?<CatalogFilter sector={sector}
                                selectedCategories={selectedCategories}
                                selectedTypes={selectedTypes}
                                setSelectedCategories={setSelectedCategories}
                                setSelectedTypes={setSelectedTypes}
                                tabIndex={tabIndex}
                                sectors={sectors} />
                            :
                            <>
                                <IconButton isRound={true} variant='ghost' aria-label='Dark Mode'
                                    fontSize='20px' onClick={onOpen}
                                    color={'gray'}
                                    icon={<Burger />} />
                                <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
                                    <DrawerOverlay />
                                    <DrawerContent backgroundColor={'transparent'}>
                                        <DrawerBody>
                                            <CatalogFilter sector={sector}
                                                selectedCategories={selectedCategories}
                                                selectedTypes={selectedTypes}
                                                setSelectedCategories={setSelectedCategories}
                                                setSelectedTypes={setSelectedTypes}
                                                tabIndex={tabIndex}
                                                sectors={sectors} />
                                        </DrawerBody>
                                    </DrawerContent>
                                </Drawer>
                            </>
             }

            <div className={`${classes['right-container']} ${!isDesktop && classes['no-padding-left']}`}>
                <Flex direction={'row'} alignItems={'center'} mb={5}>
                    <InputGroup maxWidth={'60%'}>
                        <Input type='text' placeholder='Search Product' ref={inputRef}
                            onChange={(e) => handleChangeSearch(e)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch()} />
                        <InputRightElement  >
                            <SearchIcon className={classes['search-icon']}
                                onClick={handleSearch} />
                        </InputRightElement>
                    </InputGroup>
                    <Spacer />
                    <div className={classes['cart-container']}>
                        <Button variant={'outline'} fontSize={'26px'} color={cartColor}>
                            <Cart />
                        </Button>
                        <Flex className={classes['cart-value']} bgColor={'orange.200'}>
                            <Text as={'span'} fontWeight={'900'} fontSize={'14px'} color={'gray.600'}>{cartContext?.item.length}</Text>
                        </Flex>
                    </div>
                </Flex>
                <section>
                    <ProductsGrid browse={browse}
                        setSector={setSector}
                        selectedCategories={selectedCategories}
                        selectedTypes={selectedTypes}
                        tabIndex={tabIndex}
                        setTabIndex={setTabIndex}
                        sectors={sectors}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage} />
                </section>
            </div>
        </div>
    );
};

export default Catalog;
/*
This component renders multiple times because of the dependencies that gets value from query parameters.
In case the client came back from the  ProductDetails to this component, this component will load
the previous values (state from Catalog before the client has selected a product).
The previous values are loaded in ProductDetails through query parameters and used in Catalog.tsx.
A uncontrolled flow of renderings appears because of that and the current page and the tab index are set to 1 after
all the mounting, therefore the purpose of loading the last state of this components doesn't work, 
the following variables and functions are used to fix that problem and control the rendering flow
 -   [previousTab, setPreviousTab] [previousPage, setPreviousPage]
 -   useEffect(()=>,[currentPage]);
 -  useEffect(()=>,[selectedCategories,selecteTypes]);
*/