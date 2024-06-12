// src/features/dietsSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Diet } from "../../types/Types";

interface DietsState {
	diets: Diet[];
	status: "idle" | "loading" | "succeeded" | "failed";
	error: string | null | undefined;
}

const initialState: DietsState = {
	diets: [],
	status: "idle",
	error: null,
};

export const fetchDiets = createAsyncThunk("diets/fetchDiets", async () => {
	const response = await axios.get("http://localhost:8080/diets");
	return response.data;
});

const dietsSlice = createSlice({
	name: "diets",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchDiets.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchDiets.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.diets = action.payload;
			})
			.addCase(fetchDiets.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export default dietsSlice.reducer;
