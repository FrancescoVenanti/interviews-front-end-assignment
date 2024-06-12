import { Recipe } from "../../types/Recipe";

const SingleRecipe = ({ recipe }: { recipe: Recipe }) => {
	return (
		<div>
			<h1>{recipe.name}</h1>
			<p>{recipe.ingredients}</p>
		</div>
	);
};

export default SingleRecipe;
