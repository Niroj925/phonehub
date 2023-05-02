// import { Provider } from 'react-redux';
// import { wrapper } from '../store/store';
// // import '../styles/globals.css';

// function MyApp({ Component, ...rest }) {
//   const { store, props } = wrapper.useWrappedStore(rest);
//   const { pageProps } = props;
//   return (
//     <Provider store={store}>
//       <Component {...pageProps} />
//     </Provider>
//   );
// }

// export default MyApp;




import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { wrapper, persistor } from '../store/store';

function MyApp({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
