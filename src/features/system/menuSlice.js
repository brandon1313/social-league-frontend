import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    openMobile: false,
    anchorEl: null,
    drawerWidth: 250,
    styleModal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: '#FFFFFF',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4
    }
}

export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setOpenMobile: (state, action) => {
            state.openMobile = !state.openMobile;
        }
    }
});

export const { setOpenMobile } = menuSlice.actions;

export default menuSlice.reducer;