import { Recipe } from "../../types/Types";
import "./SingleRecipe.scss";

const baseURL = "http://localhost:8080";

const SingleRecipe = ({ recipe }: { recipe: Recipe }) => {
	return (
		<div className="row">
			<div className="col-12 col-md-4 col-xl-3">
				<img src={baseURL + recipe.image} alt={recipe.name} className="img-fluid rounded-4 recipeImg" />
			</div>

			<div className="col-12 col-md-8 col-xl-7">
				<p className="fw-bold fs-5 m-0">{recipe.name}</p>
				<p>{recipe.ingredients}</p>
			</div>
			<div className="col-12 col-md-12 col-xl-2 d-flex flex-column justify-content-end align-items-end">
				<button className="smallRedButton">View Recipe</button>
			</div>
		</div>
	);
};

export default SingleRecipe;
