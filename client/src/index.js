import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider, ColorModeScript, theme } from '@chakra-ui/react';
import { AnimateSharedLayout, AnimatePresence } from 'framer-motion';
import App from './app/App';

ReactDOM.render(
  <React.StrictMode>
    <AnimateSharedLayout>
      <AnimatePresence>
        <ChakraProvider>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <App />
        </ChakraProvider>
      </AnimatePresence>
    </AnimateSharedLayout>
  </React.StrictMode>,
  document.getElementById('root')
);
