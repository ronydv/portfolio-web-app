import ReactECharts from 'echarts-for-react';
import useMatchMedia from '../../../hooks/useMatchMedia';
import { useColorMode } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useFetch } from '../../../hooks/useFetch';

const OrdersByMonth = () => {
    const isDesktop = useMatchMedia();
    const { colorMode } = useColorMode();
    const [url, setUrl]= useState("");
    const { data: ordersByMonth } = useFetch<MonthlyOrders>(url);
    const [chartData, setChartData]=useState<Array<number>>([]);

    useEffect(()=>{
        setUrl("/api/v1/orders/order/monthly")
        if(ordersByMonth.length > 0){
            const orders:number[]=ordersByMonth.map((order)=> order.amount );
            setChartData(orders);
        }
    },[ordersByMonth,url]);

    const option = {
        tooltip: {
            trigger: 'item',
        },
        legend: {
            top: '5%',
            left: 'center',
            textStyle: {
                color: `${colorMode === 'light' ? '#4a5568' : '#a0aec0'}`,
              fontSize: 14,
            },
        },
        xAxis: {
            type: 'category',
            data: ['Enero', 'Febrero','Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre','Octubre','Noviembre','Diciembre']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: chartData,
                type: 'line',
                symbolSize: 8,
                tooltip: {
                    valueFormatter: (value: number) => {
                        return value + ' Pedidos';
                    }
                }
            },
        ]
    };

    return <ReactECharts option={option} style={{ height: 420, width: isDesktop ? '45vw' : '60vw' }} />;
}
 
export default OrdersByMonth;