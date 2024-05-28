import Navbar from './Navbar';
import {
    Box,
} from '@mui/material';
const Layout = ({  pathname , children}) => {
    return ( 
        <Box>
            {!pathname.startsWith('/auth') ? (<Navbar/>) : (null)}
            { children }
        </Box>
    );
}
export default Layout;