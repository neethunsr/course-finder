import React, { useState } from "react";
import Header from "./Header/Header";
import FilterCourse from "./FilterCourse";

function Search(props) {
	// const [course, setCourse] = useState(null);
	// setCourse(props.data);
	// console.log(course);
	const course = props.data;
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

	let search = (e) => {
		e.preventDefault();
		let dateInput = "";
		if (searchInput.date) {
			//to convert object date into string date
			let date = JSON.stringify(searchInput.date);
			//regex to remove unnecessary characters
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
		//set date to empty if self paced is selected
		if (searchInput.isSelfPaced) {
			setSubmitInput({
				name: searchInput.name,
				child: searchInput.child,
				date: "",
				isSelfPaced: searchInput.isSelfPaced,
			});
		}
		//set self paced  to false if date is selected
		else {
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
			{/* <FilterCourse course={props.data} submitInput={submitInput} /> */}

			<Header
				setSearchInput={searchInput}
				getSearchInput={getSearchInput}
				search={search}
			/>
		</div>
	);
}

export default Search;
