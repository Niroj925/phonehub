
import { createSlice } from "@reduxjs/toolkit"

const initialState={
    products:[],
    reviews:[],
}

export const productSlice=createSlice({
    name:'product',
    initialState,
    reducers:{
        setProduct:(state,action)=>{
            state.products=action.payload;
        },
        setReviews:(state,action)=>{
            state.reviews=action.payload;
        }
    }
});

export const {setProduct,setReviews}=productSlice.actions;

export default productSlice.reducer;