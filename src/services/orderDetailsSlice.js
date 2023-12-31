import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    orderId: "034536",
    status: "Ваш заказ начали готовить",
    message: "Дождитесь готовности на орбитальной станции"
}

const orderDetailsSlice = createSlice({
    name: "orderDetails",
    initialState,
    reducers: {
        orderDetailsOpened: (state, action) => {
            state.isOpen = true
        },
        orderDetailsClosed: (state, action) => {
            state.isOpen = false
        }
    }
})

export const {
    orderDetailsOpened,
    orderDetailsClosed
} = orderDetailsSlice.actions;

export default orderDetailsSlice.reducer;