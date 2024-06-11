import "./App.scss";
import HomePage from "./Components/HomePage/HomePage";
import LadingPage from "./Components/LandingPage/LandingPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" Component={LadingPage} />
				<Route path="/home" Component={HomePage} />
			</Routes>
		</Router>
	);
}

export default App;
