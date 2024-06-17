// src/features/cuisinesSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Cuisine } from "../../types/Types";

interface CuisinesState {
	cuisines: Cuisine[];
	status: "idle" | "loading" | "succeeded" | "failed";
	error: string | null | undefined;
}

const initialState: CuisinesState = {
	cuisines: [],
	status: "idle",
	error: null,
};

export const fetchCuisines = createAsyncThunk("cuisines/fetchCuisines", async () => {
	const response = await axios.get("http://localhost:8080/cuisines");
	return response.data;
});

const cuisinesSlice = createSlice({
	name: "cuisines",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCuisines.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchCuisines.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.cuisines = action.payload;
			})
			.addCase(fetchCuisines.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export default cuisinesSlice.reducer;
