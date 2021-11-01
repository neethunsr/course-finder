import React, { useState } from "react";
import Pagination from "./Pagination/Pagination";
import CourseCard from "./CourseCard/CourseCard";

export default function FilterCourse({ course, submitInput }) {
	// const { course, submitInput } = props;
	let filterCourses = course;
	//handling filter conditions
	if (
		submitInput.date ||
		submitInput.course ||
		submitInput.childsubject ||
		submitInput.isSelfPaced
	) {
		if (submitInput.date) {
			filterCourses = filterCourses.filter((course) => {
				console.log(typeof course["Next Session Date"]);

				return (
					course["Next Session Date"].toString().indexOf(submitInput.date) !==
					-1
				);
			});
		}
		if (submitInput.course) {
			filterCourses = filterCourses.filter((course) => {
				return (
					course["Course Name"]
						.toString()
						.toLowerCase()
						.indexOf(submitInput.course.toLowerCase()) !== -1
				);
			});
		}

		if (submitInput.childsubject) {
			filterCourses = filterCourses.filter((childsubject) => {
				return (
					childsubject["Child Subject"]
						.toString()
						.toLowerCase()
						.indexOf(submitInput.childsubject.toLowerCase()) !== -1
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
	const PageSize = 8;
	const [currentPage, setCurrentPage] = useState(1);
	const [currentData, setCurrentData] = useState(null);
	setCurrentData(filterCourses.slice(0, PageSize));
	const handleChange = (value) => {
		setCurrentPage(value);
		const firstPageIndex = (currentPage - 1) * PageSize;
		const lastPageIndex = firstPageIndex + PageSize;
		const newData = filterCourses.slice(firstPageIndex, lastPageIndex);
		setCurrentData(newData);
	};
	return (
		<div>
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
				className="pagination"
				currentPage={currentPage}
				totalCount={filterCourses.length}
				pageSize={PageSize}
				onPageChange={handleChange} //{(page) => setCurrentPage(page)}
			/>
		</div>
	);
}
