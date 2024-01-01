import {createSlice, nanoid} from "@reduxjs/toolkit";

const initialState = {
    bun: null,
    ingredients: [],
}

const burgerConstructorSlice = createSlice({
    name: "burgerConstructor",
    initialState,
    reducers: {
        bunUpdated: (state, action) => {
            state.bun = action.payload
        },
        ingredientAdded: {
            reducer: (state, action) => {
                state.ingredients.push(action.payload)
            },
            prepare: (item) => ({
                payload: {...item, nanoId: nanoid()}
            })
        },
        ingredientRemoved: (state, action) => {
            state.ingredients = state.ingredients.filter(item => item.nanoId !== action.payload.nanoId)
        }
    }
})

export const {bunUpdated, ingredientAdded, ingredientRemoved} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;