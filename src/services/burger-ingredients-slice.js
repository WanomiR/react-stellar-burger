import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

import {NORMA_API} from "../utils/constants";


const initialState = {
    ingredients: [],
    status: "idle",
    error: null,
}

export const fetchIngredients = createAsyncThunk("ingredients/fetchIngredients", async () => {
    const res = await fetch(`${NORMA_API}/ingredients`);
    return res.json()
})

export const burgerIngredientsSlice = createSlice({
    name: "ingredients",
    initialState,
    reducers: {
        countIncremented: (state, action) => {
            const ingredient = state.ingredients.find(item => item._id === action.payload._id)
            ingredient.count++

            if (ingredient.type === "bun") {
                ingredient.count++  // add second bun
                state.ingredients   // reset count for the other bun
                    .find(item => item.type === "bun" && item._id !== action.payload._id)
                    .count = 0
            }
        },
        countDecremented: (state, action) => {
            state.ingredients.find(item => item._id === action.payload._id).count--
        },
    },
    extraReducers: builder => {
       builder
           .addCase(fetchIngredients.pending, state => {
               state.status = "loading"
           })
           .addCase(fetchIngredients.fulfilled, (state, action) => {
               state.status = "success"
               state.ingredients = action.payload.data.map(item => ({
                   ...item, count: 0,
               }))
           })
           .addCase(fetchIngredients.rejected, (state, action) => {
               state.status = "failed"
               state.ingredients = []
               state.error = action.error.message
           })
    }
});


export const {
    countIncremented,
    countDecremented,
} = burgerIngredientsSlice.actions;


export default burgerIngredientsSlice.reducer;
