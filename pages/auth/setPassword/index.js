import * as React from 'react';
import { Container, Box, Typography, Button, Grid, OutlinedInput, InputLabel, FormControl, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import Footer from '@/components/Utility/Footer';

export default function SetPassword() {
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((prev) => !prev);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

    return (
        <Container component="main" maxWidth='xl' sx={{ display: 'flex', height: '100vh', justifyContent: 'space-between', padding: '0 !important' }}>
            <Grid container sx={{ flexGrow: 1, padding: 0 }}>
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
                <Grid item xs={12} sm={8} md={4} component={Box} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center', padding: '0  7rem' }}>
                    <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', fontSize: '30px' }}>
                        Set a Password
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <FormControl fullWidth variant="outlined" size="small" required margin="normal">
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <OutlinedInput
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                autoComplete="current-password"
                                sx={{ "& .MuiOutlinedInput-root": { border: 'solid 1px #E0E0E0', borderRadius: '5px' } }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                            sx={{ padding: 0 , marginRight:'2px'}}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                        <FormControl fullWidth variant="outlined" size="small" required margin="normal">
                            <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
                            <OutlinedInput
                                id="confirm-password"
                                type={showConfirmPassword ? 'text' : 'password'}
                                name="confirm-password"
                                autoComplete="current-password"
                                sx={{ "& .MuiOutlinedInput-root": { border: 'solid 1px #E0E0E0', borderRadius: '5px' } }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowConfirmPassword}
                                            edge="end"
                                            sx={{ padding: 0 , marginRight:'2px'}}
                                        >
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Confirm Password"
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, height: '2.5em', py: '0px', borderRadius: '4px', textTransform: 'capitalize', fontSize: '14px' }}
                        >
                            Reset Password
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            <Footer  color = '#fff' gap = '0 15% 0 10%'  />
        </Container>
    );
}
