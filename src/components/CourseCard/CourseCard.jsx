import React from "react";
import "./CourseCard.css";
import { CalendarToday } from "@mui/icons-material";

function CourseCard(props) {
	// const { name, imgsrc, rs, dis } = props;
	return (
		<div className="card">
			<div className="cardTitle">
				<h4>301</h4>
				<p>
					<CalendarToday color="action" />
					Oct 11
				</p>
			</div>
			<div className="courseDetails">
				<div>
					<h4 className="subHeading">Provider</h4>
					<h3 className="provider">Udacity</h3>
				</div>
				<div>
					<h4 className="subHeading">Course Name</h4>
					<h3 className="courseName">
						Introduction to Artificial Intelligence
					</h3>
				</div>
				<div>
					<h4 className="subHeading">Universities/Institutions</h4>
					<h3 className="courseIssuer">Stanford University</h3>
				</div>
				<div className="cardFooter">
					<div>
						<h4 className="subHeading">Parent Subject</h4>
						<h3 className="courseSubject">Computer Science</h3>
					</div>
					<div>
						<h4 className="subHeading">Child Subject</h4>
						<h3 className="courseSubject">AI</h3>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CourseCard;
