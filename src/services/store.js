import { configureStore } from "@reduxjs/toolkit";

import ingredientsReducer from "./burger-ingredients-slice"
import constructorReducer from "./burger-constructor-slice";
import ingredientDetailsReducer from "./ingredient-details-slice";
import orderDetailsReducer from "./order-details-slice";


export default configureStore({
    reducer: {
        ingredients: ingredientsReducer,
        burgerConstructor: constructorReducer,
        ingredientDetails: ingredientDetailsReducer,
        orderDetails: orderDetailsReducer,
    },
})