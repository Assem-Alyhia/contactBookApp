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
    
    import Footer from '@/components/Utility/Footer';

    export default function SetPassword() {
    return (
        <Container component="main" maxWidth='xl' sx={{ display: 'flex', height: '100vh' , justifyContent:'space-between' , padding: '0 !important' }}>
        <Grid container sx={{ flexGrow: 1 ,padding : 0 }}>
            <Grid
            item
            xs={false}
            sm={4}
            md={8}
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
            <Grid item xs={12} sm={8} md={4} component={Box} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center', padding:'0 7rem' }}>

            <Typography component="h1" variant="h5"  sx={{ fontWeight: 'bold', fontSize: '30px' }}>
                Change Password
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                fullWidth
                id="email"
                label=" Enter your email address "
                name="email"
                autoComplete="email"
                autoFocus
                size={'small'}
                sx={{ "& input": { border: 'solid 1px #E0E0E0', borderRadius: '5px' } }}
                />

                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, height: '2.5em', py: '0px', borderRadius: '4px', textTransform: 'capitalize', fontSize: '14px', borderRadius: '4px' }}
                >
                Send
                </Button>
                <Grid container justifyContent="flex-end">
                    <Grid item sx={{ margin: 'auto' }}>
                        <Link href="#" variant="body2">
                            {"Back to login"}
                        </Link> 
                    </Grid>
                </Grid>
            </Box>
            </Grid>
        </Grid>
        <Footer  color = '#fff' gap = '0 15% 0 10%'  />
        </Container>
    );
}
