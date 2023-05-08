import { combineReducers } from 'redux';
import userReducer from '../slices/userSlice';
import productReducer from '../slices/productslice';

const rootReducer = combineReducers({
  user:userReducer,
  product: productReducer,
  // add other reducers here
});

export default rootReducer;