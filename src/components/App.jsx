import React from "react";
import "../App.css";
import Background from "./Background";
import Search from "./Search";
import store from "../redux/store";
import { Provider } from "react-redux";

function App() {
	return (
		<Provider store={store}>
			<div className="App">
				<Search />
				<Background />
			</div>
		</Provider>
	);
}

export default App;
