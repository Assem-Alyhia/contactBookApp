import Navbar from './Navbar';
import TanstackProvider from '../providers/TanstackProvider';

import {
    Box,
} from '@mui/material';
const Layout = ({  pathname , children}) => {
    return ( 
        <Box>
            <TanstackProvider>
                {!pathname.startsWith('/auth') ? (<Navbar/>) : (null)}
                { children }
            </TanstackProvider>
        </Box>
    );
}
export default Layout;