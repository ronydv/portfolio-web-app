import {Button, Flex, Input, InputGroup, InputRightElement, Spacer } from "@chakra-ui/react";
import { IoIosSearch as SearchIcon } from "react-icons/io";
import { FaCartPlus as AddProductIcon } from "react-icons/fa";
import classes from "./products-panel.module.css";
import { Link } from "react-router-dom";
import StatsCards from "./StatsCards";
import ProductsTable from "./ProductsTable";
import { useRef, useState } from "react";
type ActiveButtonProps={
    setActiveButton?: React.Dispatch<React.SetStateAction<string>>
}
const ProductsDashboard = ({ setActiveButton }: ActiveButtonProps) => {
    const [browse, setBrowse] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    // update setBrowse only on click, it will trigger the useEffect from ProductsTable.tsx for rendering elements
    // with specific keywords to show it in the table
    const handleSearch = ()=>{
        const inputValue = inputRef.current!.value;
        if(inputValue !== undefined){
            setBrowse(inputValue);
        }
    }
    // When the input value match a "" value, this will change the value of setBrowse 
    // and therefore it will run the useEffect in ProductsTable.tsx to re-render all default products in the table again
    const handleChangeSearch=(e: React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.value === ""){
            setBrowse(e.target.value);
        }
    }
    return (
        <section >
            <div className={classes['search-bar']}>
                <Flex mr={3}>
                    <InputGroup>
                        <Input type='text' placeholder='Search Product' ref={inputRef}
                               onChange={(e)=>handleChangeSearch(e)}
                               onKeyDown={(e) => e.key === "Enter" && handleSearch()}/>
                        <InputRightElement  >
                            <SearchIcon className={classes['search-icon']}
                                        onClick={handleSearch}/>
                        </InputRightElement>
                    </InputGroup>
                </Flex>
                <Spacer />
                <Link to="add-product">
                    <Button variant={'outline'} colorScheme='blue'
                            //switch the value within MainDashboard.tsx to render the <Outlet/>, check <div className={classes.outlet}>
                            onClick={() => setActiveButton && setActiveButton("Add Product")}
                            leftIcon={<AddProductIcon/>}>
                        Add Product
                    </Button>
                </Link>
            </div>
            <StatsCards />
            <ProductsTable browse={browse} setActiveButton={setActiveButton}/>
        </section>
    );
};

export default ProductsDashboard;