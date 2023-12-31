import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./ingredientsSlice"
import constructorReducer from "./constructorSlice";

export default configureStore({
    reducer: {
        ingredients: ingredientsReducer,
        burgerConstructor: constructorReducer,
    },
    // middleware: getDefaultMiddleware => getDefaultMiddleware({
    //     serializableCheck: false,
    // })
})