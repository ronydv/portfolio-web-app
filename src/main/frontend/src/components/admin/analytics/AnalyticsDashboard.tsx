import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import OrderStatuses from "./OrderStatuses";
import classes from './analytics-panel.module.css';
import useMatchMedia from "../../../hooks/useMatchMedia";
import CommonOrders from "./CommonOrders";
import OrdersByMonth from "./OrdersByMonth";

export type ChartData={//used in OrderStatuses, CommonOrders
    value: number; 
    name: string
}

const AnalyticsDashboard = () => {
    const darkMode = useColorModeValue('gray.600', 'gray.400');
    return ( 
        <div className={classes['analytics-pane']}>
            <Flex direction={'column'}>
                <Box>
                    <Text as={'h1'} fontSize={'20px'} mb={2} fontWeight={'bold'} color={darkMode}>
                        Order Statuses
                    </Text>
                    <OrderStatuses />
                </Box>
                <Box>
                    <Text as={'h1'} fontSize={'20px'} mb={2} fontWeight={'bold'} color={darkMode}>
                        Most requested orders
                    </Text>
                    <CommonOrders />
                </Box>
                <Box>
                    <Text as={'h1'} fontSize={'20px'} mb={2} fontWeight={'bold'} color={darkMode}>
                        Orders per month
                    </Text>
                    <OrdersByMonth />
                </Box>
                
            </Flex>
        </div>
     );
}
 
export default AnalyticsDashboard;