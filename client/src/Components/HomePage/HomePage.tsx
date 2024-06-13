import { fetchComments } from "../../redux/Slicer/commentSlice";
import { fetchRecipes } from "../../redux/Slicer/recipeSlice";
import NavBar from "../NavBar/NarBar";
import Sidebar from "../Sidebar/Sidebar";
import "./HomePage.scss";
import { useEffect } from "react";
import { fetchCuisines } from "../../redux/Slicer/cousineSlice";
import { fetchDifficulties } from "../../redux/Slicer/difficultiesSlice";
import { fetchDiets } from "../../redux/Slicer/dietsSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import SingleRecipe from "../Recipe/SingleRecipe";

const HomePage = () => {
	const dispatch = useAppDispatch();

	const { recipes, status, error } = useAppSelector((state) => state.recipes);

	useEffect(() => {
		dispatch(fetchRecipes());
		dispatch(fetchComments());
		dispatch(fetchCuisines());
		dispatch(fetchDifficulties());
		dispatch(fetchDiets());
	}, [dispatch]);

	return (
		<div className="d-flex flex-column container-lg p-0">
			<NavBar />
			<div className="d-flex">
				<Sidebar />
				<div className="p-3">
					{status === "loading" && <p>Loading...</p>}
					{status === "succeeded" && (
						<div>
							{recipes.map((item, index) => (
								<div key={index} className="containerGray mb-3 shadow">
									<SingleRecipe recipe={item} />
								</div>
							))}
						</div>
					)}
					{status === "failed" && <p>{error}</p>}
				</div>
			</div>
		</div>
	);
};

export default HomePage;
