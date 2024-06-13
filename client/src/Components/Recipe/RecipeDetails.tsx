import { useEffect, useState } from "react";
import { Recipe } from "../../types/Types";
import { useParams } from "react-router-dom";
import NavBar from "../NavBar/NarBar";
import "./Recipe.scss";
import { useAppSelector } from "../../redux/hooks";
import userIcon from "../../assets/Images/userIcon.jpg";
import { nameGenerator } from "../../functions/nameGenerator";
import { renderStars } from "../../functions/renderStars";

const RecipeDetails = () => {
	const { id } = useParams();
	const [recipe, setRecipe] = useState<Recipe | null>(null);

	useEffect(() => {
		const fetchRecipe = async () => {
			const response = await fetch(`http://localhost:8080/recipes/${id}`);
			const data = await response.json();
			setRecipe(data);
		};

		fetchRecipe();
	}, [id]);

	const allComments = useAppSelector((state) => state.comments.comments);
	const comments = allComments.filter((comment) => comment.recipeId === id);

	return (
		<div>
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
					{comments.length > 0 && (
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
					)}
					<textarea className="form-control my-3" placeholder="Add a comment..." />
					<div className="d-flex justify-content-end">
						<button className="smallRedButton ">Submit Review</button>
					</div>
				</div>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};

export default RecipeDetails;
