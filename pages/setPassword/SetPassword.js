import * as React from 'react';
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    Link,
    } from '@mui/material';


    export default function SetPassword() {
    return (
        <Container component="main" maxWidth='xl' sx={{ display: 'flex', height: '100vh' , justifyContent:'space-between'}}>
        <Grid container sx={{ flexGrow: 1 ,padding : 0 }}>
            <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
                flexBasis: '60%',
                backgroundImage: 'url(images/1.jpg)',
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            />
            <Grid item xs={12} sm={8} md={5} component={Box} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center', padding:'0 8rem' }}>

            <Typography component="h1" variant="h5"  sx={{fontWeight: 'bold' , fontSize: '42px' }}>
                Set a Password
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                margin="normal"
                required
                fullWidth
                id="Password"
                label="Password"
                type='Password'
                name="Password"
                autoComplete="current-password"
                autoFocus
                sx = {{"& input" : {height:'48px' , py:'0px', border: 'solid 1px #E0E0E0' , borderRadius:'5px'}}}
                />
                <TextField
                margin="normal"
                required
                fullWidth
                name="Confirm password"
                label="Confirm password"
                type="Password"
                id="Confirm password"
                autoComplete="current-password"
                 // sx={{ border: 'solid 1px #E0E0E0' , borderRadius:'5px'}}
                sx = {{"& input" : {height:'48px' , py:'0px', border: 'solid 1px #E0E0E0' , borderRadius:'5px'}}}
                />

                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx = {{ mt: 3, mb: 2  , height:'47px' , py:'0px' , borderRadius:'4px' , textTransform: 'capitalize' , fontSize: '20px' ,borderRadius: '4px'}}                >
                Reset Password
                </Button>

            </Box>
            </Grid>
        </Grid>
        </Container>
    );
}
