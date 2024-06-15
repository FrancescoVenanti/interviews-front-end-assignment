import "./App.scss";
import HomePage from "./Components/HomePage/HomePage";
import LadingPage from "./Components/LandingPage/LandingPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RecipeDetails from "./Components/Recipe/RecipeDetails";
import AddRecipe from "./Components/Recipe/AddRecipe";
import SearchPage from "./Components/SearchPage/SearchPage";
import Footer from "./Components/Footer/Footer";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" Component={LadingPage} />
				<Route path="/home" Component={HomePage} />
				<Route path="/recipe/:id" Component={RecipeDetails} />
				<Route path="add-recipe" Component={AddRecipe} />
				<Route path="Search/:query" Component={SearchPage} />
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;
