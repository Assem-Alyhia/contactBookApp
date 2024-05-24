import * as React from 'react';
import {
    Container,
    Box,
    Typography,
    OutlinedInput,
    InputAdornment,
    FormControl,
    FormControlLabel,
    Checkbox,
    Button,
    Grid,
    Link,
    IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Footer from '@/components/Utility/Footer';

export default function SignIn() {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((prev) => !prev);

    return (
        <Box>
        <Container component="main" maxWidth='xl' sx={{ display: 'flex', height: '100vh', justifyContent: 'space-between', padding: '0 !important' }}>
            <Grid container sx={{ flexGrow: 1, padding: 0 }}>
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
                <Grid item xs={12} sm={8} md={4} component={Box} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center', padding: '5rem 2rem 5rem 8rem' }}>
                    <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', fontSize: '30px' }}>
                        Sign In
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <FormControl fullWidth variant="outlined" size="small" required margin="normal">
                            <OutlinedInput
                                id="email"
                                type="email"
                                name="email"
                                autoComplete="off"
                                autoFocus
                                placeholder="Email Address"
                                sx={{ "& .MuiOutlinedInput-root": { border: 'solid 1px #E0E0E0', borderRadius: '5px' } }}
                            />
                        </FormControl>
                        <FormControl fullWidth variant="outlined" size="small" required margin="normal">
                            <OutlinedInput
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                autoComplete="off"
                                placeholder="Password"
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
                            />
                        </FormControl>
                        <Grid container sx={{ display: 'flex', alignItems: 'center' }}>
                            <Grid item xs>
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                    sx={{ '& .MuiFormControlLabel-label': { fontSize: '13px' } }}
                                />
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2" sx={{ color: 'black', textDecorationColor: 'black', opacity: .7, '&:hover': { opacity: 1, }, fontSize: '13px' }}>
                                    Forgot password?
                                </Link>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, height: '2.5em', py: '0px', borderRadius: '4px', textTransform: 'capitalize', fontSize: '14px' }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Link href="#" variant="body2" sx={{ margin: '1rem auto', color: 'black', textDecorationColor: 'black', opacity: .7, '&:hover': { opacity: 1, }, fontSize: '13px' }}>
                                {"Don't have an account? "}
                            </Link>
                        </Grid>
                        <Button variant="outlined" sx={{ height: '2.5em', display: 'block', margin: 'auto', textTransform: 'none', borderRadius: '4px', fontSize: '14px', border: '1px solid #4E73DF' }}>
                            Sign up
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
        <Footer  color = '#fff' gap = '0 10%' />
        </Box>
    );
}
