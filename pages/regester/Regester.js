import * as React from 'react';
import {
    Container,
    Box,
    Grid,
    TextField,
    Typography,
    FormControlLabel,
    Checkbox,
    Button,
    Link,
    MenuItem,
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

    export default function Regester() {
    return (
        <Container component="main" maxWidth="xl" sx={{ display: 'flex', height: '100vh' , justifyContent:'space-between'}} >
        <Grid container sx={{ flexGrow: 1 ,padding : 0}}>
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
            }}
            />
            <Grid className='formReg' item xs={12} sm={8} md={5} component={Box} sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start', justifyContent: 'center', padding:'1rem'}}>
            <Typography component="h1" variant="h5"  sx={{fontWeight: 'bold' , fontSize: '42px' }}>
                Create Account
            </Typography>
            
            <Box component="form" noValidate sx={{ mt: 1}} className='boxReg'>
                <Grid container spacing={2}>
                <Typography component="h2" variant="h5"  xs={12} sm={12} className='titleInput'>
                    Account details
                </Typography>
                <Grid item xs={12} sm={6}>
                    <TextField
                    autoComplete="fname"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    sx = {{"& input" : {height:'48px' , py:'0px', border: 'solid 1px #E0E0E0' , borderRadius:'5px'}}}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                    sx = {{"& input" : {height:'48px' , py:'0px', border: 'solid 1px #E0E0E0' , borderRadius:'5px'}}}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    sx = {{"& input" : {height:'48px' , py:'0px', border: 'solid 1px #E0E0E0' , borderRadius:'5px'}}}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    sx = {{"& input" : {height:'48px' , py:'0px', border: 'solid 1px #E0E0E0' , borderRadius:'5px'}}}
                    />
                </Grid>

                <Typography component="h2" variant="h5"  xs={12} sm={12} className='titleInput'>
                    Billing details
                </Typography>
                <Grid item xs={12} sm={6}>
                    <TextField
                    required
                    fullWidth
                    id="companyName"
                    label="Company Name"
                    name="companyName"
                    autoComplete="company-name"
                    sx = {{"& input" : {height:'48px' , py:'0px', border: 'solid 1px #E0E0E0' , borderRadius:'5px'}}}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    required
                    fullWidth
                    id="vatNumber"
                    label="VAT Number"
                    name="vatNumber"
                    autoComplete="vat-number"
                    sx = {{"& input" : {height:'48px' , py:'0px', border: 'solid 1px #E0E0E0' , borderRadius:'5px'}}}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    required
                    fullWidth
                    id="street"
                    label="Street"
                    name="street"
                    autoComplete="street-address"
                    sx = {{"& input" : {height:'48px' , py:'0px', border: 'solid 1px #E0E0E0' , borderRadius:'5px'}}}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    fullWidth
                    id="street2"
                    label="Street 2 (Optional)"
                    name="street2"
                    autoComplete="street-address-optional"
                    sx = {{"& input" : {height:'48px' , py:'0px', border: 'solid 1px #E0E0E0' , borderRadius:'5px'}}}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    required
                    fullWidth
                    id="city"
                    label="City"
                    name="city"
                    autoComplete="address-level2"
                    sx = {{"& input" : {height:'48px' , py:'0px', border: 'solid 1px #E0E0E0' , borderRadius:'5px'}}}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    required
                    fullWidth
                    id="state"
                    label="State"
                    name="state"
                    autoComplete="address-level1"
                    sx = {{"& input" : {height:'48px' , py:'0px', border: 'solid 1px #E0E0E0' , borderRadius:'5px'}}}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    required
                    fullWidth
                    id="zip"
                    label="Zip"
                    name="zip"
                    autoComplete="postal-code"
                    sx = {{"& input" : {height:'48px' , py:'0px', border: 'solid 1px #E0E0E0' , borderRadius:'5px'}}}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    {/* <TextField
                    required
                    fullWidth
                    id="country"
                    select
                    label="Select your country"
                    defaultValue=""
                    name="country"
                    autoComplete="country"
                    sx = {{"& input" : {height:'48px' , py:'0px', border: 'solid 1px #E0E0E0' , borderRadius:'5px'}}}
                    >
                    <MenuItem value="Sy" >Syria</MenuItem>
                    <MenuItem value="TR">Torkia</MenuItem>
                    <MenuItem value="LE">Lebanon</MenuItem>
                    </TextField> */}

                    <TextField
                        required
                        fullWidth
                        id="country"
                        select
                        label="Select your country"
                        defaultValue=""
                        name="country"
                        autoComplete="country"
                        SelectProps={{
                            sx: {
                                height: '48px',
                                display: 'flex',
                                alignItems: 'center', 
                                border: 'solid 1px #E0E0E0',
                                borderRadius: '5px',
                                '& .MuiSelect-select': {
                                    padding: '8px', 
                                },
                            }
                        }}
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
                    />
                </Grid>
                </Grid>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                // className='button'
                sx = {{ mt: 3, mb: 2  , height:'47px' , py:'0px' , borderRadius:'4px' , textTransform: 'capitalize' , fontSize: '20px' ,borderRadius: '4px'}}
                >
                Register
                </Button>
                <Grid container justifyContent="flex-end">
                <Grid item sx={{margin:'auto' }}>
                    <Link href="#" variant="body2" sx={{}}>
                    {"Sign in instead"}
                    </Link>
                </Grid>
                </Grid>
            </Box>
            </Grid>
        </Grid>
        </Container>
    );
}
