import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
    theme: "dark" | "light";
}

interface BaseState {
    base: "mini" | "glass" | "clay"
}

const initialState: BaseState & ThemeState = {
    theme: "dark",
    base: "glass"
};



const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        // setTheme: (state, action: PayloadAction<string>) => {
        //     state.theme = action.payload as "dark" | "light";
        // },
        // setBase: (state, action: PayloadAction<string>) => {
        //     state.base = action.payload as "mini" | "glass" | "clay";
        // },

        setTheme: (state, action: PayloadAction<ThemeState>) => {
            state.theme = action.payload.theme;
        },
        setBase: (state, action: PayloadAction<BaseState>) => {
            state.base = action.payload.base;
        },
    },
});

export const { setTheme, setBase } = themeSlice.actions;
export default themeSlice.reducer;