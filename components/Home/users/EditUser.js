import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, TextField, Button, Grid, MenuItem, Switch, FormControlLabel } from '@mui/material';
import Footer from '@/components/Utility/Footer';
import Link from 'next/link';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/router';
import { useUserQuery } from '@/pages/api/users/getUser';
import { useUpdateUserMutation } from '@/pages/api/users/setUpdateUser';

export default function EditUser() {
    const [isActive, setIsActive] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        userType: '',
        isActive: false,
    });

    const router = useRouter();
    const { id } = router.query;
    const { isLoading, data } = useUserQuery(id);
    const { mutate: updateUser, isLoading: isUpdating } = useUpdateUserMutation();

    useEffect(() => {
        if (data) {
            setFormData({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phoneNumber: data.phoneNumber,
                userType: data.userType,
                isActive: data.isActive,
            });
            setIsActive(data.isActive);
        }
    }, [data]);

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
        if (name === 'isActive') {
            setIsActive(checked);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser({ id, ...formData }, {
            onSuccess: () => {
                router.push('/users/usersTable');
            },
            onError: (error) => {
                console.error('Error updating user: ', error);
            }
        });
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Box sx={{ marginTop: '1rem' }}>
            <Container maxWidth="lg">
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Home / Users / {formData.firstName} {formData.lastName}
                </Typography>
                <Box borderBottom={2} mb={2} sx={{ opacity: 0.2 }} />
                <Box sx={{ backgroundColor: '#fff', borderRadius: '5px', boxShadow: '0px 3px 15px #00000012' }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ fontSize: '20px', fontWeight: '600', background: '#F7F7F7', padding: '.7rem', borderRadius: '5px', borderBottom: '1px solid #E0E0E0' }}>
                        <Typography variant="h6" sx={{ fontSize: '20px', fontWeight: '600' }}>
                            User details
                        </Typography>
                        <FormControlLabel
                            control={<Switch checked={isActive} onChange={handleChange} name="isActive" />}
                            label="Unlocked"
                            labelPlacement="start"
                            sx={{ marginLeft: 'auto' }}
                        />
                    </Box>
                    <Box component="form" onSubmit={handleSubmit}>
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
                                    value={formData.firstName}
                                    onChange={handleChange}
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
                                    value={formData.lastName}
                                    onChange={handleChange}
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
                                    value={formData.email}
                                    onChange={handleChange}
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
                                    name="phoneNumber"
                                    autoComplete="tel"
                                    size={'small'}
                                    InputLabelProps={{ shrink: false }}
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
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
                                    value={formData.userType}
                                    onChange={handleChange}
                                    size={'small'}
                                    sx={{ "& .MuiInputBase-root": { textAlign: 'left' }, border: 'solid 1px #E0E0E0', borderRadius: '5px' }}
                                >
                                    <MenuItem value="admin">Administrator</MenuItem>
                                    <MenuItem value="user">Regular User</MenuItem>
                                </TextField>
                            </Grid>
                            <Box display="flex" justifyContent="flex-start" mt={3} sx={{ paddingLeft: '24px' }}>
                                <Button
                                    type="submit"
                                    variant="outlined"
                                    color="primary"
                                    startIcon={<EditIcon />}
                                    sx={{ mr: 2, width: '180px', height: '2.5em', py: '0px', textTransform: 'capitalize', fontSize: '14px', borderRadius: '4px' }}
                                    disabled={isUpdating}
                                >
                                    {isUpdating ? 'Updating...' : 'Edit'}
                                </Button>
                                <Link href='/users/usersTable' passHref>
                                    <Button variant="outlined"
                                        sx={{ mr: 2, width: '180px', height: '2.5em', py: '0px', textTransform: 'capitalize', fontSize: '14px' }}
                                    >
                                        Back
                                    </Button>
                                </Link>
                            </Box>
                        </Grid>
                    </Box>
                </Box>
            </Container>
            <Footer color='#000' gap='0 50% 0 10%' opacity='0.3' />
        </Box>
    );
}
