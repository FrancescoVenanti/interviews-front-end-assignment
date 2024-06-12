import { useEffect, useState } from "react";
import { Recipe } from "../../types/Types";
import { useParams } from "react-router-dom";

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

	return (
		<div>
			{recipe ? (
				<div>
					<h1>{recipe.name}</h1>
					<ul>
						{recipe.ingredients.map((ingredient: string, index: number) => (
							<li key={index}>{ingredient}</li>
						))}
					</ul>
					<p>{recipe.instructions}</p>
				</div>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};

export default RecipeDetails;
