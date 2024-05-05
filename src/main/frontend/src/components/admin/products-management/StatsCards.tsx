import {Card, CardHeader, Heading,Text, CardBody, Box, Spacer, IconButton, Flex, ResponsiveValue } from "@chakra-ui/react";
import { SiAltiumdesigner as Designs } from "react-icons/si";
import { FaGears as Machinery } from "react-icons/fa6";
import { LiaMicrochipSolid as Automations } from "react-icons/lia";
import classes from "./products-panel.module.css";
import useMatchMedia from "../../../hooks/useMatchMedia";
import { IconType } from "react-icons";
import { useSingleFetch } from "../../../hooks/useSingleFetch";
import { useFetch } from "../../../hooks/useFetch";
import { useEffect, useState } from "react";
import useInterceptor from "../../../hooks/useInterceptor";

type StatCardProps={
    sector:string;
    amount:number;
    icon:IconType;
    color?:string
}
const StatsCard = ({ sector, amount, icon, color }: StatCardProps) => {
    const isDesktop = useMatchMedia();
    const IconComponent: IconType = icon;
    return (
        <Card pl={5} w={isDesktop ? '' : '240px'}>
            <CardHeader mb={-5}>
                <IconButton isRound={true} variant='ghost' aria-label='Dark Mode'
                    fontSize='30px' color={color} icon={<IconComponent />} />
            </CardHeader>
            <CardBody >
                <Text mb='2' fontSize='md'>Sector: {sector}</Text>
                <Flex direction={"row"} alignItems={"baseline"}>
                    <Heading size='md'>
                        {amount} items&emsp; &emsp;&emsp;&emsp;
                    </Heading>
                </Flex>
            </CardBody>
        </Card>
    );
};
const StatsCards = () => {
    const axiosPrivate = useInterceptor();
    const icons: IconType[]=[Designs, Machinery,Automations]
    const colors:string[]=["orange.500","cyan.500","green.400"];
    const {data:sectors}=useFetch<Sector>("/api/v1/product-management/sector");
    const [itemsSector, setItemsSector]=useState<number[]>([])

    useEffect(() => {
        const getAmmounts = async () => {
            if (sectors) {
                for (let i = 0; i < sectors.length; i++) {
                    try {
                        const response = await axiosPrivate.get<number>(`/api/v1/product-management/products/sector/${sectors[i].name}`);
                        setItemsSector(prevItems => [...prevItems, response.data]);
                    } catch (error) {console.log(error);}
                }
            }
        };
        getAmmounts();
    }, [sectors]);
    return (
        <section className={classes.stats}>
            {sectors?.map((sector, i) => (
                <StatsCard key={i}
                           sector={sector.name}
                           amount={itemsSector[i]}
                           icon={icons[i]}
                           color={colors[i]} />
            ))}
        </section>
    );
};

export default StatsCards;