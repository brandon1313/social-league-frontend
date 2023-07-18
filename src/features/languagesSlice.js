import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = 'http://localhost:8080/api/';

const initialState = {
    listLanguages: [],
    data: '',
    status: '',
    languageForm: {
        guideId: 0,
        name: '',
        description: ''
    }
}

export const languageSlice = createSlice({
    name: 'languages',
    initialState,
    reducers: {
        setLanguageList: (state, action) => {
            state.listLanguages = action.payload;
        },
        setLanguageForm: (state, action) => {
            state.languageForm = action.payload;
        }
    }
})

export const getAllLanguagesAsync = () => async (dispatch) => {
    try {
        const response = await axios.get(`${API_URL}languages`);
        const data = response.data.body;
        dispatch(setLanguageList(data));
    } catch (error) {
        throw new Error(`Error en getAllLanguagesAsync: ${error.message}`);
    }
}

export const saveLanguageAsync = (languageForm) => async (dispatch) => {
    try {
        const response = await axios.post(API_URL + 'languages', languageForm);
        const data = response.data.body;
        dispatch(setLanguageForm(data));
        dispatch(getAllLanguagesAsync());
    } catch (error) {
        throw new Error(`Error en saveGuideAsync: ${error.message}`);
    }
}

export const getLanguageByIdAsync = (id) => async (dispatch) => {
    try {
        const response = await axios.get(`${API_URL}languages/${id}`);
        const data = response.data.body;
        dispatch(setLanguageForm(data));
    } catch (error) {
        throw new Error(`Error en getLanguageByIdAsync: ${error.message}`);
    }
}

export const { setLanguageList, setLanguageForm } = languageSlice.actions;
export default languageSlice.reducer;