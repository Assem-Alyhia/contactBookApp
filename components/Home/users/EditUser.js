import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, TextField, Button, Grid, MenuItem, Switch, FormControlLabel, Snackbar, Alert } from '@mui/material';
import Footer from '@/components/Utility/Footer';
import Link from 'next/link';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { useRouter } from 'next/router';
import { useUserQuery } from '@/pages/api/users/getUser';
import { useProfileQuery } from '@/pages/api/users/getProfile';
import { useUpdateUserMutation } from '@/pages/api/users/setUpdateUser';

export default function EditUser() {
    const [isEditing, setIsEditing] = useState(false); 
    const [isActive, setIsActive] = useState(true); 
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        role: '',
        status: "Active", 
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const router = useRouter();
    const { id } = router.query;
    const { isLoading: isUserLoading, data: userData } = useUserQuery(id);
    const { isLoading: isProfileLoading, data: profileData } = useProfileQuery();
    const { mutate: updateUser, isLoading: isUpdating } = useUpdateUserMutation();

    useEffect(() => {
        if (userData) {
            setFormData({
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                phoneNumber: userData.phoneNumber,
                role: userData.role,
                status: userData.status,
            });
            setIsActive(userData.status === "Active");
        }
    }, [userData]);

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? (checked ? "Active" : "Locked") : value,
        }));
        if (name === 'status') {
            setIsActive(value === "Active");
        }
    };

    const handleEditClick = (e) => {
        e.preventDefault();
        setIsEditing(true);
    };

    const handleSaveClick = (e) => {
        e.preventDefault();
        updateUser({ id, ...formData, status: isActive ? "Active" : "Locked" }, {
            onSuccess: () => {
                setIsEditing(false);
                setSnackbarMessage('User updated successfully!');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
            },
            onError: (error) => {
                console.error('Error updating user: ', error);
                setSnackbarMessage('Error updating user. Please try again.');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            }
        });
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    if (isUserLoading || isProfileLoading) {
        return <div>Loading...</div>;
    }

    const canEditUser = () => {
        if (profileData.role === 'Owner') {
            return true;
        } else if (profileData.role === 'Admin' && formData.role === 'User') {
            return true;
        } else if (profileData.id === userData.id) {
            return true;
        }
        return false;
    };

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
                            control={<Switch checked={isActive} onChange={(e) => setIsActive(e.target.checked)} name="status" disabled={!isEditing} />}
                            label={isActive ? "Unlocked" : "Locked"}
                            labelPlacement="start"
                            sx={{ marginLeft: 'auto' }}
                        />
                    </Box>
                    <Box component="form" onSubmit={handleSaveClick}>
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
                                    disabled={!isEditing}
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
                                    disabled={!isEditing}
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
                                    disabled={!isEditing}
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
                                    disabled={!isEditing}
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
                                    autoComplete="user-type"
                                    InputLabelProps={{ shrink: false }}
                                    value={formData.role}
                                    onChange={handleChange}
                                    size={'small'}
                                    sx={{ "& .MuiInputBase-root": { textAlign: 'left' }, border: 'solid 1px #E0E0E0', borderRadius: '5px' }}
                                    disabled={!isEditing}
                                >
                                    <MenuItem value="Admin">Admin</MenuItem>
                                    <MenuItem value="User">Regular User</MenuItem>
                                </TextField>
                            </Grid>
                            <Box display="flex" justifyContent="flex-start" mt={3} sx={{ paddingLeft: '24px' }}>
                                {isEditing ? (
                                    <Button
                                        type="submit"
                                        variant="outlined"
                                        color="primary"
                                        startIcon={<SaveIcon />}
                                        sx={{ mr: 2, width: '180px', height: '2.5em', py: '0px', textTransform: 'capitalize', fontSize: '14px', borderRadius: '4px' }}
                                        disabled={isUpdating}
                                    >
                                        {isUpdating ? 'Updating...' : 'Save'}
                                    </Button>
                                ) : (
                                    canEditUser() && (
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            startIcon={<EditIcon />}
                                            sx={{ mr: 2, width: '180px', height: '2.5em', py: '0px', textTransform: 'capitalize', fontSize: '14px', borderRadius: '4px' }}
                                            onClick={handleEditClick}
                                        >
                                            Edit
                                        </Button>
                                    )
                                )}
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
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}
