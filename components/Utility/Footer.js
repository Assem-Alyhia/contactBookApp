import {
    Box,
    Typography,
    Link
} from '@mui/material';

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

const Footer = ({color = '#fff', gap = '10%' ,opacity = '0.4'}) => {
    return (
        <Box sx={{
            position: 'fixed',
            bottom: '5px',
            width: '100%',
            zIndex: 10,
            py: 1,
            color: color,
            opacity: opacity,
        }}>
            <Box borderBottom={2} mb={2} />
            <Box mt={2} textAlign="center" sx={{ display: 'flex', justifyContent: 'start' }}>
                <Typography variant="body2" sx={{ margin: `${gap}`, fontSize: '12px' }}>
                    Privacy Policy - Terms & Conditions
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '12px' }}>
                    Copyright © ITM Development | Contact Book | 2022
                </Typography>
            </Box>
        </Box>
    );
}

export default Footer;
