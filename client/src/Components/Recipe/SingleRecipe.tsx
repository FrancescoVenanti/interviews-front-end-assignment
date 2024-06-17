// src/components/SingleRecipe/SingleRecipe.tsx
import React from "react";
import { useAppSelector } from "../../redux/hooks"; // Adjust the path as necessary
import { Recipe } from "../../types/Types"; // Adjust the path as necessary
import "./Recipe.scss";
import { Link } from "react-router-dom";

interface SingleRecipeProps {
	recipe: Recipe;
}

const baseURL = "http://localhost:8080";

const SingleRecipe: React.FC<SingleRecipeProps> = ({ recipe }) => {
	const cuisines = useAppSelector((state) => state.cuisines.cuisines);
	const diets = useAppSelector((state) => state.diets.diets);
	const difficulties = useAppSelector((state) => state.difficulties.difficulties);

	const cuisineMap = cuisines.reduce((acc, cuisine) => {
		acc[cuisine.id] = cuisine.name;
		return acc;
	}, {} as { [key: string]: string });

	const dietMap = diets.reduce((acc, diet) => {
		acc[diet.id] = diet.name;
		return acc;
	}, {} as { [key: string]: string });

	const difficultyMap = difficulties.reduce((acc, difficulty) => {
		acc[difficulty.id] = difficulty.name;
		return acc;
	}, {} as { [key: string]: string });

	const cuisineName = cuisineMap[recipe.cuisineId] || "Unknown";
	const dietName = dietMap[recipe.dietId] || "Unknown";
	const difficultyName = difficultyMap[recipe.difficultyId] || "Unknown";

	function defineDifficultyColor(): string {
		if (difficultyName === "Easy") {
			return "text-success";
		} else if (difficultyName === "Medium") {
			return "text-warning";
		} else {
			return "text-danger";
		}
	}

	const difficultyColor = defineDifficultyColor();

	return (
		<div className="row">
			<div className="col-12 col-md-5 col-lg-2">
				<img src={baseURL + recipe.image} alt={recipe.name} className="recipeImg img-fluid rounded-4 me-3" />
			</div>
			<div className="col-12 col-md-7 text-center text-md-start">
				<h2>{recipe.name}</h2>
				{recipe.ingredients.map((ingredient, index) => (
					<span key={index} className="ingredients me-2">
						{ingredient}
					</span>
				))}

				<div className="d-flex justify-content-center justify-content-md-start mt-2 mt-md-3">
					<p className="me-3 badgeWhite">{cuisineName}</p>
					<p className="badgeWhite">{dietName}</p>
				</div>
			</div>
			<div className="d-flex flex-md-column align-items-center align-items-md-end justify-content-between ms-auto col-12 col-md-12 col-lg-3">
				<p className="m-0">
					Difficulty: <span className={`${difficultyColor} fw-bold`}>{difficultyName}</span>
				</p>
				<Link to={`/recipe/${recipe.id}`} className="smallRedButton text-decoration-none">
					View details
				</Link>
			</div>
		</div>
	);
};

export default SingleRecipe;
