import { configureStore } from "@reduxjs/toolkit";

import menu from "../features/system/menuSlice";


export const store = configureStore({
    reducer: {

        menu
    },
    devTools: true
});

export default store;