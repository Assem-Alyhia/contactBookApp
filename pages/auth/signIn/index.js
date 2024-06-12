import React, { useState } from 'react';
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
    IconButton,
    Snackbar,
    Alert
} from '@mui/material';
import Link from 'next/link';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Footer from '@/components/Utility/Footer';
import Image from 'next/image';
import logoW from '../../../public/images/logo.svg';
import img from '../../../public/images/1.jpg';
import { useLoginUserMutation } from '@/pages/api/setSignIn/setSignin';

export default function SignIn() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { mutate, isLoading, isError } = useLoginUserMutation();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleClickShowPassword = () => setShowPassword((prev) => !prev);

    const handleSubmit = (e) => {
        e.preventDefault();
        mutate(
            { email, password },
            {
                onSuccess: () => {
                    setSnackbarMessage('You have been logged in successfully !');
                    setSnackbarSeverity('success');
                    setOpenSnackbar(true);
                },
                onError: (error) => {
                    setSnackbarMessage(`error : ${error.message}`);
                    setSnackbarSeverity('error');
                    setOpenSnackbar(true);
                },
            }
        );
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box>
            <Container component="main" maxWidth='xl' sx={{ display: 'flex', height: {xs:'90vh',md:'100vh'}, justifyContent: 'space-between', padding: '0 !important' }}>
                <Grid container sx={{ flexGrow: 1, padding: 0 }}>
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                            position: 'relative',
                            flexBasis: '60%',
                            display: { xs: 'none', md: 'block' },
                        }}
                    >
                        <Image
                            src={img}
                            alt="Background Image"
                            layout="fill"
                            objectFit="cover"
                            quality={100}
                            style={{
                                backgroundColor: (t) =>
                                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8} md={4} component={Box} sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'start' }, justifyContent: 'center', padding: { xs: '2rem', md: '5rem 2rem 5rem 6rem' }, margin: 'auto' }}>
                        <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 1 }}>
                            <Image src={logoW} alt="Contact Book Logo" width={100} height={100} />
                        </Box>
                        <Typography component="h1" variant="h5" sx={{ display: { xs: 'none', md: 'block' }, fontWeight: 'bold', fontSize: '30px', mb: 3 }}>
                            Sign In
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
                            <FormControl fullWidth variant="outlined" size="small" required margin="normal">
                                <OutlinedInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    autoComplete="off"
                                    autoFocus
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    sx={{ "& .MuiOutlinedInput-root": { border: 'solid 1px #E0E0E0', borderRadius: '5px' } }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                                sx={{ padding: 0, marginRight: '2px' }}
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
                                    <Link href="/auth/changePassword" passHref>
                                        <Typography
                                            variant="body2"
                                            sx={{ color: 'black', textDecoration: 'none', opacity: .7, '&:hover': { opacity: 1, }, fontSize: '13px' }}
                                        >
                                            Forgot password?
                                        </Typography>
                                    </Link>
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, height: '2.5em', py: '0px', borderRadius: '4px', textTransform: 'capitalize', fontSize: '14px', textDecoration: 'none' }}
                            >
                                Sign In
                            </Button>
                            <Grid container sx={{ textDecoration: 'none', display: 'flex', justifyContent: 'center' }}>
                                <Link href="#" passHref style={{ textDecoration: 'none' }}>
                                    <Typography
                                        variant="body2"
                                        sx={{ textDecoration: 'none', margin: '1rem auto', color: 'black', opacity: .7, '&:hover': { opacity: 1, }, fontSize: '13px' }}
                                    >
                                        {"Don't have an account? "}
                                    </Typography>
                                </Link>
                            </Grid>
                            <Link href="/auth/regester" passHref style={{ textDecoration: 'none' }}>
                                <Button variant="outlined" sx={{ textDecoration: 'none', height: '2.5em', display: 'block', margin: 'auto', textTransform: 'none', borderRadius: '4px', fontSize: '14px', border: '1px solid #4E73DF', '&:hover': { opacity: .7, } }}>
                                    Sign up
                                </Button>
                            </Link>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <Footer color='#fff' gap='0 10%' marginTop='0%'/>
            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}
