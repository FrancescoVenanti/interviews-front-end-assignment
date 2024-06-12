// src/features/difficultiesSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Difficulty } from "../../types/Types";

interface DifficultiesState {
	difficulties: Difficulty[];
	status: "idle" | "loading" | "succeeded" | "failed";
	error: string | null | undefined;
}

const initialState: DifficultiesState = {
	difficulties: [],
	status: "idle",
	error: null,
};

export const fetchDifficulties = createAsyncThunk("difficulties/fetchDifficulties", async () => {
	const response = await axios.get("http://localhost:8080/difficulties");
	return response.data;
});

const difficultiesSlice = createSlice({
	name: "difficulties",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchDifficulties.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchDifficulties.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.difficulties = action.payload;
			})
			.addCase(fetchDifficulties.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export default difficultiesSlice.reducer;
