import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button, Grid, MenuItem, Switch, FormControlLabel } from '@mui/material';
import axiosInstance from '../../../pages/api/axiosInstance';
import Footer from '@/components/Utility/Footer';
export default function EditUser() {
    const { id } = useParams(); // استخدام useParams للحصول على الـ ID الديناميكي من الـ URL
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get(`/api/Contacts/${id}`); // استخدام الـ ID الديناميكي هنا
                if (response.data) {
                    setUser(response.data);
                    setIsActive(response.data.active);
                    setIsLoading(false);
                } else {
                    console.error('No data found');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchUser();
    }, [id]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Box sx={{ marginTop: '1rem' }}>
            <Container maxWidth="lg">
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Home / Users / {user.firstName} {user.lastName}
                </Typography>
                <Box borderBottom={2} mb={2} sx={{ opacity: 0.2 }} />

                <Box sx={{ backgroundColor: '#fff', borderRadius: '5px', boxShadow: '0px 3px 15px #00000012' }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ fontSize: '20px', fontWeight: '600', background: '#F7F7F7', padding: '.7rem', borderRadius: '5px', borderBottom: '1px solid #E0E0E0' }}>
                        <Typography variant="h6" sx={{ fontSize: '20px', fontWeight: '600' }}>
                            User details
                        </Typography>
                        <FormControlLabel
                            control={<Switch checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />}
                            label="Unlocked"
                            labelPlacement="start"
                            sx={{ marginLeft: 'auto' }}
                        />
                    </Box>
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
                                autoComplete="given-name"
                                size={'small'}
                                InputLabelProps={{ shrink: false }}
                                defaultValue={user.firstName}
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
                                autoComplete="family-name"
                                size={'small'}
                                InputLabelProps={{ shrink: false }}
                                defaultValue={user.lastName}
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
                                defaultValue={user.email}
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
                                defaultValue={user.phone}
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
                                defaultValue={user.userType}
                                size={'small'}
                                sx={{ "& .MuiInputBase-root": { textAlign: 'left' }, border: 'solid 1px #E0E0E0', borderRadius: '5px' }}
                            >
                                <MenuItem value="admin">Administrator</MenuItem>
                                <MenuItem value="user">Regular User</MenuItem>
                            </TextField>
                        </Grid>
                        <Box display="flex" justifyContent="flex-start" mt={3} sx={{ paddingLeft: '24px' }}>
                            <Button variant="contained" color="primary"
                                sx={{ mr: 2, width: '180px', height: '2.5em', py: '0px', borderRadius: '4px', textTransform: 'capitalize', fontSize: '14px', borderRadius: '4px' }}
                            >
                                Save
                            </Button>
                            <Button variant="outlined"
                                sx={{ mr: 2, width: '180px', height: '2.5em', py: '0px', borderRadius: '4px', textTransform: 'capitalize', fontSize: '14px', borderRadius: '4px' }}
                            >
                                Cancel
                            </Button>
                        </Box>
                    </Grid>
                </Box>
            </Container>
            <Footer  color = '#000' gap = '0 50% 0 10%' opacity='0.3' />
        </Box>
    );
}
