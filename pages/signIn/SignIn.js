import * as React from 'react';
import {
    Container,
    Box,
    Typography,
    TextField,
    FormControlLabel,
    Checkbox,
    Button,
    Avatar,
    Grid,
    Link,
    } from '@mui/material';

    export default function SignIn() {
    return (
        <Container component="main" maxWidth='xl' sx={{ display: 'flex', height: '100vh' , justifyContent:'space-between'}}>
        <Grid container sx={{ flexGrow: 1 ,padding : 0 }}>
            <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
                backgroundImage: 'url(images/1.jpg)',
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                flexBasis: '60%',
            }}
            />
            <Grid item xs={12} sm={8} md={5} component={Box} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center', p: '5rem' }}>


            <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' , fontSize: '42px' }}>
                Sign In
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                sx = {{"& input" : {height:'48px' , py:'0px', border: 'solid 1px #E0E0E0' , borderRadius:'5px'}}}
                />
                <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                sx = {{"& input" : {height:'48px' , py:'0px', border: 'solid 1px #E0E0E0' , borderRadius:'5px'}}}
                />
                <Grid container sx={{ display:'flex' , alignItems:'center' }}>
                    <Grid item xs>
                        <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                        />
                    </Grid>

                    <Grid item >
                        <Link href="#" variant="body2" sx={{ color : 'black' , textDecorationColor : 'black' , opacity:.7 , '&:hover': {opacity: 1,}}}>
                        Forgot password?
                        </Link>
                    </Grid>
                </Grid>

                
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx = {{ mt: 3, mb: 2  , height:'47px' , py:'0px' , borderRadius:'4px' , textTransform: 'capitalize' , fontSize: '20px' ,borderRadius: '4px'}}>
                Sign In
                </Button>
                <Grid container >
                <Link href="#" variant="body2" sx={{ margin: '1rem auto' , color : 'black' ,    textDecorationColor : 'black' , opacity: .7 , '&:hover': {opacity: 1,}}}>
                    {"Don't have an account? "}
                    </Link>
                </Grid>

                {/* <Copyright sx={{ mt: 5 , margin:'1rem'}} /> */}

                <Button variant="outlined" sx={{display:'block' , margin:'auto' ,textTransform:'none' , borderRadius:'4px' ,fontSize:'20px' ,border: '1px solid #4E73DF'}}>Sign up</Button>
            </Box>
            </Grid>
        </Grid>
        </Container>
    );
}
