import React from "react";
import "./Header.css";
// import { withStyles } from "@mui/styles";
import {
	Button,
	InputAdornment,
	TextField,
	Checkbox,
	FormControlLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Book, CalendarToday, Subject } from "@mui/icons-material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function Header(props) {
	// const [value, setValue] = React.useState(new Date());
	// console.log(props);
	const { setSearchInput, getSearchInput, search } = props;
	// const length = data.length;
	// const handleChange = (newValue) => {
	// setValue(newValue);
	// };

	// const TextField2 = withStyles({
	// 	root: {
	// 		"& .MuiInput-underline:after": {
	// 			borderBottomColor: "#ffffff",
	// 		},
	// 		"& .MuiSelect-icon": {
	// 			color: "#000",
	// 		},
	// 		"& .MuiInput-icon": {
	// 			color: "#000",
	// 		},
	// 	},
	// })(TextField);
	return (
		<div>
			<div className="navbar">
				<div className="header">
					<h1>Course Finder</h1>
				</div>
				<div className="filterBar">
					<TextField
						id="input-with-icon-textfield"
						label="Course"
						color="warning"
						name="name"
						onChange={(e) => getSearchInput(e)}
						value={setSearchInput.name}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<Book color="warning" />
								</InputAdornment>
							),
						}}
						variant="standard"
					/>
					<TextField
						id="input-with-childsubj-icon-textfield"
						label="Child Subject"
						color="warning"
						name="child"
						onChange={(e) => getSearchInput(e)}
						value={setSearchInput.child}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<Subject color="warning" />
								</InputAdornment>
							),
						}}
						variant="standard"
					/>
					<TextField
						type="date"
						// id="input-with-childsubj-icon-textfield"
						label="Session Start"
						color="warning"
						name="date"
						id="date"
						onChange={(e) => getSearchInput(e)}
						// value={setSearchInput.date}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<CalendarToday color="warning" />
								</InputAdornment>
							),
						}}
						variant="standard"
					/>
					<FormControlLabel
						value="start"
						control={<Checkbox color="warning" />}
						label="Self Paced"
						labelPlacement="end"
						name="isSelfPaced"
						onChange={(e) => {
							getSearchInput(e);
							let date = document.getElementById("date");
							if (!setSearchInput.isSelfPaced) {
								date.disabled = true;
								date.value = "";
							} else {
								date.disabled = false;
							}
						}}
						checked={setSearchInput.isSelfPaced}
						// value={setSearchInput.course}
					/>
					<Button variant="outlined" type="reset" color="warning">
						Reset
					</Button>
					<Button
						variant="contained"
						color="warning"
						onClick={(e) => {
							search(e);
							let date = document.getElementById("date");
							date.value = "";
							date.disabled = false;
						}}
						startIcon={<SearchIcon />}
					>
						Search
					</Button>
				</div>
			</div>
			{/* <div className="courseFound">
				<h3>
					Courses found: <span className="courseNum">500</span>
				</h3>
			</div> */}
		</div>
	);
}

export default Header;
