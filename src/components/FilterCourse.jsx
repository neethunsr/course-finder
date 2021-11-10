import React, { useState, useMemo } from "react";
import Pagination from "./Pagination/Pagination";
import CourseCard from "./CourseCard/CourseCard";
import "./Header/Header.css";
import "../App.css";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import BarChart from "./BarChart";

export default function FilterCourse({ course, submitInput }) {
	let filterCourses = course;
	const pageSize = 8;
	const [currentPage, setCurrentPage] = useState(1);

	const change =
		submitInput.date ||
		submitInput.name ||
		submitInput.child ||
		submitInput.isSelfPaced;

	if (change) {
		window.scrollTo(0, 0);
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

	const currentData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * pageSize;
		const lastPageIndex = firstPageIndex + pageSize;
		const newData = filterCourses.slice(firstPageIndex, lastPageIndex);
		console.log(newData);
		return newData;
	}, [currentPage, filterCourses]);

	// To display course cards
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
					onPageChange={(page) => setCurrentPage(page)}
				/>
			</div>
		);
	}

	// To display bar graph
	const [graphChoice, setGraphChoice] = useState(1);
	const handleChange = (event) => {
		setGraphChoice(event.target.value);
	};
	console.log(graphChoice);
	function displayGraph() {
		return (
			<div>
				<div className="dropDown">
					<FormControl fullWidth>
						<InputLabel color="warning">Choose</InputLabel>
						<Select
							color="warning"
							value={graphChoice}
							label="Choose"
							onChange={handleChange}
						>
							<MenuItem value={1}>Parent Subject</MenuItem>
							<MenuItem value={2}>University</MenuItem>
						</Select>
					</FormControl>
				</div>
				<div>
					{graphChoice === 1 ? (
						<BarChart data={currentData} label="Parent Subject" value={1} />
					) : (
						<BarChart data={currentData} label="Universities" value={2} />
					)}
				</div>
			</div>
		);
	}
	return (
		<div>
			<div>{displayCourses()}</div>
			<div>{displayGraph()}</div>
			<div className="courseFound">
				<h3>
					Courses found:{" "}
					<span className="courseNum">{filterCourses.length}</span>
				</h3>
			</div>
			{change && filterCourses.length === 0 && (
				<div>
					<h1>No courses found!</h1>
				</div>
			)}
		</div>
	);
}
