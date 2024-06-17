// src/features/commentsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
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

export const addComment = createAsyncThunk(
	"comments/addComment",
	async ({
		recipeId,
		comment,
		rating,
		date,
	}: {
		recipeId: string;
		comment: string;
		rating: number;
		date: string;
	}) => {
		const response = await axios.post(
			`http://localhost:8080/recipes/${recipeId}/comments`,
			{
				comment,
				rating,
				date,
			},
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		return response.data;
	}
);

const commentsSlice = createSlice({
	name: "comments",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchComments.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchComments.fulfilled, (state, action: PayloadAction<Comment[]>) => {
				state.status = "succeeded";
				state.comments = action.payload;
			})
			.addCase(fetchComments.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(addComment.pending, (state) => {
				state.status = "loading";
			})
			.addCase(addComment.fulfilled, (state, action: PayloadAction<Comment>) => {
				state.status = "succeeded";
				state.comments.push(action.payload);
			})
			.addCase(addComment.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export default commentsSlice.reducer;
