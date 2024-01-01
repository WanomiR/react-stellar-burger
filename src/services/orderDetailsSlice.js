import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

import {NORMA_API} from "../utils/constants";

const initialState = {
    modalIsOpen: false,
    orderId: "034536",
    status: "Ваш заказ начали готовить",
    message: "Дождитесь готовности на орбитальной станции"
}

export const fetchOrderDetails = createAsyncThunk("orderDetails/fetchOrderDetails", async (ingredients) => {
    const res = await fetch(`${NORMA_API}/orders`, {
        method: "POST",
        headers: JSON.stringify({ingredients})
    })
    return res.json()
})


const orderDetailsSlice = createSlice({
    name: "orderDetails",
    initialState,
    reducers: {
        orderDetailsOpened: (state, action) => {
            state.modalIsOpen = true
        },
        orderDetailsClosed: (state, action) => {
            state.modalIsOpen = false
        }
    },
})

export const {
    orderDetailsOpened,
    orderDetailsClosed
} = orderDetailsSlice.actions;

export default orderDetailsSlice.reducer;