import React from 'react';
import { Container, Box, Typography, TextField, Button, Avatar, Grid } from '@mui/material';
import Footer from '@/components/Utility/Footer';
import Link from 'next/link'
export default function CreateNewContact() {
    return (
        <Box sx={{ marginTop: '1rem' }}>
            <Container maxWidth="lg">
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Home / Contacts / Create new
                </Typography>
                <Box borderBottom={2} mb={2} sx={{ opacity: 0.2 }} />

                <Box sx={{ backgroundColor: '#fff', borderRadius: '5px', boxShadow: '0px 3px 15px #00000012' }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ border: '1px solid #E0E0E0', fontSize: '20px', fontWeight: '600', background: '#F7F7F7 0% 0% no-repeat padding-box', padding: '.7rem', borderRadius: '5px' }}>
                        <Typography variant="h6" sx={{fontSize:'20px' ,  fontWeight: '600'}}> 
                            Contact details
                        </Typography>
                    </Box>
                    <Grid container spacing={3} sx={{ padding: '2rem 2rem 2rem 2rem' }}>
                        <Grid item xs={12} md={4} display="flex" justifyContent="start" alignItems="center" flexDirection="column">
                            <Avatar
                                sx={{ width: 202, height: 202, marginBottom: '1rem' }}
                                src="/broken-image.jpg"
                            />
                            <Typography variant="caption" display="block" gutterBottom sx={{ opacity: .4 }}>
                                JPG or PNG no larger than 5 MB
                            </Typography>
                            <Button variant="contained" component="label" sx={{ width: '200px', height: '40px' }}>
                                Upload new image
                                <input hidden accept="image/*" type="file" />
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="caption" display="block" gutterBottom sx={{ fontSize: '16px', fontWeight: '600' }}>
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
                                        size={'small'}
                                        sx={{border: 'solid 1px #E0E0E0', borderRadius: '5px' }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="caption" display="block" gutterBottom sx={{ fontSize: '16px', fontWeight: '600' }}>
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
                                        size={'small'}
                                        sx={{ border: 'solid 1px #E0E0E0', borderRadius: '5px' }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="caption" display="block" gutterBottom sx={{ fontSize: '16px', fontWeight: '600' }}>
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
                                        size={'small'}
                                        sx={{ border: 'solid 1px #E0E0E0', borderRadius: '5px' }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="caption" display="block" gutterBottom sx={{ fontSize: '16px', fontWeight: '600' }}>
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
                                        size={'small'}
                                        sx={{ border: 'solid 1px #E0E0E0', borderRadius: '5px' }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="caption" display="block" gutterBottom sx={{ fontSize: '16px', fontWeight: '600' }}>
                                        Email 2
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        id="email2"
                                        placeholder="name@example.com"
                                        name="email2"
                                        autoComplete="email"
                                        InputLabelProps={{ shrink: false }}
                                        size={'small'}
                                        sx={{ border: 'solid 1px #E0E0E0', borderRadius: '5px' }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="caption" display="block" gutterBottom sx={{ fontSize: '16px', fontWeight: '600' }}>
                                        Mobile
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        id="mobile"
                                        placeholder="555-123-4567"
                                        name="mobile"
                                        autoComplete="tel"
                                        InputLabelProps={{ shrink: false }}
                                        size={'small'}
                                        sx={{ border: 'solid 1px #E0E0E0', borderRadius: '5px' }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="caption" display="block" gutterBottom sx={{ fontSize: '16px', fontWeight: '600' }}>
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
                                        sx={{ "& .MuiInputBase-root": { height: '60px', display: 'flex', alignItems: 'flex-start' }, border: 'solid 1px #E0E0E0', borderRadius: '5px' }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="caption" display="block" gutterBottom sx={{ fontSize: '16px', fontWeight: '600' }}>
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
                                        sx={{ "& .MuiInputBase-root": { height: '60px', display: 'flex', alignItems: 'flex-start' }, border: 'solid 1px #E0E0E0', borderRadius: '5px' }}
                                    />
                                </Grid>
                                <Box display="flex" justifyContent="flex-start" mt={3} sx={{ paddingLeft: '16px' }}>
                                    <Link  href='/contacts/contactsTable'>
                                        <Button variant="contained" color="primary" 
                                        sx={{ mr: 2,width: '180px', height: '2.5em', py: '0px', borderRadius: '4px', textTransform: 'capitalize', fontSize: '14px', borderRadius: '4px' }}
                                        >
                                            Create
                                        </Button>
                                    </Link>
                                    <Link  href='/contacts/contactsTable'>
                                        <Button variant="outlined" 
                                        sx={{ mr: 2,width: '180px', height: '2.5em', py: '0px', borderRadius: '4px', textTransform: 'capitalize', fontSize: '14px', borderRadius: '4px' }}
                                        >
                                            Back
                                        </Button>
                                    </Link>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Footer  color = '#000' gap = '0 50% 0 10%' opacity='0.3' mdPosition='auto'/>
        </Box>
    );
}
