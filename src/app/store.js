import { configureStore } from "@reduxjs/toolkit";
import guides from "../features/guideSlice";
import menu from "../features/system/menuSlice";
import test from "../features/test/testSlice";
import languages from "../features/languagesSlice";

export const store = configureStore({
    reducer: {
        test,
        menu,
        guides,
        languages
    },
    devTools: true
});

export default store;