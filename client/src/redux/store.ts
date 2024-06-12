// store.ts
import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./dataSlice"; // Ensure this is your slice reducer

const store = configureStore({
	reducer: {
		data: dataReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
