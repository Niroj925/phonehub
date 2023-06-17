import { Providers } from '@/features/provider.js';

function MyApp({ Component, ...rest }) {

  return (
    <Providers >
     <Component {...rest}/>
    </Providers>
  );
}

export default MyApp;
