import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    modalOpacity: 1,
    ingredientData: {}
}

const ingredientDetailsSlice = createSlice({
    name: "ingredientDetails",
    initialState,
    reducers: {
        ingredientDetailsOpened: (state, action) => {
            state.isOpen = true
            state.ingredientData = action.payload
        },
        ingredientDetailsClosed: (state, action) => {
            state.isOpen = false
            state.ingredientData = {}
        },
        modalOpacitySet: (state, action) => {
            state.modalOpacity = action.payload
        }
    }
})

export const {
    ingredientDetailsOpened,
    ingredientDetailsClosed,
    modalOpacitySet
} = ingredientDetailsSlice.actions;

export default ingredientDetailsSlice.reducer;