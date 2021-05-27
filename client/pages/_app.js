import { ChakraProvider } from '@chakra-ui/react';
import { AnimateSharedLayout, AnimatePresence } from 'framer-motion';
import '../styles/index.scss';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <AnimateSharedLayout>
        <AnimatePresence>
          <Component {...pageProps} />
        </AnimatePresence>
      </AnimateSharedLayout>
    </ChakraProvider>
  );
}

export default MyApp;
