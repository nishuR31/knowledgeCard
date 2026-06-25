import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "../features/themeSlice";
import userSlice from "../features/userSlice";
const store = configureStore({
    reducer: {
        themeSlice,
        userSlice
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;