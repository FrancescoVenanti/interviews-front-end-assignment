import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Recipe } from "../../types/Types";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { fetchCuisines } from "../../redux/Slicer/cousineSlice";
import { fetchDiets } from "../../redux/Slicer/dietsSlice";
import { fetchDifficulties } from "../../redux/Slicer/difficultiesSlice";
import { fetchRecipes } from "../../redux/Slicer/recipeSlice";

interface FiltersProps {
	expandFilters: boolean;
	setExpandFilter: React.Dispatch<React.SetStateAction<boolean>>;
	searchResults: Recipe[];
	setSearchResults: React.Dispatch<React.SetStateAction<Recipe[]>>;
}

const Filters: React.FC<FiltersProps> = ({ expandFilters, setExpandFilter, setSearchResults }) => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(fetchCuisines());
		dispatch(fetchDiets());
		dispatch(fetchDifficulties());
		dispatch(fetchRecipes());
	}, [dispatch]);

	const cuisines = useSelector((state: RootState) => state.cuisines.cuisines);
	const diets = useSelector((state: RootState) => state.diets.diets);
	const difficulties = useSelector((state: RootState) => state.difficulties.difficulties);
	const recipes = useSelector((state: RootState) => state.recipes.recipes);

	const [cuisineId, setCuisineId] = useState<string>("");
	const [dietId, setDietId] = useState<string>("");
	const [difficultyId, setDifficultyId] = useState<string>("");

	const handleFilter = () => {
		const filteredResults = recipes.filter((recipe) => {
			if (cuisineId && recipe.cuisineId !== cuisineId) {
				return false;
			}
			if (dietId && recipe.dietId !== dietId) {
				return false;
			}
			if (difficultyId && recipe.difficultyId !== difficultyId) {
				return false;
			}
			return true;
		});
		setSearchResults(filteredResults);
	};

	if (!expandFilters) {
		return (
			<div className="bg-light me-3 shadow">
				<button className="btn btn-transparent" onClick={() => setExpandFilter(true)}>
					<FaArrowRight className="ms-3" />
				</button>
			</div>
		);
	} else {
		return (
			<div className="bg-light me-3 shadow">
				<button className="btn btn-transparent" onClick={() => setExpandFilter(false)}>
					<FaArrowLeft className="ms-2 mt-2" />
				</button>
				<div className="p-3">
					<p className="fs-5 m-0">Discover recipes</p>
					<div className="my-3">
						<p className="fs-6 m-0 ms-2">Search by cuisine</p>
						<select
							className="form-control rounded-pill"
							value={cuisineId}
							onChange={(e) => setCuisineId(e.target.value)}
						>
							<option value="" disabled>
								Select Cuisine
							</option>
							{cuisines.map((cuisine) => (
								<option key={cuisine.id} value={cuisine.id}>
									{cuisine.name}
								</option>
							))}
						</select>
					</div>
					<div className="mb-3">
						<p className="fs-6 m-0 ms-2">Search by diet</p>
						<select
							className="form-control rounded-pill"
							value={dietId}
							onChange={(e) => setDietId(e.target.value)}
						>
							<option value="" disabled>
								Select Diet
							</option>
							{diets.map((diet) => (
								<option key={diet.id} value={diet.id}>
									{diet.name}
								</option>
							))}
						</select>
					</div>
					<div className="mb-3">
						<p className="fs-6 m-0 ms-2">Search by difficulty</p>
						<select
							className="form-control rounded-pill"
							value={difficultyId}
							onChange={(e) => setDifficultyId(e.target.value)}
						>
							<option value="" disabled>
								Select Difficulty
							</option>
							{difficulties.map((difficulty) => (
								<option key={difficulty.id} value={difficulty.id}>
									{difficulty.name}
								</option>
							))}
						</select>
					</div>
					<div className="mt-4 mb-3">
						<button className="smallRedButton w-100" onClick={handleFilter}>
							Search
						</button>
					</div>
				</div>
			</div>
		);
	}
};

export default Filters;
