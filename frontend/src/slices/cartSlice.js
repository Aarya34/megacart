import {createSlice} from '@reduxjs/toolkit';

const initialState =localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) :{cartItems: []};
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart : (state, action) => {
            const item = action.payload;
            const existItem = state.cartItems.find(x => x.product === item.product);
            if(existItem){
                state.cartItems = state.cartItems.map(x => x.product === existItem.product ? item : x);
            }else{
                state.cartItems = [...state.cartItems, item];
            }
            state.itemsPrice = state.cartItems.reduce((acc, item) => acc + item.product.price * item.qty, 0);
            state.shippingPrice = state.itemsPrice > 100 ? 0 : 10;
            state.taxPrice = Number((0.15 * state.itemsPrice).toFixed(2));
            state.totalPrice = state.itemsPrice + state.shippingPrice + state.taxPrice;
            localStorage.setItem('cart', JSON.stringify(state));
        },
    },
});

export const {addToCart} = cartSlice.actions;
export default cartSlice.reducer;