import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    ingredientData: {}
}

const ingredientDetailsSlice = createSlice({
    name: "ingredientDetails",
    initialState,
    reducers: {
        detailsOpened: (state, action) => {
            state.isOpen = true
            state.ingredientData = action.payload
        },
        detailsClosed: (state, action) => {
            state.isOpen = false
            state.ingredientData = {}
        }
    }
})

export const {detailsOpened, detailsClosed} = ingredientDetailsSlice.actions;

export default ingredientDetailsSlice.reducer;