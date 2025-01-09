import {createSlice} from '@reduxjs/toolkit';
import { act } from 'react';

const initialState =localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) :{cartItems: [],
    qty: 0,
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0
};
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart : (state, action) => {
            const item = action.payload;
            const existItem = state.cartItems.find(x => x.product._id === item.product._id);
            if(existItem){
                existItem.qty += item.qty;
                // state.cartItems = state.cartItems.map(x => x.product === existItem.product ? item : x);
            }else{
                state.cartItems = [...state.cartItems, item];
            }
            // state.qty+= item.qty;
            state.itemsPrice = state.cartItems.reduce((acc, item) => acc + item.product.price * item.qty, 0);
            state.shippingPrice = state.itemsPrice > 100 ? 0 : 10;
            state.taxPrice = Number((0.15 * state.itemsPrice).toFixed(2));
            state.totalPrice = state.itemsPrice + state.shippingPrice + state.taxPrice;
            localStorage.setItem('cart', JSON.stringify(state));
        },
        atCart :(state, action) => {
            const item = action.payload;
            const existItem = state.cartItems.find(x => x.product._id === item.product._id);
            existItem.qty = item.qty;
        },
        removeItem: (state, action) => {
            console.log(action.payload)
            state.cartItems = state.cartItems.filter((item) => {
                console.log('Comparing:', item.product._id, action.payload);
                return item.product._id !== action.payload;
            });
            console.log(state.cartItems)
            
            localStorage.setItem('cart', JSON.stringify(state));
        }
    },
});

export const {addToCart,atCart,removeItem} = cartSlice.actions;
export default cartSlice.reducer;