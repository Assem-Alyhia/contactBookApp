import React, { useState } from 'react';
import {
    Container,
    Box,
    Grid,
    TextField,
    Typography,
    FormControlLabel,
    Checkbox,
    Button,
    MenuItem,
    IconButton,
    InputAdornment,
    FormControl,
    InputLabel,
    Snackbar,
    Alert,
    OutlinedInput,
} from '@mui/material';
import Link from 'next/link';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Footer from '@/components/Utility/Footer';
import Image from 'next/image';
import logoW from '../../../public/images/logo.svg';
import img from '../../../public/images/1.jpg';
import { useRegisterUserMutation } from '@/pages/api/setRegester/setRegester';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        companyName: '',
        vatNumber: '',
        streetOne: '',
        streetTwo: '1111111111',
        city: '',
        state: '',
        zip: '',
        country: '',
    });

    const [formErrors, setFormErrors] = useState({});
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const { mutate, isLoading, isError, isSuccess } = useRegisterUserMutation();

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        mutate(formData, {
            onError: (error) => {
                if (error.errors) {
                    setFormErrors(error.errors);
                    setSnackbarMessage(`Error: ${Object.values(error.errors).flat().join(', ')}`);
                    setSnackbarSeverity('error');
                    setSnackbarOpen(true);
                }
            },
            onSuccess: () => {
                setSnackbarMessage('Registration successful!');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
                router.push('/dashboard'); // الانتقال إلى صفحة الداشبورد بعد التسجيل الناجح
            }
        });
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box>
            <Container component="main" maxWidth="xl" sx={{ display: 'flex', height:{xs: 'auto' , md:'100vh'}, justifyContent: 'space-between', padding: '0 !important' }}>
                <Grid container sx={{ flexGrow: 1, padding: 0 }}>
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={4}
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
                    <Grid className='formReg' item xs={12} sm={8} md={8} component={Box} sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'start' }, justifyContent: 'center', padding: { xs: '2rem', md: '2.5rem 8rem' } }}>
                        <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 3 }}>
                            <Image src={logoW} alt="Contact Book Logo" width={100} height={100} />
                        </Box>
                        <Typography component="h1" variant="h5" sx={{ display: { xs: 'none', md: 'block' }, fontWeight: 'bold', fontSize: '30px' }}>
                            Create Account
                        </Typography>

                        <Box component="form" noValidate sx={{ mt: 1, width: '100%' }} className='boxReg' onSubmit={handleSubmit}>
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={12}>
                                    <Typography component="h2" variant="h5" className='titleInput' sx={{ opacity: '.4', fontSize: '20px' }}>
                                        Account details
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6} sm={12}>
                                    <TextField
                                        autoComplete="fname"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        size={'small'}
                                        sx={{ "& input": { border: 'solid 1px #E0E0E0', borderRadius: '5px' } }}
                                        onChange={handleChange}
                                        error={!!formErrors.firstName}
                                        helperText={formErrors.firstName ? formErrors.firstName[0] : ''}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} sm={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="lname"
                                        size={'small'}
                                        sx={{ "& input": { border: 'solid 1px #E0E0E0', borderRadius: '5px' } }}
                                        onChange={handleChange}
                                        error={!!formErrors.lastName}
                                        helperText={formErrors.lastName ? formErrors.lastName[0] : ''}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} sm={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        name="email"
                                        autoComplete="email"
                                        size={'small'}
                                        sx={{ "& input": { border: 'solid 1px #E0E0E0', borderRadius: '5px' } }}
                                        onChange={handleChange}
                                        error={!!formErrors.email}
                                        helperText={formErrors.email ? formErrors.email[0] : ''}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} sm={12}>
                                    <FormControl fullWidth variant="outlined" size="small" required>
                                        <InputLabel htmlFor="password">Password</InputLabel>
                                        <OutlinedInput
                                            id="password"
                                            name="password"
                                            type={showPassword ? 'text' : 'password'}
                                            autoComplete="new-password"
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
                                            sx={{ border: 'solid 1px #E0E0E0', borderRadius: '5px' }}
                                            onChange={handleChange}
                                            error={!!formErrors.password}
                                            helperText={formErrors.password ? formErrors.password[0] : ''}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} md={12} sm={12}>
                                    <Typography component="h2" variant="h5" className='titleInput' sx={{ opacity: '.4', fontSize: '20px' }}>
                                        Billing details
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6} sm={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="companyName"
                                        label="Company Name"
                                        name="companyName"
                                        autoComplete="company-name"
                                        size={'small'}
                                        sx={{ "& input": { border: 'solid 1px #E0E0E0', borderRadius: '5px' } }}
                                        onChange={handleChange}
                                        error={!!formErrors.companyName}
                                        helperText={formErrors.companyName ? formErrors.companyName[0] : ''}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} sm={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="vatNumber"
                                        label="VAT Number"
                                        name="vatNumber"
                                        autoComplete="vat-number"
                                        size={'small'}
                                        sx={{ "& input": { border: 'solid 1px #E0E0E0', borderRadius: '5px' } }}
                                        onChange={handleChange}
                                        error={!!formErrors.vatNumber}
                                        helperText={formErrors.vatNumber ? formErrors.vatNumber[0] : ''}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} sm={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="streetOne"
                                        label="Street"
                                        name="streetOne"
                                        autoComplete="street-address"
                                        size={'small'}
                                        sx={{ "& input": { border: 'solid 1px #E0E0E0', borderRadius: '5px' } }}
                                        onChange={handleChange}
                                        error={!!formErrors.streetOne}
                                        helperText={formErrors.streetOne ? formErrors.streetOne[0] : ''}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} sm={12}>
                                    <TextField
                                        fullWidth
                                        id="phoneNumber"
                                        label="phoneNumber"
                                        name="phoneNumber"
                                        autoComplete="phoneNumber"
                                        size={'small'}
                                        sx={{ "& input": { border: 'solid 1px #E0E0E0', borderRadius: '5px' } }}
                                        onChange={handleChange}
                                        error={!!formErrors.phoneNumber}
                                        helperText={formErrors.phoneNumber ? formErrors.phoneNumber[0] : ''}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} sm={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="city"
                                        label="City"
                                        name="city"
                                        autoComplete="address-level2"
                                        size={'small'}
                                        sx={{ "& input": { border: 'solid 1px #E0E0E0', borderRadius: '5px' } }}
                                        onChange={handleChange}
                                        error={!!formErrors.city}
                                        helperText={formErrors.city ? formErrors.city[0] : ''}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} sm={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="state"
                                        label="State"
                                        name="state"
                                        autoComplete="address-level1"
                                        size={'small'}
                                        sx={{ "& input": { border: 'solid 1px #E0E0E0', borderRadius: '5px' } }}
                                        onChange={handleChange}
                                        error={!!formErrors.state}
                                        helperText={formErrors.state ? formErrors.state[0] : ''}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} sm={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="zip"
                                        label="Zip"
                                        name="zip"
                                        autoComplete="postal-code"
                                        size={'small'}
                                        sx={{ "& input": { border: 'solid 1px #E0E0E0', borderRadius: '5px' } }}
                                        onChange={handleChange}
                                        error={!!formErrors.zip}
                                        helperText={formErrors.zip ? formErrors.zip[0] : ''}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} sm={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="country"
                                        select
                                        label="Select your country"
                                        defaultValue=""
                                        name="country"
                                        size={'small'}
                                        autoComplete="country"
                                        SelectProps={{
                                            sx: {
                                                display: 'flex',
                                                alignItems: 'center',
                                                border: 'solid 1px #E0E0E0',
                                                borderRadius: '5px',
                                                '& .MuiSelect-select': {
                                                    padding: '8px',
                                                },
                                            }
                                        }}
                                        onChange={handleChange}
                                        error={!!formErrors.country}
                                        helperText={formErrors.country ? formErrors.country[0] : ''}
                                    >
                                        <MenuItem value="Sy">Syria</MenuItem>
                                        <MenuItem value="TR">Turkey</MenuItem>
                                        <MenuItem value="LE">Lebanon</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox value="terms" color="primary" />}
                                        label="I agree to the website terms and conditions"
                                        sx={{ '& .MuiFormControlLabel-label': { fontSize: '14px' } }}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 1, mb: 1, height: '2.5em', py: '0px', textTransform: 'capitalize', fontSize: '14px', borderRadius: '4px' }}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Registering...' : 'Register'}
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item sx={{ margin: 'auto' }}>
                                    <Link href="/auth/signIn" variant="body2">
                                        {"Sign in instead"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <Snackbar open={snackbarOpen} autoHideDuration={2000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            <Footer color='#fff' gap='0 10%' />
        </Box>
    );
}
