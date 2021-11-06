import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header/Header";
import FilterCourse from "./FilterCourse";
import "../App.css";
// import { CircularProgress } from "@mui/material";

function Search() {
	const [courseList, setCourseList] = useState([]);
	const [loading, setLoading] = useState(false);
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
		// pageStart: false,
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
	let suffix = "";

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
		const fetchData = async () => {
			setLoading(true);
			const res = await axios
				.get("https://nut-case.s3.amazonaws.com/coursessc.json")
				.catch((error) => console.log(error));
			setCourseList(res.data.slice(0, 500));
			setLoading(false);
		};
		fetchData();
	}, []);

	let search = (e) => {
		// e.preventDefault();
		let dateInput = "";
		if (searchInput.date) {
			let date = JSON.stringify(searchInput.date);
			let formattedDate = date.replace(/^"(.+)"$/, "$1");
			console.log(formattedDate);
			let year = formattedDate.slice(0, 4);
			let month = formattedDate.slice(5, 7);
			let day = formattedDate.slice(8, 10);
			if (day === "01" || day === "21" || day === "31") {
				suffix = "st";
			} else if (day === "2" || day === "22") {
				suffix = "nd";
			} else if (day === "3" || day === "23") {
				suffix = "rd";
			} else {
				suffix = "th";
			}
			dateInput =
				day.concat(suffix) +
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
				// pageStart: true,
			});
		} else {
			setSubmitInput({
				name: searchInput.name,
				child: searchInput.child,
				date: dateInput,
				isSelfPaced: searchInput.isSelfPaced,
				// pageStart: true,
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
			{loading ? (
				// <CircularProgress color="warning" />
				<div className="loader">Loading...</div>
			) : (
				// console.log("Loading..")
				<FilterCourse course={courseList} submitInput={submitInput} />
			)}
			<Header
				setSearchInput={searchInput}
				getSearchInput={getSearchInput}
				search={search}
			/>
		</div>
	);
}

export default Search;
