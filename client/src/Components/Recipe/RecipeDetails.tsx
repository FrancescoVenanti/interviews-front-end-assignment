import { useParams } from "react-router-dom";
import NavBar from "../NavBar/NarBar";
import "./Recipe.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import userIcon from "../../assets/Images/userIcon.jpg";
import { nameGenerator } from "../../functions/nameGenerator";
import { renderStars } from "../../functions/renderStars";
import PostComment from "./PostComment";
import { useEffect } from "react";
import { fetchRecipes } from "../../redux/Slicer/recipeSlice";
import { fetchComments } from "../../redux/Slicer/commentSlice";
import Footer from "../Footer/Footer";

const RecipeDetails = () => {
	const { id } = useParams();
	const dispatch = useAppDispatch();

	// Fetch recipes and comments on component mount to make sure the store is up to date and that i dont lose data on a page reload
	// i could have handled this using a persist store but i wanted to keep it simple
	useEffect(() => {
		dispatch(fetchRecipes());
		dispatch(fetchComments());
	}, [dispatch]);

	const recipe = useAppSelector((state) => state.recipes.recipes).find((recipe) => recipe.id === id);
	const allComments = useAppSelector((state) => state.comments.comments);
	const comments = allComments.filter((comment) => comment.recipeId === id);
	return (
		<div className="container-lg">
			<NavBar />
			{recipe ? (
				<div className="p-3">
					<p className="fw-bold display-5">{recipe.name}</p>
					<div className="overflow-hidden rounded-3 my-4">
						<img
							src={`http://localhost:8080${recipe.image}`}
							alt={recipe.name}
							className=" recipeDetailsImg"
						/>
					</div>
					<p className="m-0 fw-bold">Ingredients</p>
					<ul>
						{recipe.ingredients.map((ingredient: string, index: number) => (
							<li key={index}>{ingredient}</li>
						))}
					</ul>
					<p className="m-0 fw-bold">Instructions</p>
					<ul>
						{recipe.instructions.split(".").map((instruction: string, index: number) => (
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
			) : (
				<p>Loading...</p>
			)}
			<Footer />
		</div>
	);
};

export default RecipeDetails;
