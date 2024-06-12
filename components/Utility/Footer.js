import React from 'react';
import { Box, Typography, Link } from '@mui/material';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                ITM Development Contact Book
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const Footer = ({ color = '#fff', gap = '10%', opacity = '0.4', mdPosition = 'fixed' , marginTop }) => {
    return (
        <Box sx={{
            width: '100%',
            zIndex: 10,
            py: 1,
            color: color,
            opacity: opacity,
            position: { xs: 'relative', md: mdPosition },
            bottom: { xs: 'auto', md: '5px' },
            // mt: { xs: 2, md: 0 }, 
            marginTop: { xs: marginTop , md: 0 }, 
            '@media (max-width: 700px)': {
                color: 'black'
            }
        }}>
            <Box borderBottom={2} mb={2} />
            <Box mt={2} textAlign="center" sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: { xs: 'center', md: 'start' }, alignItems: { xs: 'center', md: 'start' } }}>
                <Typography variant="body2" sx={{ margin: { md: `${gap}` }, fontSize: { xs: '10px', md: '12px' } }}>
                    Privacy Policy - Terms & Conditions
                </Typography>
                <Typography variant="body2" sx={{ fontSize: { xs: '10px', md: '12px' } }}>
                    Copyright © ITM Development | Contact Book | 2022
                </Typography>
            </Box>
        </Box>
    );
}

export default Footer;
