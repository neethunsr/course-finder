import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header/Header";
import FilterCourse from "./FilterCourse";

function Search() {
	const [courseList, setCourseList] = useState([]);
	// setCourse(props.data);
	// console.log(course);
	// const course = props.data;
	const [searchInput, setSearchInput] = useState({
		name: "",
		child: "",
		date: "",
		isSelfPaced: false,
	});

	const [submitInput, setSubmitInput] = useState({
		name: "",
		child: "",
		date: "",
		isSelfPaced: false,
	});

	let getSearchInput = (e) => {
		if (e.target.name === "name") {
			setSearchInput({
				...searchInput,
				name: e.target.value,
			});
		} else if (e.target.name === "child") {
			setSearchInput({
				...searchInput,
				child: e.target.value,
			});
		} else if (e.target.name === "date") {
			setSearchInput({
				...searchInput,
				date: e.target.value,
			});
		} else if (e.target.name === "isSelfPaced") {
			setSearchInput({
				...searchInput,
				isSelfPaced: !searchInput.isSelfPaced,
			});
		}
	};
	let extenstion = "";

	const monthNames = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

	useEffect(() => {
		axios
			.get("https://nut-case.s3.amazonaws.com/coursessc.json")
			.then((res) => {
				setCourseList(res.data.slice(0, 500));
			})
			.catch((error) => console.log(error));
	}, []);

	let search = (e) => {
		e.preventDefault();
		let dateInput = "";
		if (searchInput.date) {
			let date = JSON.stringify(searchInput.date);
			let formattedDate = date.replace(/^"(.+)"$/, "$1");
			console.log(formattedDate);
			let year = formattedDate.slice(0, 4);
			let month = formattedDate.slice(5, 7);
			let day = formattedDate.slice(8, 10);
			if (day === "01" || day === "21" || day === "31") {
				extenstion = "st";
			} else if (day === "2" || day === "22") {
				extenstion = "nd";
			} else if (day === "3" || day === "23") {
				extenstion = "rd";
			} else {
				extenstion = "th";
			}
			dateInput =
				day.concat(extenstion) +
				" " +
				monthNames[parseInt(month - 1)] +
				"," +
				" " +
				year;
		}
		if (searchInput.isSelfPaced) {
			setSubmitInput({
				name: searchInput.name,
				child: searchInput.child,
				date: "",
				isSelfPaced: searchInput.isSelfPaced,
			});
		} else {
			setSubmitInput({
				name: searchInput.name,
				child: searchInput.child,
				date: dateInput,
				isSelfPaced: searchInput.isSelfPaced,
			});
		}
		setSearchInput({
			name: "",
			child: "",
			date: "",
			isSelfPaced: false,
		});
	};
	return (
		<div>
			<FilterCourse course={courseList} submitInput={submitInput} />

			<Header
				setSearchInput={searchInput}
				getSearchInput={getSearchInput}
				search={search}
			/>
		</div>
	);
}

export default Search;
