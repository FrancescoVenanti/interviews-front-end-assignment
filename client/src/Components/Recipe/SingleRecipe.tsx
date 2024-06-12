const SingleRecipe = ({ recipe }: { recipe: object }) => {
	return (
		<div>
			<h1>{recipe.title}</h1>
			<p>{recipe.description}</p>
		</div>
	);
};

export default SingleRecipe;
