// src/types/Recipe.ts
export interface Recipe {
	id: string;
	name: string;
	ingredients: string[];
	instructions: string;
	cuisineId: string;
	dietId: string;
	difficultyId: string;
	image: string;
}

// src/types/Comment.ts
export interface Comment {
	id: string;
	recipeId: string;
	comment: string;
	rating: number;
	date: string; // ISO date string
}

// src/types/Cuisine.ts
export interface Cuisine {
	id: string;
	name: string;
}

// src/types/Difficulty.ts
export interface Difficulty {
	id: string;
	name: string;
}

// src/types/Diet.ts
export interface Diet {
	id: string;
	name: string;
}
