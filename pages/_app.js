import "@/styles/globals.css";
// src/pages/_app.js
import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from "@/components/Utility/Layout";
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#4caf50',
    },
    error: {
      main: '#f44336',
    },
    background: {
      default: '#fff',
    },
  },
});

export default function MyApp({ Component, pageProps, ...appProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout pathname={appProps.router.pathname}>
          {getLayout(<Component {...pageProps} />)}
        </Layout>
      </ThemeProvider>
    
  );
}
