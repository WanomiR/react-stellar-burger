import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./ingredientsSlice"

export default configureStore({
    reducer: {
        ingredients: ingredientsReducer
    }
})