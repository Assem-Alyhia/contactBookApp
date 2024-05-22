import React from 'react';
import { Container, Box, Typography, TextField, Button, Avatar, Grid } from '@mui/material';

export default function CreateNewContact() {
    return (
        <Box sx={{ marginTop: '2rem' }}>
            <Container maxWidth="lg">
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Home / Contacts / Create new
                </Typography>
                <Box borderBottom={2} mb={2} sx={{ opacity: 0.2 }} />

                <Box sx={{ backgroundColor: '#fff', borderRadius: '5px', boxShadow: '0px 3px 15px #00000012' }}>
                    <Typography variant="h6" mb={3} sx={{ border: '1px solid #E0E0E0', fontSize: '24px', fontWeight: '500', background: '#F7F7F7 0% 0% no-repeat padding-box', padding: '.7rem', borderRadius: '5px' }}>
                        Contact details
                    </Typography>
                    <Grid container spacing={3} sx={{ padding: '0 2rem 2rem 2rem' }}>
                        <Grid item xs={12} md={4} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                            <Avatar
                                sx={{ width: 202, height: 202, marginBottom: '1rem' }}
                                src="/broken-image.jpg"
                            />
                            <Typography variant="caption" display="block" gutterBottom sx={{ opacity: .4 }}>
                                JPG or PNG no larger than 5 MB
                            </Typography>
                            <Button variant="contained" component="label" sx={{ width: '227px', height: '47px' }}>
                                Upload new image
                                <input hidden accept="image/*" type="file" />
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="caption" display="block" gutterBottom sx={{ fontSize: '20px', fontWeight: '500' }}>
                                        First name *
                                    </Typography>
                                    <TextField
                                        required
                                        fullWidth
                                        id="firstName"
                                        placeholder="First"
                                        name="firstName"
                                        autoComplete="given-name"
                                        InputLabelProps={{ shrink: false }}
                                        sx={{ "& .MuiInputBase-root": { height: '48px' }, border: 'solid 1px #E0E0E0', borderRadius: '5px' }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="caption" display="block" gutterBottom sx={{ fontSize: '20px', fontWeight: '500' }}>
                                        Last name *
                                    </Typography>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        placeholder="Last"
                                        name="lastName"
                                        autoComplete="family-name"
                                        InputLabelProps={{ shrink: false }}
                                        sx={{ "& .MuiInputBase-root": { height: '48px' }, border: 'solid 1px #E0E0E0', borderRadius: '5px' }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="caption" display="block" gutterBottom sx={{ fontSize: '20px', fontWeight: '500' }}>
                                        Email
                                    </Typography>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        placeholder="name@example.com"
                                        name="email"
                                        autoComplete="email"
                                        InputLabelProps={{ shrink: false }}
                                        sx={{ "& .MuiInputBase-root": { height: '48px' }, border: 'solid 1px #E0E0E0', borderRadius: '5px' }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="caption" display="block" gutterBottom sx={{ fontSize: '20px', fontWeight: '500' }}>
                                        Phone *
                                    </Typography>
                                    <TextField
                                        required
                                        fullWidth
                                        id="phone"
                                        placeholder="555-123-4567"
                                        name="phone"
                                        autoComplete="tel"
                                        InputLabelProps={{ shrink: false }}
                                        sx={{ "& .MuiInputBase-root": { height: '48px' }, border: 'solid 1px #E0E0E0', borderRadius: '5px' }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="caption" display="block" gutterBottom sx={{ fontSize: '20px', fontWeight: '500' }}>
                                        Email 2
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        id="email2"
                                        placeholder="name@example.com"
                                        name="email2"
                                        autoComplete="email"
                                        InputLabelProps={{ shrink: false }}
                                        sx={{ "& .MuiInputBase-root": { height: '48px' }, border: 'solid 1px #E0E0E0', borderRadius: '5px' }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="caption" display="block" gutterBottom sx={{ fontSize: '20px', fontWeight: '500' }}>
                                        Mobile
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        id="mobile"
                                        placeholder="555-123-4567"
                                        name="mobile"
                                        autoComplete="tel"
                                        InputLabelProps={{ shrink: false }}
                                        sx={{ "& .MuiInputBase-root": { height: '48px' }, border: 'solid 1px #E0E0E0', borderRadius: '5px' }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="caption" display="block" gutterBottom sx={{ fontSize: '20px', fontWeight: '500' }}>
                                        Address
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        id="address"
                                        placeholder="Address"
                                        name="address"
                                        autoComplete="street-address"
                                        InputLabelProps={{ shrink: false }}
                                        InputProps={{
                                            sx: {
                                                textAlign: 'left',
                                                alignItems: 'flex-start',
                                                paddingTop: '0px' // Adjust the padding as needed
                                            }
                                        }}
                                        sx={{ "& .MuiInputBase-root": { height: '108px', display: 'flex', alignItems: 'flex-start' }, border: 'solid 1px #E0E0E0', borderRadius: '5px' }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="caption" display="block" gutterBottom sx={{ fontSize: '20px', fontWeight: '500' }}>
                                        Address 2
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        id="address2"
                                        placeholder="Address 2"
                                        name="address2"
                                        autoComplete="street-address"
                                        InputLabelProps={{ shrink: false }}
                                        InputProps={{
                                            sx: {
                                                textAlign: 'left',
                                                alignItems: 'flex-start',
                                                paddingTop: '0px' // Adjust the padding as needed
                                            }
                                        }}
                                        sx={{ "& .MuiInputBase-root": { height: '108px', display: 'flex', alignItems: 'flex-start' }, border: 'solid 1px #E0E0E0', borderRadius: '5px' }}
                                    />
                                </Grid>
                                <Box display="flex" justifyContent="flex-start" mt={3} sx={{ paddingLeft: '16px' }}>
                                    <Button variant="contained" color="primary" sx={{ mr: 2, width: '180px', height: '47px' , textTransform: 'capitalize' }}>
                                        Create
                                    </Button>
                                    <Button variant="outlined" sx={{ mr: 2, width: '180px', height: '47px' , textTransform: 'capitalize'}}>
                                        Back
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
}
