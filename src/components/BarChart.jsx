import React, { useEffect, useState } from "react";
import "../App.css";
import { Bar } from "react-chartjs-2";

function BarChart({ data, label, value }) {
	const [xLabel, setXLabels] = useState([]);
	useEffect(() => {
		if (value === 1) {
			setXLabels(
				data.map((item) => {
					return item["Parent Subject"];
				})
			);
		} else if (value === 2) {
			setXLabels(
				data.map((item) => {
					return item["Universities/Institutions"];
				})
			);
		}
	}, [data, value]);
	const distinctData = [...new Set(xLabel)];
	var distinctLength = distinctData.length;
	const count = new Map(
		[...new Set(xLabel)].map((x) => [x, xLabel.filter((y) => y === x).length])
	);
	const countData = [];
	for (var i = 0; i < distinctLength; i++) {
		countData.push(count.get(distinctData[i]));
	}

	const chartData = {
		labels: distinctData,
		datasets: [
			{
				label: "Course",
				data: countData,
				backgroundColor: [
					"rgba(67, 65, 100, 0.6)",
					"#ede90285",
					"rgba(0, 128, 0, 0.61)",
					"rgba(237,108,2, 0.6)",
					"rgba(128, 0, 0, 0.61)",
					"rgba(237,10,2, 0.45)",
				],
				borderWidth: 1,
				borderColor: "rgba(37,18,2, 1)",
			},
		],
	};

	return (
		<div className="barChart">
			<Bar
				data={chartData}
				options={{
					responsive: true,
					plugins: {
						legend: {
							display: true,
						},
						title: {
							display: true,
							text: label,
						},
						scales: {
							yAxes: [
								{
									ticks: {
										beginAtZero: true,
									},
								},
							],
						},
					},
				}}
			/>
		</div>
	);
}

export default BarChart;
