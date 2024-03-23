import {Card, CardHeader, Heading,Text, CardBody, Box, Spacer, IconButton, Flex, Stat, StatArrow, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react";
import { IoBagHandleSharp as Bag} from "react-icons/io5";
import { BsCashCoin as Cash} from "react-icons/bs";
import { PiWarningOctagon as Warning } from "react-icons/pi";
import classes from "./products-panel.module.css";

const StatsCards = () => {
    return (
        <section className={classes.stats}>
{/* ------------------------------------------------Total orders card */}            
            <Card  pl={5}>
                <CardHeader mb={-5}>
                    <IconButton isRound={true} variant='ghost' aria-label='Dark Mode'
                        fontSize='30px' color={'blue.500'} icon={<Bag />} />
                </CardHeader>
                <CardBody >
                    <Text mb='2' fontSize='sm'>Total orders</Text>
                    <Flex direction={"row"} alignItems={"baseline"}>
                        <Heading size='md'>
                            {4545}&emsp; &emsp;&emsp;&emsp;
                        </Heading>
                        <Spacer />
                        <Stat>
                            <StatHelpText display={'flex'}flexDirection={"row"} alignItems={"center"}>
                                <StatArrow type='increase' boxSize={6} />
                                <Text fontSize={'md'}>{23.36}%</Text>
                            </StatHelpText>
                        </Stat>
                    </Flex>
                </CardBody>
            </Card>
{/* --------------------------------------Revenue card */}
            <Card  pl={5}>
                <CardHeader mb={-5}>
                    <IconButton isRound={true} variant='ghost' aria-label='Dark Mode'
                        fontSize='30px' color={'green.500'} icon={<Cash />} />
                </CardHeader>
                <CardBody >
                    <Text mb='2' fontSize='sm'>Monthly revenue</Text>
                    <Flex direction={"row"} alignItems={"baseline"}>
                        <Heading size='md'>
                            {3425}&emsp; &emsp;&emsp;&emsp;
                        </Heading>
                        <Spacer />
                        <Stat>
                            <StatHelpText display={'flex'}flexDirection={"row"} alignItems={"center"}>
                                <StatArrow type='increase' boxSize={6} />
                                <Text fontSize={'md'}>{20.20}%</Text>
                            </StatHelpText>
                        </Stat>
                    </Flex>
                </CardBody>
            </Card>
{/* ---------------------------------Out of Stock */}
            <Card  pl={5}>
                <CardHeader mb={-5}>
                    <IconButton isRound={true} variant='ghost' aria-label='Dark Mode'
                        fontSize='30px' color={'orange.500'} icon={<Warning />} />
                </CardHeader>
                <CardBody >
                    <Text mb='2' fontSize='sm'>Out of stock</Text>
                    <Flex direction={"row"} alignItems={"baseline"}>
                        <Heading size='md'>
                            {34} items&emsp; &emsp;&emsp;&emsp;
                        </Heading>
                    </Flex>
                </CardBody>
            </Card>
        </section>
    );
};

export default StatsCards;