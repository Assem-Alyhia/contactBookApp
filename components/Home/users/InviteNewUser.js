import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, TextField, Button, Grid, Paper, MenuItem } from '@mui/material';
import Footer from '@/components/Utility/Footer';
import Link from 'next/link';
import { useAddUserMutation } from '@/pages/api/users/setUser';
import { useRouter } from 'next/router';

export default function InviteNewUser() {
    const [newUser, setNewUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        role: '',
    });

    const mutation = useAddUserMutation();
    const router = useRouter();

    useEffect(() => {
        if (mutation.isSuccess) {
            router.push('/users/usersTable');
        }
    }, [mutation.isSuccess, router]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate(newUser);
    };

    return (
        <Box sx={{ marginTop: '1rem' }}>
            <Container maxWidth="lg">
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Home / Users / Invite new user
                </Typography>
                <Box borderBottom={2} mb={2} sx={{ opacity: 0.2 }} />

                <Paper elevation={3}>
                    <Typography variant="h6" mb={3} sx={{ fontSize: '20px', fontWeight: '600', background: '#F7F7F7', padding: '.7rem', borderRadius: '5px', borderBottom: '1px solid #E0E0E0' }}>
                        User details
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3} sx={{ padding: '2rem' }}>
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
                                    value={newUser.firstName}
                                    onChange={handleChange}
                                    autoComplete="given-name"
                                    size="small"
                                    InputLabelProps={{ shrink: false }}
                                    sx={{ "& .MuiInputBase-root": { textAlign: 'left' }, border: 'solid 1px #E0E0E0', borderRadius: '5px' }}
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
                                    value={newUser.lastName}
                                    onChange={handleChange}
                                    autoComplete="family-name"
                                    size="small"
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
                                    value={newUser.email}
                                    onChange={handleChange}
                                    autoComplete="email"
                                    size="small"
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
                                    id="phoneNumber"
                                    placeholder="Phone Number"
                                    name="phoneNumber"
                                    value={newUser.phoneNumber}
                                    onChange={handleChange}
                                    autoComplete="tel"
                                    size="small"
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
                                    id="role"
                                    select
                                    placeholder="Select user type"
                                    name="role"
                                    value={newUser.role}
                                    onChange={handleChange}
                                    autoComplete="user-type"
                                    InputLabelProps={{ shrink: false }}
                                    size="small"
                                    sx={{ "& .MuiInputBase-root": { textAlign: 'left' }, border: 'solid 1px #E0E0E0', borderRadius: '5px' }}
                                >
                                    <MenuItem value="admin">Admini Strator</MenuItem>
                                    <MenuItem value="user">Regular User</MenuItem>
                                </TextField>
                            </Grid>
                            <Box display="flex" justifyContent="flex-start" mt={3} sx={{ paddingLeft: '24px' }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    sx={{ mr: 2, width: '180px', height: '2.5em', py: '0px', borderRadius: '4px', textTransform: 'capitalize', fontSize: '14px' }}
                                >
                                    Invite
                                </Button>
                                <Link href='/users/usersTable'>
                                    <Button variant="outlined"
                                        sx={{ mr: 2, width: '180px', height: '2.5em', py: '0px', borderRadius: '4px', textTransform: 'capitalize', fontSize: '14px' }}
                                    >
                                        Cancel
                                    </Button>
                                </Link>
                            </Box>
                        </Grid>
                    </form>
                </Paper>
            </Container>
            <Footer color='#000' gap='0 50% 0 10%' opacity='0.3' />
        </Box>
    );
}
