import {
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";
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

export const ingredientsSlice = createSlice({
    name: "ingredients",
    initialState,
    reducers: {},
    extraReducers(builder) {
       builder
           .addCase(fetchIngredients.pending, (state, action) => {
               state.status = "loading"
           })
           .addCase(fetchIngredients.fulfilled, (state, action) => {
               state.status = "success"
               state.ingredients = action.payload.data
           })
           .addCase(fetchIngredients.rejected, (state, action) => {
               state.status = "failed"
               state.error = action.error.message
           })
    }
});

export default ingredientsSlice.reducer;
