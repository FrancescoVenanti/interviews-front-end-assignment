// rootReducer.ts
// src/store/rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";
import recipeSlice from "./Slicer/recipeSlice";
import commentSlice from "./Slicer/commentSlice";
import cousineSlice from "./Slicer/cousineSlice";
import difficultiesSlice from "./Slicer/difficultiesSlice";
import dietsSlice from "./Slicer/dietsSlice";

const rootReducer = combineReducers({
	recipes: recipeSlice,
	comments: commentSlice,
	cuisines: cousineSlice,
	difficulties: difficultiesSlice,
	diets: dietsSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
