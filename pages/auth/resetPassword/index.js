import * as React from 'react';
import { useState } from 'react';
import { Container, Box, Typography, Button, Grid, OutlinedInput, InputLabel, FormControl, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter } from 'next/router';
import Footer from '@/components/Utility/Footer';
import Image from 'next/image';
import logoW from '../../../public/images/logo.svg';
import img from '../../../public/images/1.jpg';
import { useResetPasswordMutation } from '@/pages/api/resetPassword/resetPassword';

export default function SetPassword() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
    const router = useRouter();

    const { mutate, isLoading, isError, isSuccess } = useResetPasswordMutation();

    const handleClickShowPassword = () => setShowPassword((prev) => !prev);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        mutate(formData.password, {
            onSuccess: () => {
                router.push('/auth/signIn');
            },
            onError: (error) => {
                console.error('Error setting new password: ', error);
            }
        });
    };

    return (
        <Box>
            <Container component="main" maxWidth='xl' sx={{ display: 'flex', height: {xs:'90vh',md:'100vh'}, justifyContent: 'space-between', padding: '0 !important' }}>
                <Grid container sx={{ flexGrow: 1, padding: 0 }}>
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={8}
                        sx={{
                            position: 'relative',
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
                    <Grid item xs={12} sm={8} md={4} component={Box} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: { xs: 'center', md: 'start' } , padding: { xs: '2rem', md: '0  7rem' } }}>
                        <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 3 }}>
                            <Image src={logoW} alt="Contact Book Logo" width={100} height={100} />
                        </Box>
                        <Typography component="h1" variant="h5" sx={{ display: { xs: 'none', md: 'block' }, fontWeight: 'bold', fontSize: '30px' }}>
                            Set a Password
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 1, width: '100%' }} onSubmit={handleSubmit}>
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
                                                sx={{ padding: 0, marginRight: '2px' }}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl fullWidth variant="outlined" size="small" required margin="normal">
                                <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
                                <OutlinedInput
                                    id="confirm-password"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    autoComplete="current-password"
                                    sx={{ "& .MuiOutlinedInput-root": { border: 'solid 1px #E0E0E0', borderRadius: '5px' } }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowConfirmPassword}
                                                edge="end"
                                                sx={{ padding: 0, marginRight: '2px' }}
                                            >
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Confirm Password"
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, height: '2.5em', py: '0px', borderRadius: '4px', textTransform: 'capitalize', fontSize: '14px' }}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Setting Password...' : 'Set Password'}
                            </Button>
                            {isError && <div>Error setting new password. Please try again.</div>}
                            {isSuccess && <div>Password set successfully!</div>}
                        </Box>
                    </Grid>
                </Grid>
            </Container>
                <Footer color='#fff' gap='0 15% 0 10%' marginTop='0%'/>
        </Box>
    );
}
