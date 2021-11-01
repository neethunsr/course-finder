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
	const [value, setValue] = React.useState(new Date());
	console.log(props);
	const { data } = props;
	const length = data.length;
	const handleChange = (newValue) => {
		setValue(newValue);
	};
	const label = { inputProps: { "aria-label": "Checkbox demo" } };
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
						label="Child Subject"
						color="warning"
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
					/>
					<Button variant="outlined" color="warning">
						Reset
					</Button>
					<Button
						variant="contained"
						color="warning"
						startIcon={<SearchIcon />}
					>
						Search
					</Button>
				</div>
			</div>
			<div className="courseFound">
				<h3>
					Courses found: <span className="courseNum">{length}</span>
				</h3>
			</div>
		</div>
	);
}

export default Header;
