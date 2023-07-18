import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = 'http://localhost:8080/api/';

const initialState = {
    listGuides: [],
    data: '',
    status: '',
    selectedGuide: null,
    guideForm: {
        name: '',
        lastName: '',
        cui: '', 
        phone: '',
        avatarUrl: '',
        languages: null
    }
};

export const guideSlice = createSlice({
    name: 'guides',
    initialState,
    reducers: {
        setGuideList: (state, action) => {
            state.listGuides = action.payload;
        },
        setGuideForm: (state, action) => { 
            state.guideForm = action.payload;
        },
        setSelectedGuide: (state, action) => { 
            state.selectedGuide = action.payload;
        }
    },
    extraReducers: () => {
    }
});

export const getAllGuidesAsync = () => async (dispatch) => {
    try {
        const response = await axios.get(`${API_URL}guides`);
        const data = response.data.resultObject
        dispatch(setGuideList(data));
    } catch (error) {
        throw new Error(`Error en obtener todos los guias ${error}`);
    }
}

export const saveGuideAsync = (guideForm) => async (dispatch) => {
    try {
        const response = await axios.post(`${API_URL}guides`, guideForm);
        const data = response.data.resultObject;
        dispatch(setGuideForm(data));
        dispatch(getAllGuidesAsync());
    } catch (error) {
        throw new Error(`Error en guardar el guia ${error}`);
    }
}

export const { setGuideList, setGuideForm, setSelectedGuide } = guideSlice.actions;
export default guideSlice.reducer;