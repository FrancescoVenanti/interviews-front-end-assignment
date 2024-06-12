// src/features/recipesSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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

const recipesSlice = createSlice({
	name: "recipes",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchRecipes.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchRecipes.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.recipes = action.payload;
			})
			.addCase(fetchRecipes.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export default recipesSlice.reducer;

// Repeat similar pattern for other slices
