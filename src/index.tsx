import React from 'react';
import ReactDOM from 'react-dom/client';
import './theme/globals.css';
import {
  ChakraProvider,
  extendTheme,
  ColorModeScript,
} from '@chakra-ui/react';

import App from './App';

const theme = extendTheme({
  config: { initialColorMode: 'light', useSystemColorMode: false },
  styles: {
    global: {
      body: { bg: 'gray.50', color: 'gray.800' },
    },
  },
  fonts: {
    heading: `'Poppins', system-ui, sans-serif`,
    body:    `'Poppins', system-ui, sans-serif`,
  },
  colors: {
    brand: {
      400: '#ff7e5f',
      500: '#feb47b',
    },
  },
  radii: {
    md: '8px',
    lg: '16px',
  },
});

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  );
}
