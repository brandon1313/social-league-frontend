import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchGuides = createAsyncThunk(
    'guides/getAll',
    async ({ rejectWithValue }) => {
        try {
            const response = await fetch('');
            const data = await response.json();

            return data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
)