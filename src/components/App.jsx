import React, { useState, useMemo, useEffect } from "react";
import "../App.css";
import axios from "axios";
// import data from "./data";
import CourseCard from "./CourseCard/CourseCard";
import Header from "./Header/Header";
import Pagination from "./Pagination/Pagination";

const baseURL = "https://nut-case.s3.amazonaws.com/coursessc.json";

const PageSize = 6;
function App() {
	const [currentPage, setCurrentPage] = useState(1);
	const [currentData, setCurrentData] = useState(null);
	const [list, setList] = useState(null);

	useEffect(() => {
		axios.get(baseURL).then((response) => {
			setList(response.data);
			setCurrentData(response.data.slice(0, PageSize));
		});
	}, []);
	const handleChange = (value) => {
		setCurrentPage(value);
		const firstPageIndex = (currentPage - 1) * PageSize;
		const lastPageIndex = firstPageIndex + PageSize;
		const newData = list.slice(firstPageIndex, lastPageIndex);
		setCurrentData(newData);
	};
	// const newlist = list;
	// const currentData = useMemo(() => {
	// 	const firstPageIndex = (currentPage - 1) * PageSize;
	// 	const lastPageIndex = firstPageIndex + PageSize;
	// 	return list.slice(firstPageIndex, lastPageIndex);
	// }, [currentPage]);

	if (!list) return null;

	return (
		<div className="App">
			<Header />
			<div className="courseCard">
				{currentData
					? currentData.map((item, index) => (
							<CourseCard
								key={index}
								id={item["Course Id"]}
								date={item["Next Session Date"]}
								name={item["Course Name"]}
								provider={item["Provider"]}
								issuer={item["Universities/Institutions"]}
								parent={item["Parent Subject"]}
								child={item["Child Subject"]}
								url={item.Url}
							/>
					  ))
					: null}
			</div>
			<Pagination
				currentPage={currentPage}
				totalCount={list.length}
				pageSize={PageSize}
				onPageChange={handleChange} //{(page) => setCurrentPage(page)}
			/>
		</div>
	);
}

export default App;
