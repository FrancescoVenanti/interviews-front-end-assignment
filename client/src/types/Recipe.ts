// src/types/Recipe.ts

export interface Recipe {
	id: string;
	name: string;
	ingredients: string[]; // Now it's an array of strings
	instructions: string;
	servings?: number; // Optional property if not present
	prepTime?: string; // Optional property if not present
	cookTime?: string; // Optional property if not present
	cuisineId: string;
	dietId: string;
	difficultyId: string;
	image: string;
}
