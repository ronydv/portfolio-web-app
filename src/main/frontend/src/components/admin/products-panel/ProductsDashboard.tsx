import { Box, Button, Card, CardBody, CardHeader, Flex, Heading, Input, InputGroup, InputLeftElement, InputRightElement, Spacer, Text } from "@chakra-ui/react";
import { IoIosSearch as SearchIcon } from "react-icons/io";
import { FaCartPlus as AddProductIcon } from "react-icons/fa";
import classes from "./products-panel.module.css";
import { Link } from "react-router-dom";
import StatsCards from "./StatsCards";
import ProductsTable from "./ProductsTable";
import useMatchMedia from "../../../hooks/useMatchMedia";
type ActiveButtonProps={
    setActiveButton?: React.Dispatch<React.SetStateAction<string>>
}
const ProductsDashboard = ({ setActiveButton }: ActiveButtonProps) => {
    const isDesktop = useMatchMedia();
    return (
        <section >
            <div className={classes['search-bar']}>
                <Flex mr={3}>
                    <InputGroup>
                        <InputRightElement pointerEvents='none' >
                            <SearchIcon color='gray.300'/>
                        </InputRightElement>
                        <Input type='text' placeholder='Search Product'/>
                    </InputGroup>
                </Flex>
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
            <ProductsTable/>
        </section>
    );
};

export default ProductsDashboard;