// src/features/recipesSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Recipe } from "../../types/Types";

interface RecipesState {
	recipes: Recipe[];
	status: "idle" | "loading" | "succeeded" | "failed";
	error: string | null | undefined;
}

const initialState: RecipesState = {
	recipes: [],
	status: "idle",
	error: null,
};

export const fetchRecipes = createAsyncThunk("recipes/fetchRecipes", async () => {
	const response = await axios.get("http://localhost:8080/recipes");
	return response.data;
});

export const addRecipe = createAsyncThunk("recipes/addRecipe", async (newRecipe: FormData) => {
	const response = await axios.post("http://localhost:8080/recipes", newRecipe, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
	return response.data;
});

const recipesSlice = createSlice({
	name: "recipes",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchRecipes.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchRecipes.fulfilled, (state, action: PayloadAction<Recipe[]>) => {
				state.status = "succeeded";
				// reverted so last added recipe is first
				state.recipes = action.payload.slice().reverse();
			})
			.addCase(fetchRecipes.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(addRecipe.pending, (state) => {
				state.status = "loading";
			})
			.addCase(addRecipe.fulfilled, (state, action: PayloadAction<Recipe>) => {
				state.status = "succeeded";
				state.recipes.push(action.payload);
			})
			.addCase(addRecipe.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export default recipesSlice.reducer;
