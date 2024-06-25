import ReactECharts from 'echarts-for-react';
import { useSingleFetch } from '../../../hooks/useSingleFetch';
import { useEffect, useState } from 'react';
import { useColorMode } from '@chakra-ui/react';
import useMatchMedia from '../../../hooks/useMatchMedia';
import { ChartData } from './AnalyticsDashboard';


const OrderStatuses = () => {
	const isDesktop = useMatchMedia();
	const { colorMode } = useColorMode();
	const { data: statuses, error: errorFromStatuses } = useSingleFetch<OrderStatus>('/api/v1/orders/order/status');
	const [chartData, setChartData] = useState<Array<ChartData>>([]);

	useEffect(() => {
		if (statuses && statuses.dataForStatistics) {
			const statusesArray: Array<ChartData> = statuses.dataForStatistics.map(status => ({
				value: status.value,
				name: status.dataName,
			}));
			setChartData(statusesArray);
		}
	}, [statuses]);

	const option = {
		tooltip: {
			trigger: 'item'
		},
		legend: {
			top: '1%',//adjust the position of the legend
			orient: 'vertical',
			left: 'left',
			textStyle: {
				color: `${colorMode === 'light' ? '#4a5568' : '#a0aec0'}`,
				fontSize: 14,
			}
		},
		series: [
			{
				name: 'Quantity',
				type: 'pie',
				radius: ['40%', '70%'],
				center: ['50%', '60%'],
				padAngle: 8,
				avoidLabelOverlap: false,
				itemStyle: {
					borderRadius: 10,
				},
				label: {
					show: true,
					position: 'outside',
					color: `${colorMode === 'light' ? '#4a5568' : '#a0aec0'}`,
				},
				labelLine: {
					show: true,
					smooth: 0.2,
					length: 10,
					length2: 20
				},
				data: chartData
			}
		]
	};

	return <ReactECharts option={option} style={{ height: 420, width: isDesktop ? '45vw' : '60vw' }} />;
};

export default OrderStatuses;