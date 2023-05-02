import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedProduct: {
    features: [],
  },
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
     SelectedProduct:(state,action)=>{
      state.selectedProduct = action.payload;
    }
  },
});

export const {SelectedProduct } = productSlice.actions;
export default productSlice.reducer;
