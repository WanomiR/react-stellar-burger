import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./ingredientsSlice"
import constructorReducer from "./burgerConstructorSlice";
import ingredientDetailsReducer from "./ingredientDetailsSlice";
import orderDetailsReducer from "./orderDetailsSlice";

export default configureStore({
    reducer: {
        ingredients: ingredientsReducer,
        burgerConstructor: constructorReducer,
        ingredientDetails: ingredientDetailsReducer,
        orderDetails: orderDetailsReducer,
    },
})