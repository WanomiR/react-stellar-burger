import {
    createSlice,
    createAsyncThunk,
    nanoid
} from "@reduxjs/toolkit";
import {NORMA_API} from "../utils/constants";

const initialState = {
    ingredients: [],
    status: "idle",
    error: null,
    activeTab: "Булки"
}

export const fetchIngredients = createAsyncThunk("ingredients/fetchIngredients", async () => {
    const res = await fetch(`${NORMA_API}/ingredients`);
    return res.json()
})

export const ingredientsSlice = createSlice({
    name: "ingredients",
    initialState,
    reducers: {
        countIncremented: (state, action) => {
            state.ingredients.find(item => item._id === action.payload._id).count++
            if (action.payload.type === "bun") {
                state.ingredients
                    .find(item => item.type === "bun" && item._id !== action.payload._id)
                    .count = 0
            }
        },
        countDecremented: (state, action) => {
            state.ingredients.find(item => item._id === action.payload._id).count--
        },
        activeTabSelected: (state, action) => {
            state.activeTab = action.payload
        }
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
               state.error = action.error.message
           })
    }
});

export const {
    countIncremented,
    countDecremented,
    activeTabSelected
} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
