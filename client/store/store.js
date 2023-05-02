import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
// import { createWrapper } from 'next-redux-wrapper';
// import thunkMiddleware from 'redux-thunk';
// import rootReducer from './reducer/rootreducer';

// const makeStore = () =>
//   configureStore({
//     reducer: rootReducer,
//     devTools: true,
//     middleware: [thunkMiddleware],
//   });

// export const wrapper = createWrapper(makeStore);


// import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import thunkMiddleware from 'redux-thunk';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducer/rootreducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'product'], // only persist the user and product slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: [thunkMiddleware],
  });

export const wrapper = createWrapper(makeStore);

// Create a persistor object for persisting the Redux store
export const persistor = persistStore(makeStore());


