import { configureStore } from "@reduxjs/toolkit";
import userSlice, { JWT_PERSISTED_STATE } from "./user.slice";
import { saveState } from "./storage";
import cartSlice, { CART_PERSISTED_STATE } from "./cart.slice";

export const store = configureStore({
	reducer: {
		user: userSlice,
		cart: cartSlice
	}
});

store.subscribe(() => {
	saveState({ jwt: store.getState().user.jwt }, JWT_PERSISTED_STATE);
	saveState(store.getState().cart, CART_PERSISTED_STATE);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;