import { Box, Button, Card, CardBody, CardHeader, Flex, Heading, Input, InputGroup, InputLeftElement, InputRightElement, Spacer, Text } from "@chakra-ui/react";
import { IoIosSearch as SearchIcon } from "react-icons/io";
import { FaCartPlus as AddProductIcon } from "react-icons/fa";
import classes from "./products-panel.module.css";
import { Link } from "react-router-dom";
import StatsCards from "./StatsCards";
import ProductsTable from "./ProductsTable";
type ActiveButtonProps={
    setActiveButton?: React.Dispatch<React.SetStateAction<string>>
}
const ProductsDashboard = ({ setActiveButton }: ActiveButtonProps) => {
    return (
        <section >
            <div className={classes['search-bar']}>
                <div>
                    <InputGroup>
                        <InputRightElement pointerEvents='none'>
                            <SearchIcon color='gray.300' />
                        </InputRightElement>
                        <Input type='tel' placeholder='Search Product' />
                    </InputGroup>
                </div>
                <Spacer />
                <Link to="add-product">
                    <Button variant={'outline'} color={'blue.300'} 
                            onClick={() => setActiveButton && setActiveButton("Add Product")}
                            leftIcon={<AddProductIcon/>}>
                        Add Product
                    </Button>
                </Link>
            </div>
            <StatsCards />
            {/* table here */}
            <ProductsTable/>
        </section>
    );
};

export default ProductsDashboard;