// src/features/commentsSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Comment } from "../../types/Types";

interface CommentsState {
	comments: Comment[];
	status: "idle" | "loading" | "succeeded" | "failed";
	error: string | null | undefined;
}

const initialState: CommentsState = {
	comments: [],
	status: "idle",
	error: null,
};

export const fetchComments = createAsyncThunk("comments/fetchComments", async () => {
	const response = await axios.get("http://localhost:8080/comments");
	return response.data;
});

const commentsSlice = createSlice({
	name: "comments",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchComments.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchComments.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.comments = action.payload;
			})
			.addCase(fetchComments.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export default commentsSlice.reducer;

// Repeat similar pattern for cuisinesSlice.ts, difficultiesSlice.ts, dietsSlice.ts
