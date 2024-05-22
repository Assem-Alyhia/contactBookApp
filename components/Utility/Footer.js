import {
    Box,
    Typography,
    } from '@mui/material';

const Footer = () => {
    return ( 
    <Box sx={{ opacity: 0.5 , position : 'relative' , height:'20rem'  }}>
        <Box sx={{ position : 'absolute' , width:'100%' , bottom:0}}>
            <Box borderBottom={2} mb={2} sx={{ opacity: 0.5 }} />
                <Box mt={2} textAlign="center" sx={{display:'flex' , justifyContent: 'space-evenly' }}>
                    <Typography variant="body2">
                        Privacy Policy - Terms & Conditions
                    </Typography>
                    <Typography variant="body2">
                        Copyright © ITM Development | Contact Book | 2022
                    </Typography>
                </Box>
        </Box>
    </Box>
    );
}

export default Footer;