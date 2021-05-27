import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { AnimateSharedLayout, AnimatePresence } from 'framer-motion';
import App from './app/App';

ReactDOM.render(
  <React.StrictMode>
    <AnimateSharedLayout>
      <AnimatePresence>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </AnimatePresence>
    </AnimateSharedLayout>
  </React.StrictMode>,
  document.getElementById('root')
);
