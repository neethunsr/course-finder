import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import CourseCard from "./CourseCard/CourseCard";
import Header from "./Header/Header";

const baseURL = "https://nut-case.s3.amazonaws.com/coursessc.json";

function App() {
	const [list, setList] = useState(null);

	useEffect(() => {
		axios.get(baseURL).then((response) => {
			setList(response.data);
		});
	}, []);
	if (!list) return null;

	return (
		<div className="App">
			<Header />
			<div className="courseCard">
				{list.map((item, index) => (
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
		</div>
	);
}

export default App;
