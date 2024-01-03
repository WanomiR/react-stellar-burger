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
        },
        ingredientMoved: (state, action) => {
            const {indexFrom, indexTo} = action.payload
            state.ingredients
                .splice(indexTo, 0, state.ingredients.splice(indexFrom, 1)[0])

        }

    }
})

export const {
    bunUpdated,
    ingredientAdded,
    ingredientRemoved,
    ingredientMoved
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;