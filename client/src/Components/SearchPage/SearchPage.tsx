import { useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { Recipe } from "../../types/Types";
import SingleRecipe from "../Recipe/SingleRecipe";
import Filters from "./Filters";
import { useEffect, useState } from "react";
import NavBar from "../NavBar/NarBar";

const SearchPage = () => {
	const param = useParams<{ query: string }>();
	const searchQuery = param.query;
	const recipes = useAppSelector((state) => state.recipes.recipes);
	const [searchResults, setSearchResults] = useState<Recipe[]>([]);

	useEffect(() => {
		if (searchQuery && Array.isArray(recipes)) {
			const results = recipes.filter((recipe: Recipe) =>
				recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
			);
			setSearchResults(results);
		}
	}, [searchQuery, recipes]);

	const [expandFilters, setExpandFilters] = useState(true);

	return (
		<div className="search-page container-lg p-0">
			<NavBar />
			<div className="row g-0">
				<div className={`col-12  ${expandFilters ? "col-lg-4" : "col-lg-1"}`}>
					<Filters
						expandFilters={expandFilters}
						setExpandFilter={setExpandFilters}
						setSearchResults={setSearchResults}
						searchResults={searchResults}
					/>
				</div>
				<div className={`col-12 ${expandFilters ? "col-lg-8" : "col-lg-11"}`}>
					{searchResults.length > 0 ? (
						searchResults.map((recipe: Recipe) => (
							<div className="containerGray my-3 shadow" key={recipe.id}>
								<SingleRecipe recipe={recipe} />
							</div>
						))
					) : (
						<p>No results</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default SearchPage;
