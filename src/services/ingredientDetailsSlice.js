import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
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
        }
    }
})

export const {
    ingredientDetailsOpened,
    ingredientDetailsClosed
} = ingredientDetailsSlice.actions;

export default ingredientDetailsSlice.reducer;