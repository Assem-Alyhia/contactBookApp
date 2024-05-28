import React from 'react';
import { Container, Box, Typography, TextField, Button, Grid, MenuItem } from '@mui/material';
import Footer from '@/components/Utility/Footer';
import Link from 'next/link'

export default function InviteNewUser() {
    return (
        <Box sx={{ marginTop: '1rem' }}>
            <Container maxWidth="lg">
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Home / Users / Invite new user
                </Typography>
                <Box borderBottom={2} mb={2} sx={{ opacity: 0.2 }} />

                <Box sx={{ backgroundColor: '#fff', borderRadius: '5px', boxShadow: '0px 3px 15px #00000012'  }}>
                    <Typography variant="h6" mb={3} sx={{ fontSize: '20px', fontWeight: '600', background: '#F7F7F7', padding: '.7rem', borderRadius: '5px', borderBottom: '1px solid #E0E0E0' }}>
                        User details
                    </Typography>
                    <Grid container spacing={3} sx={{padding: '2rem'}}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="caption" display="block" gutterBottom sx={{ fontSize: '16px', fontWeight: '600' }}>
                                First name *
                            </Typography>
                            <TextField
                                required
                                fullWidth
                                id="firstName"
                                placeholder="First Name"
                                name="firstName"
                                autoComplete="given-name"
                                size={'small'}
                                InputLabelProps={{ shrink: false }}
                                sx={{ "& .MuiInputBase-root": {  textAlign: 'left' }, border: 'solid 1px #E0E0E0', borderRadius: '5px' }}
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
                                placeholder="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                                size={'small'}
                                InputLabelProps={{ shrink: false }}
                                sx={{ "& .MuiInputBase-root": { textAlign: 'left' }, border: 'solid 1px #E0E0E0', borderRadius: '5px' }}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography variant="caption" display="block" gutterBottom sx={{ fontSize: '16px', fontWeight: '600' }}>
                                Email *
                            </Typography>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                placeholder="mail@email.com"
                                name="email"
                                autoComplete="email"
                                size={'small'}
                                InputLabelProps={{ shrink: false }}
                                sx={{ "& .MuiInputBase-root": { textAlign: 'left' }, border: 'solid 1px #E0E0E0', borderRadius: '5px' }}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography variant="caption" display="block" gutterBottom sx={{ fontSize: '16px', fontWeight: '600' }}>
                                Phone *
                            </Typography>
                            <TextField
                                required
                                fullWidth
                                id="phone"
                                placeholder="Phone Number"
                                name="phone"
                                autoComplete="tel"
                                size={'small'}
                                InputLabelProps={{ shrink: false }}
                                sx={{ "& .MuiInputBase-root": { textAlign: 'left' }, border: 'solid 1px #E0E0E0', borderRadius: '5px' }}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography variant="caption" display="block" gutterBottom sx={{ fontSize: '16px', fontWeight: '600' }}>
                                User Type *
                            </Typography>
                            <TextField
                                required
                                fullWidth
                                id="userType"
                                select
                                placeholder="Select user type"
                                name="userType"
                                autoComplete="user-type"
                                InputLabelProps={{ shrink: false }}
                                size={'small'}
                                sx={{ "& .MuiInputBase-root": {  textAlign: 'left' }, border: 'solid 1px #E0E0E0', borderRadius: '5px' }}
                            >
                                <MenuItem value="admin">Administrator</MenuItem>
                                <MenuItem value="user">Regular User</MenuItem>
                            </TextField>
                        </Grid>
                        <Box display="flex" justifyContent="flex-start" mt={3} sx={{ paddingLeft: '24px'  }}>
                            <Link href='/auth/setPassword'>
                                <Button variant="contained" color="primary"
                                sx={{ mr: 2,width: '180px', height: '2.5em', py: '0px', borderRadius: '4px', textTransform: 'capitalize', fontSize: '14px', borderRadius: '4px' }}
                                >
                                    Invite
                                </Button>
                            </Link>
                            <Link href='/users/usersTable'>
                                <Button variant="outlined" 
                                sx={{ mr: 2,width: '180px', height: '2.5em', py: '0px', borderRadius: '4px', textTransform: 'capitalize', fontSize: '14px', borderRadius: '4px' }}
                                >
                                    Cancel
                                </Button>
                            </Link>
                        </Box>
                    </Grid>
                </Box>
            </Container>
            <Footer  color = '#000' gap = '0 50% 0 10%' opacity='0.3' />
        </Box>
    );
}
