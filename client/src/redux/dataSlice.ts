// dataSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface DataState {
	items: any[];
	status: "idle" | "loading" | "succeeded" | "failed";
	error: string | null;
}

const initialState: DataState = {
	items: [],
	status: "idle",
	error: null,
};

export const fetchData = createAsyncThunk("data/fetchData", async () => {
	const response = await fetch("http://localhost:8080/recipes");
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	const data = await response.json();
	return data;
});

const dataSlice = createSlice({
	name: "data",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchData.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchData.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.items = action.payload;
			})
			.addCase(fetchData.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message || "Failed to fetch data";
			});
	},
});

export default dataSlice.reducer;
