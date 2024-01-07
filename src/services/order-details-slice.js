import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

import {NORMA_API} from "../utils/constants";


const initialState = {
    modalIsOpen: false,
    status: "idle",
    error: null,
    name: "",
    order: {},
    success: false,
}

export const fetchOrderDetails =
    createAsyncThunk("orderDetails/fetchOrderDetails", async (ingredients) => {
    const res = await fetch(`${NORMA_API}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ingredients})
    })
    return res.json()
})


const orderDetailsSlice = createSlice({
    name: "orderDetails",
    initialState,
    reducers: {
        orderDetailsOpened: state => {
            state.modalIsOpen = true
        },
        orderDetailsClosed: state => {
            state.modalIsOpen = false
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchOrderDetails.pending, state => {
                state.status = "loading"
            })
            .addCase(fetchOrderDetails.fulfilled, (state, action) => {
                state.status = "success"
                Object.assign(state, action.payload);
            })
            .addCase(fetchOrderDetails.rejected, (state, action) => {
                Object.assign(state, {
                    status: "failed",
                    error: action.error.message,
                    name: "",
                    order: {},
                    success: false,
                })
            })
    }
})


export const {
    orderDetailsOpened,
    orderDetailsClosed
} = orderDetailsSlice.actions;


export default orderDetailsSlice.reducer;