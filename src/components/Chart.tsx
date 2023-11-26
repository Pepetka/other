import {useCallback, useEffect, useLayoutEffect, useRef, useState} from "react";
import { use } from "echarts/core";
import {ECharts, init} from 'echarts';
import { CanvasRenderer } from "echarts/renderers";
import { TitleComponent, TooltipComponent, GridComponent, LegendComponent, ToolboxComponent } from 'echarts/components';
import {add} from "zrender/lib/core/vector";
import {it} from "node:test";

interface DataItemType {
	x: string;
	y: number;
}

// const additionalArray: DataItemType[] = [];
//
// let elK = 1;
//
// const mainArray = new Array(100).fill(0).map((_, i) => {
// 	let el = elK * (10 + Math.floor(Math.random() * 2));
//
// 	if (i % 10 === 0) {
// 		elK *= -1;
// 	}
//
// 	if (i > 80) {
// 		additionalArray.push({
// 			x: i.toString(), y: el + 3 * ((Math.random() - 0.5) > 0.5 ? -1 : 1)
// 		})
// 	}
//
// 	return { x: i.toString(), y: el }
// })

type DatasetArrItem = [string, number, number];

const mainArray: DataItemType[] = [2, 2, 2, 0, 10, 10, 10, 10, 10, -10, -10, -10, -10, 0].map((item, index) => ({ x: index.toString(), y: item }))
const additionalArray: DataItemType[] = [10, 0, 7, 13, 10, -10, -13, -7, 10, 0, -10].map((item, index) => ({ x: (index + 3).toString(), y: item }))
const nextMainArray: DataItemType[] = [2, 2, 2, 10, 0, 7, 13, 10, -10, -13, -7, 10, 0, -10].map((item, index) => ({ x: index.toString(), y: item }))
const nextAdditionalArray: DataItemType[] = [].map((item, index) => ({ x: (index + 3).toString(), y: item }))

const baseMain: DatasetArrItem[] = mainArray.map(({ x, y }) => ([x, y, y]));
const baseAdditional: DatasetArrItem[] = mainArray.map(({ x, y }) => {
	const item = additionalArray.find(({ x: xAdd }) => xAdd === x);

	if (!item) {
		return [x, y, y];
	}

	return [item.x, item.y, item.y]
});

const nextBaseMain = baseAdditional;
const nextBaseAdditional = nextBaseMain;

// [0, 10, 10, 10, 10, 10, -10, -10, -10, -10, 0] //Out [0, 0, 7, 10, 10, 10, -10, -7, -10, 0, 0]
// [10, 0, 7, 13, 10, -10, -13, -7, 10, 0, -10]   //Out [10, 10, 3, 3, 0, -10, -3, -3, 10, -10, -10]

const getDatasets = (main: DataItemType[], additional: DataItemType[]): { main: DatasetArrItem[], additional: DatasetArrItem[] } => {
	const additionalDataset: DatasetArrItem[] = []

	const mainDataset: DatasetArrItem[] =  main.map(({ x, y }) => {
		const item = additional.find(({ x: xAdd }) => xAdd === x);
		const itemY = item ? item.y : y;

		let newAddY = (y >= 0 ? 1 : -1) * Math.abs(y - itemY);
		let newMainY = Math.abs(y) >= Math.abs(itemY) ? itemY : y;

		if (y * itemY === 0) {
			newMainY = 0;
			newAddY = y === 0 ? itemY : y;
		}

		if (y * itemY < 0) {
			newMainY = y;
			newAddY = itemY;
		}

		additionalDataset.push([x, newAddY, itemY]);
		return [x, newMainY, y];
	})

	return { main: mainDataset, additional: additionalDataset };
}

const getOptions = (main: DatasetArrItem[], additional: DatasetArrItem[], baseMain: DatasetArrItem[], baseAdditional: DatasetArrItem[]) => {
	return {
		animation: false,
		title: {
			text: 'ECharts Getting Started Example'
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
				label: {
					backgroundColor: '#6a7985'
				}
			},
			formatter: (data: any[]) => {
				return `
						<div>
							<div>${data[0].data[0]}</div>
							${data.reduce((acc, params) => acc + `
								<div>
									<span>${params.marker}</span>
									<span>${params.seriesName}</span>
<!--									<span>${params.data[1]}</span>-->
									<span>${params.data[2]}</span>
								</div>
							`, ``)}
						</div>
					`
			}
		},
		toolbox: {
			feature: {
				saveAsImage: {}
			}
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		legend: {
			data: ['main', 'additional', 'baseMain', 'baseAdditional']
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: new Array(main.length).fill(0).map((_, i) => i.toString())
		},
		yAxis: {
			type: 'value',
			min: -20,
			max: 20,
		},
		series: [
			{
				name: 'main',
				type: 'line',
				areaStyle: {},
				stack: 'Total',
				emphasis: {
					focus: 'series'
				},
				showSymbol: false,
				lineStyle: {
					width: 1,
				},
				color: 'green',
				step: 'middle',
				data: main,
			},
			{
				name: 'additional',
				type: 'line',
				areaStyle: {},
				stack: 'Total',
				emphasis: {
					focus: 'series'
				},
				color: 'purple',
				showSymbol: false,
				lineStyle: {
					width: 1,
				},
				step: 'middle',
				data: additional
			},
			{
				name: 'baseAdditional',
				type: 'line',
				areaStyle: {},
				emphasis: {
					focus: 'series'
				},
				showSymbol: false,
				lineStyle: {
					width: 1,
				},
				color: 'purple',
				step: 'middle',
				data: baseAdditional
			},
			{
				name: 'baseMain',
				type: 'line',
				areaStyle: {},
				emphasis: {
					focus: 'series'
				},
				showSymbol: false,
				lineStyle: {
					width: 1,
				},
				color: 'green',
				step: 'middle',
				data: baseMain
			},
		]
	}
}

const Chart = () => {
	const ref = useRef<HTMLDivElement | null>(null);
	const chartRef = useRef<ECharts | null>(null);
	const [isPrev, setIsPrev] = useState(true);

	const setChart = useCallback((prev: boolean) => {
		if (!chartRef.current) return;

		if (prev) {
			const { main, additional } = getDatasets(mainArray, additionalArray)
			const options = getOptions(main, additional, baseMain, baseAdditional);
			chartRef.current.setOption(options);
		} else {
			const { main, additional } = getDatasets(nextMainArray, nextAdditionalArray);
			const options = getOptions(main, additional, nextBaseMain, nextBaseAdditional);
			chartRef.current.setOption(options);
		}
	}, [])

	useLayoutEffect(() => {
		use(CanvasRenderer);
		use(TitleComponent);
		use(TooltipComponent);
		use(GridComponent);
		use(LegendComponent);
		use(ToolboxComponent);
		chartRef.current = init(document.getElementById('wrapper'), "light", {
			renderer: "canvas"
		});
	}, []);

	useEffect(() => {
		setChart(isPrev)
	}, [isPrev, setChart]);

	return (
		<div style={{
			width: "100vw",
			height: "90vh"
		}}>
			<div ref={ref} style={{
				width: "100%",
				height: "100%",
			}} id="wrapper" />
			<button onClick={() => setIsPrev((prev) => !prev)}>
				{isPrev ? 'prev' : 'next'}
			</button>
		</div>
	)
}

export default Chart;
