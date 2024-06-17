import { useParams } from "react-router-dom";
import NavBar from "../NavBar/NarBar";
import "./Recipe.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import userIcon from "../../assets/Images/userIcon.jpg";
import { nameGenerator } from "../../functions/nameGenerator";
import { renderStars } from "../../functions/renderStars";
import PostComment from "./PostComment";
import { useEffect } from "react";
import { fetchRecipes } from "../../redux/Slicer/recipeSlice"; // Ensure correct import path
import { fetchComments } from "../../redux/Slicer/commentSlice"; // Ensure correct import path
import Footer from "../Footer/Footer";
import capibara from "../../assets/Images/capibara.jpeg";

const RecipeDetails = () => {
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const { recipes, status, error } = useAppSelector((state) => state.recipes);
	const allComments = useAppSelector((state) => state.comments.comments);
	const comments = allComments.filter((comment) => comment.recipeId === id);

	useEffect(() => {
		if (status === "idle") {
			dispatch(fetchRecipes());
			dispatch(fetchComments());
		}
	}, [dispatch, status]);

	const recipe = recipes.find((recipe) => recipe.id === id);

	if (status === "loading") {
		return (
			<div className="container-lg">
				<NavBar />
				<p>Loading...</p>
				<Footer />
			</div>
		);
	}

	if (error) {
		return (
			<div className="container-lg">
				<NavBar />
				<p>Error fetching recipes: {error}</p>
				<Footer />
			</div>
		);
	}

	if (!recipe) {
		return (
			<div className="container-lg">
				<NavBar />
				<div className="text-center p-5">
					<h2 className="display-5">Oops!</h2>
					<p className="lead fs-5">
						The recipe you're looking for isn't available. It may have been removed or the ID provided is
						incorrect. Here is a capibara to compensate for the inconvenience.
					</p>
					<img src={capibara} alt="Recipe not found" className="my-4 img-fluid rounded-3 shadow" />
					<div>
						<button onClick={() => window.history.back()} className="bigWhiteButton">
							Go Back
						</button>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
	const baseUrl = "http://localhost:8080";

	return (
		<div className="container-lg">
			<NavBar />
			<div className="p-3">
				<p className="fw-bold display-5">{recipe.name}</p>
				<div className="overflow-hidden rounded-3 my-4">
					<img src={baseUrl + recipe.image} alt={recipe.name} className="recipeDetailsImg" />
				</div>
				<p className="m-0 fw-bold">Ingredients</p>
				<ul>
					{recipe.ingredients.map((ingredient, index) => (
						<li key={index}>{ingredient}</li>
					))}
				</ul>
				<p className="m-0 fw-bold">Instructions</p>
				<ul>
					{recipe.instructions.split(".").map((instruction, index) => (
						<li key={index}>{instruction}</li>
					))}
				</ul>
				<div>
					<p className="m-0 fw-bold">Comments</p>
					<div>
						{comments.map((comment, index) => (
							<div key={index} className="d-flex align-items-center my-4">
								<img src={userIcon} alt="user" className="userIcon me-2" />
								<div className="ms-2">
									<p className="fw-bold m-0">{nameGenerator()}</p>
									<p className="m-0">{renderStars(comment.rating)}</p>
									<p className="m-0">{comment.comment}</p>
								</div>
							</div>
						))}
					</div>
				</div>
				{id && <PostComment recipeId={id} />}
			</div>
			<Footer />
		</div>
	);
};

export default RecipeDetails;
