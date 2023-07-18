import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: []
};

export const testSlice = createSlice({
    name: 'test',
    initialState,
    reducers: {
        testMutation: (state, action) => {
            [...state, action.payload];
        }
    },
});

export const { testMutation } = testSlice.actions;

export default testSlice.reducer;