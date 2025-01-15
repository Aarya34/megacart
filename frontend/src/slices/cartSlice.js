import {createSlice} from '@reduxjs/toolkit';
import { act } from 'react';

const initialState =localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) :{cartItems: [],
    shippingAddress:{},
    paymentMethod: 'PayPal',
};
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart : (state, action) => {
            const item = action.payload;
            console.log(item);
            const existItem = state.cartItems.find(x => x.product._id === item.product._id);
            if(existItem){
                existItem.qty += item.qty;
                
            }else{
                state.cartItems = [...state.cartItems, item];
            }

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
            state.itemsPrice = state.cartItems.reduce((acc, item) => acc + item.product.price * item.qty, 0);
            state.shippingPrice = state.itemsPrice > 100 ? 0 : 10;
            state.taxPrice = Number((0.15 * state.itemsPrice).toFixed(2));
            state.totalPrice = state.itemsPrice + state.shippingPrice + state.taxPrice;
            localStorage.setItem('cart', JSON.stringify(state));
        },
        removeItem: (state, action) => {
            state.cartItems = state.cartItems.filter((item) => {
                return item.product._id !== action.payload.id;
            });

            state.itemsPrice = state.cartItems.reduce((acc, item) => acc + item.product.price * item.qty, 0);
            state.shippingPrice = state.itemsPrice > 100 ? 0 : 10;
            state.taxPrice = Number((0.15 * state.itemsPrice).toFixed(2));
            state.totalPrice = state.itemsPrice + state.shippingPrice + state.taxPrice;
            localStorage.setItem('cart', JSON.stringify(state));
        },
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
            localStorage.setItem('cart', JSON.stringify(state));
        },
        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
            localStorage.setItem('cart', JSON.stringify(state));
        },
        clearCart: (state) => {
            state.cartItems = [];
            state.itemsPrice = 0;
            state.shippingPrice = 0;
            state.taxPrice = 0;
            state.totalPrice = 0;
            localStorage.setItem('cart', JSON.stringify(state));
        }
    },
});

export const {addToCart,atCart,removeItem,saveShippingAddress,savePaymentMethod,clearCart} = cartSlice.actions;
export default cartSlice.reducer;