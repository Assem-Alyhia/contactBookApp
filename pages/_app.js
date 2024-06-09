// src/pages/_app.js
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from "@/components/Utility/Layout";
import TanstackProvider from "@/components/providers/TanstackProvider";
import "@/styles/globals.css";

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#4caf50' },
    error: { main: '#f44336' },
    background: { default: '#fff' },
  },
});

export default function MyApp({ Component, pageProps, ...appProps }) {
  return (
    <TanstackProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout pathname={appProps.router.pathname}>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
    </TanstackProvider>
  );
}
