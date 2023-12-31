import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./ingredientsSlice"
import constructorReducer from "./constructorSlice";
import ingredientDetailsReducer from "./ingredientDetailsSlice";

export default configureStore({
    reducer: {
        ingredients: ingredientsReducer,
        burgerConstructor: constructorReducer,
        ingredientDetails: ingredientDetailsReducer,
    },
})