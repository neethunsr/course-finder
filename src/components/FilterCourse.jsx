import React, { useState, useMemo } from "react";
import Pagination from "./Pagination/Pagination";
import CourseCard from "./CourseCard/CourseCard";
import "./Header/Header.css";

export default function FilterCourse({ course, submitInput }) {
	// const { course, submitInput } = props;
	let filterCourses = course;
	// console.log(filterCourses);
	const pageSize = 8;
	const [currentPage, setCurrentPage] = useState(1);
	// console.log("====================================");

	const change =
		submitInput.date ||
		submitInput.name ||
		submitInput.child ||
		submitInput.isSelfPaced;

	if (change) {
		// const currentData = filterCourses.slice(0, pageSize);
		if (submitInput.date) {
			filterCourses = filterCourses.filter((course) => {
				console.log(typeof course["Next Session Date"]);

				return (
					course["Next Session Date"].toString().indexOf(submitInput.date) !==
					-1
				);
			});
		}
		if (submitInput.name) {
			filterCourses = filterCourses.filter((name) => {
				return (
					name["Course Name"]
						.toString()
						.toLowerCase()
						.indexOf(submitInput.name.toLowerCase()) !== -1
				);
			});
		}

		if (submitInput.child) {
			filterCourses = filterCourses.filter((child) => {
				return (
					child["Child Subject"]
						.toString()
						.toLowerCase()
						.indexOf(submitInput.child.toLowerCase()) !== -1
				);
			});
		}
		if (submitInput.isSelfPaced) {
			filterCourses = filterCourses.filter((isSelfPaced) => {
				return (
					isSelfPaced["Next Session Date"]
						.toString()
						.toLowerCase()
						.indexOf("Self paced".toLowerCase()) !== -1
				);
			});
		}
	}

	// const [currentPage, setCurrentPage] = useState(1);
	// const [currentData, setCurrentData] = useState(null);

	/*useEffect(() => {
		setCurrentData(filterCourses.slice(0, PageSize));
	}, [currentPage]);
	// setCurrentData(filterCourses.slice(0, PageSize));
	const handleChange = (value) => {
		setCurrentPage(value);
		const firstPageIndex = (currentPage - 1) * PageSize;
		const lastPageIndex = firstPageIndex + PageSize;
		const newData = filterCourses.slice(firstPageIndex, lastPageIndex);
		console.log(newData);
		setCurrentData(newData);
	};*/

	const currentData = useMemo(() => {
		// change ? (firstPageIndex = 0) : null;
		const firstPageIndex = (currentPage - 1) * pageSize;
		const lastPageIndex = firstPageIndex + pageSize;
		const newData = filterCourses.slice(firstPageIndex, lastPageIndex);
		console.log(newData);
		return newData;
	}, [currentPage, filterCourses]);
	function displayCourses() {
		return (
			<div>
				<div className="courseCard">
					{currentData.map((item, index) => (
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
					))}
				</div>
				<Pagination
					className="pagination"
					currentPage={currentPage}
					totalCount={filterCourses.length}
					pageSize={pageSize}
					onPageChange=/*{handleChange}*/ {(page) => setCurrentPage(page)}
				/>
			</div>
		);
	}
	return (
		<div>
			<div>{displayCourses()}</div>
			<div className="courseFound">
				<h3>
					Courses found:{" "}
					<span className="courseNum">{filterCourses.length}</span>
				</h3>
			</div>
			{(submitInput.date ||
				submitInput.name ||
				submitInput.child ||
				submitInput.isSelfPaced) &&
				filterCourses.length === 0 && (
					<div id="loader">
						<h1>No courses found!</h1>
					</div>
				)}
			{/* {console.log(submitInput)} */}
		</div>
	);
}
