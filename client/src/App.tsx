import "./App.scss";
import HomePage from "./Components/HomePage/HomePage";
import LadingPage from "./Components/LandingPage/LandingPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RecipeDetails from "./Components/Recipe/RecipeDetails";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" Component={LadingPage} />
				<Route path="/home" Component={HomePage} />
				<Route path="/recipe/:id" Component={RecipeDetails} />
			</Routes>
		</Router>
	);
}

export default App;
