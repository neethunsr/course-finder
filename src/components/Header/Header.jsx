import React from "react";
import "./Header.css";
import { Button, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Book, Subject } from "@mui/icons-material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
// import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
function Header() {
	const [value, setValue] = React.useState(new Date("2014-08-18T21:11:54"));

	const handleChange = (newValue) => {
		setValue(newValue);
	};
	return (
		<div>
			<div className="navbar">
				<div className="header">
					<h1>Course Finder</h1>
				</div>
				<div className="courseFound">
					<h3>
						Courses found: <span className="courseNum">500</span>
					</h3>
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
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<DatePicker
							label="Basic example"
							value={value}
							onChange={(newValue) => {
								setValue(newValue);
							}}
							renderInput={(params) => <TextField {...params} />}
						/>
					</LocalizationProvider>
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
		</div>
	);
}

export default Header;
