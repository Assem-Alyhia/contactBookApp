import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, TextField, Button, Grid, Paper, MenuItem, Snackbar, Alert, useMediaQuery } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Footer from '@/components/Utility/Footer';
import Map from './Map';
import { useCompanyProfileQuery } from '@/pages/api/company/getCompany';
import { useUpdateCompanyMutation } from '@/pages/api/company/putCompany';
import { useProfileQuery } from '@/pages/api/users/getProfile';
import getPermissions from '@/components/Utility/rolesPermissions';

export default function CompanyProfile() {
    const { isLoading, data, isError } = useCompanyProfileQuery();
    const { data: userProfile, isLoading: isProfileLoading } = useProfileQuery();
    const { mutate: updateCompany, isLoading: isUpdating } = useUpdateCompanyMutation();
    const [formData, setFormData] = useState({
        companyName: '',
        vatNumber: '',
        streetOne: '',
        streetTwo: '',
        city: '',
        state: '',
        zip: '',
        country: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    useEffect(() => {
        if (data) {
            setFormData({
                companyName: data.companyName,
                vatNumber: data.vatNumber,
                streetOne: data.streetOne,
                streetTwo: data.streetTwo,
                city: data.city,
                state: data.state,
                zip: data.zip,
                country: data.country,
            });
        }
    }, [data]);

    if (isLoading || isProfileLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading company profile.</div>;
    }

    const role = userProfile?.role || 'Owner';
    const permissions = getPermissions(role);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        updateCompany(formData, {
            onSuccess: () => {
                setIsEditing(false);
                setSnackbarMessage('Company profile updated successfully!');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
            },
            onError: (error) => {
                console.error('Error updating company profile: ', error);
                setSnackbarMessage('Error updating company profile. Please try again.');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            }
        });
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box sx={{ marginTop: '1rem' }}>
            <Container maxWidth="lg">
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Home / Company Profile
                </Typography>
                <Box borderBottom={2} mb={2} sx={{ opacity: 0.2 }} />
                <Paper elevation={3} sx={{ boxShadow: '0 3px 15px 4px #00000012' }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 3, background: '#F7F7F7', padding: { xs: '1rem !important', md: '1rem !important' } }}>
                        My Profile
                    </Typography>
                    <Grid container spacing={2} sx={{ padding: { xs: '0rem 1rem 1rem', md: '0rem 3rem 3rem !important' } }}>
                        <Grid item xs={12} md={7}>
                            <Grid container spacing={2}>
                                {['companyName', 'vatNumber', 'streetOne', 'streetTwo', 'city', 'state', 'zip', 'country'].map((field, index) => (
                                    <Grid item xs={12} md={6} key={index}>
                                        <Typography variant="body2" gutterBottom sx={{ fontWeight: 'bold' }}>
                                            {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                                        </Typography>
                                        {field !== 'country' ? (
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                size="small"
                                                name={field}
                                                value={formData[field]}
                                                onChange={handleChange}
                                                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                                disabled={!isEditing}
                                                sx={{ fontWeight: 'bold' }}
                                            />
                                        ) : (
                                            <TextField
                                                select
                                                fullWidth
                                                variant="outlined"
                                                size="small"
                                                sx={{ fontWeight: 'bold' }}
                                                name={field}
                                                value={formData[field]}
                                                onChange={handleChange}
                                                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                                disabled={!isEditing}
                                            >
                                                <MenuItem value="US">United States</MenuItem>
                                                <MenuItem value="CA">Canada</MenuItem>
                                                <MenuItem value="MX">Mexico</MenuItem>
                                            </TextField>
                                        )}
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={5} sx={{ display: isMobile ? 'none' : 'flex', justifyContent: 'center', alignItems: 'center', padding: { xs: '0px', md: '0 3rem !important' } }}>
                            <Map />
                        </Grid>
                        {isMobile && (
                            <Grid item xs={12}>
                                <Map />
                            </Grid>
                        )}
                        <Box display="flex" justifyContent={isMobile ? 'center' : 'flex-start'} sx={{ mt: 3, ml: isMobile ? 0 : 2 }}>
                            {isEditing ? (
                                <Button
                                    variant="outlined"
                                    startIcon={<SaveIcon />}
                                    onClick={handleSaveClick}
                                    sx={{ mr: 2, width: '180px', height: '2.5em', py: '0px', borderRadius: '4px', textTransform: 'capitalize', fontSize: '14px' }}
                                    disabled={isUpdating}
                                >
                                    {isUpdating ? 'Saving...' : 'Save'}
                                </Button>
                            ) : (
                                permissions.canEditCompany && (
                                    <Button
                                        variant="outlined"
                                        startIcon={<EditIcon />}
                                        onClick={handleEditClick}
                                        sx={{ mr: 2, width: '180px', height: '2.5em', py: '0px', borderRadius: '4px', textTransform: 'capitalize', fontSize: '14px', ml: isMobile ? 2 : 0 }}
                                    >
                                        Edit
                                    </Button>
                                )
                            )}
                        </Box>
                    </Grid>
                </Paper>
            </Container>
            <Footer color='#000' gap='0 10%' opacity='0.3' />
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}
