import { Button, Checkbox, Flex, Text, Input, InputGroup, InputRightElement, Stack, useColorModeValue, Divider, IconButton, useDisclosure, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Spacer } from '@chakra-ui/react';
import classes from './catalog.module.css';
import { IoIosSearch as SearchIcon } from "react-icons/io";
import { GiHamburgerMenu as Burger } from "react-icons/gi";
import { FaCartShopping as Cart} from "react-icons/fa6";
import CatalogFilter from './CatalogFilter';
import ProductsGrid from './ProductsGrid';
import { useContext, useRef, useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import useMatchMedia from '../../hooks/useMatchMedia';
import CartContext, { CartItemContext } from '../../context/CartProvider';


const Catalog = () => {
    const isDesktop = useMatchMedia();
    const cartColor = useColorModeValue('gray.600','gray.400');
    const cartContext=useContext<CartItemContext | undefined>(CartContext);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { data: sectors } = useFetch<Sector>("/api/v1/product-management/sector");
    const [tabIndex, setTabIndex] = useState(0);
    const [browse, setBrowse] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const [sector, setSector] = useState<string>("");

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
                        setSelectedCategories={setSelectedCategories}
                        setSelectedTypes={setSelectedTypes}
                        tabIndex={tabIndex}
                        setTabIndex={setTabIndex}
                        sectors={sectors} />
                </section>
            </div>
        </div>
    );
};

export default Catalog;