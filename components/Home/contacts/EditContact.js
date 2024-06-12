import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, TextField, Button, Avatar, Grid, Switch, FormControlLabel, useMediaQuery, Snackbar, Alert } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContactQuery } from '@/pages/api/contacts/getContact';
import { useUpdateContactMutation } from '@/pages/api/contacts/setUpdateContact';
import { useProfileQuery } from '@/pages/api/users/getProfile';
import getPermissions from '@/components/Utility/rolesPermissions';
import Footer from '@/components/Utility/Footer';

export default function EditContact() {
    const [isEditing, setIsEditing] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        emailTwo: '',
        phoneNumber: '',
        mobileNumber: '',
        address: '',
        addressTwo: '',
    });
    const [errors, setErrors] = useState({});
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const router = useRouter();
    const { id } = router.query;
    const { data: contactData, isLoading } = useContactQuery(id);
    const { data: userProfile, isLoading: isProfileLoading } = useProfileQuery();
    const { mutate: updateContact, isLoading: isUpdating } = useUpdateContactMutation();

    const role = userProfile?.role || 'User';
    const permissions = getPermissions(role);

    useEffect(() => {
        if (contactData) {
            setFormData({
                firstName: contactData.firstName,
                lastName: contactData.lastName,
                email: contactData.email,
                phoneNumber: contactData.phoneNumber,
                emailTwo: contactData.emailTwo,
                mobileNumber: contactData.mobileNumber,
                address: contactData.address,
                addressTwo: contactData.addressTwo,
            });
            setIsActive(contactData.status === 'Active');
        }
    }, [contactData]);

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.firstName) newErrors.firstName = 'First name is required.';
        if (!formData.lastName) newErrors.lastName = 'Last name is required.';
        if (!formData.email) newErrors.email = 'Email is required.';
        if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required.';
        if (!formData.address) newErrors.address = 'Address is required.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleEditClick = (e) => {
        e.preventDefault();
        setIsEditing(true);
    };

    const handleSaveClick = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        updateContact({ id, ...formData, status: isActive ? 'Active' : 'Inactive' }, {
            onSuccess: () => {
                setIsEditing(false);
                setSnackbarMessage('Contact updated successfully!');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
            },
            onError: (error) => {
                console.error('Error updating contact: ', error);
                setSnackbarMessage('Error updating contact. Please try again.');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
                if (error.response && error.response.data && error.response.data.errors) {
                    setErrors(error.response.data.errors);
                }
            }
        });
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    if (isLoading || isProfileLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Box sx={{ marginTop: '1rem' }}>
            <Container maxWidth="lg">
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Home / Contacts / {formData.firstName} {formData.lastName}
                </Typography>
                <Box borderBottom={2} mb={2} sx={{ opacity: 0.2 }} />
                <Box sx={{ backgroundColor: '#fff', borderRadius: '5px', boxShadow: '0px 3px 15px #00000012' }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ border: '1px solid #E0E0E0', fontSize: '20px', fontWeight: '600', background: '#F7F7F7 0% 0% no-repeat padding-box', padding: '.7rem', borderRadius: '5px' }}>
                        <Typography variant="h6" sx={{ fontSize: '20px', fontWeight: '600' }}>
                            Contact details
                        </Typography>
                        <FormControlLabel
                            control={<Switch checked={isActive} onChange={(e) => setIsActive(e.target.checked)} disabled={!permissions.canEditContacts || !isEditing} />}
                            label="Active"
                            labelPlacement="start"
                            sx={{ marginLeft: 'auto' }}
                        />
                    </Box>
                    <Box component="form" onSubmit={handleSaveClick}>
                        <Grid container spacing={3} sx={{ padding: '2rem' }}>
                            <Grid item xs={12} md={4} display="flex" justifyContent="start" alignItems="center" flexDirection="column">
                                <Avatar
                                    sx={{ width: 202, height: 202, marginBottom: '1rem' }}
                                    src={formData.imageUrl || "/broken-image.jpg"}
                                />
                                <Typography variant="body1" display="block" gutterBottom>
                                    {formData.firstName} {formData.lastName}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Grid container spacing={2}>
                                    {[
                                        { label: 'First name *', name: 'firstName', placeholder: 'First', autoComplete: 'given-name', value: formData.firstName, required: true },
                                        { label: 'Last name *', name: 'lastName', placeholder: 'Last', autoComplete: 'family-name', value: formData.lastName, required: true },
                                        { label: 'Email *', name: 'email', placeholder: 'name@example.com', autoComplete: 'email', value: formData.email , required: true },
                                        { label: 'Phone *', name: 'phoneNumber', placeholder: '555-123-4567', autoComplete: 'tel', value: formData.phoneNumber, required: true },
                                        { label: 'Email 2', name: 'emailTwo', placeholder: 'name@example.com', autoComplete: 'email', value: formData.emailTwo },
                                        { label: 'Mobile', name: 'mobileNumber', placeholder: '555-123-4567', autoComplete: 'tel', value: formData.mobileNumber , required: true},
                                    ].map((field, index) => (
                                        <Grid key={index} item xs={12} md={6}>
                                            <Typography variant="caption" display="block" gutterBottom sx={{ fontSize: '16px', fontWeight: '500' }}>
                                                {field.label}
                                            </Typography>
                                            <TextField
                                                fullWidth
                                                id={field.name}
                                                name={field.name}
                                                placeholder={field.placeholder}
                                                autoComplete={field.autoComplete}
                                                value={field.value}
                                                onChange={handleChange}
                                                InputLabelProps={{ shrink: false }}
                                                size="small"
                                                required={field.required}
                                                inputProps={field.inputProps}
                                                sx={{ border: 'solid 1px #E0E0E0', borderRadius: '5px', mt: isMobile ? 1 : 0 }}
                                                disabled={!permissions.canEditContacts || !isEditing}
                                                error={!!errors[field.name]}
                                                helperText={errors[field.name]}
                                            />
                                        </Grid>
                                    ))}
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="caption" display="block" gutterBottom sx={{ fontSize: '16px', fontWeight: '500' }}>
                                            Address *
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            id="address"
                                            name="address"
                                            placeholder="Address"
                                            autoComplete="street-address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            InputLabelProps={{ shrink: false }}
                                            inputProps={{ multiline: true, rows: isMobile ? 4 : 2 }}
                                            sx={{ border: 'solid 1px #E0E0E0', borderRadius: '5px', mt: isMobile ? 1 : 0 }}
                                            disabled={!permissions.canEditContacts || !isEditing}
                                            error={!!errors.address}
                                            helperText={errors.address}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="caption" display="block" gutterBottom sx={{ fontSize: '16px', fontWeight: '500' }}>
                                            Address 2
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            id="addressTwo"
                                            name="addressTwo"
                                            placeholder="Address 2"
                                            autoComplete="street-address"
                                            value={formData.addressTwo}
                                            onChange={handleChange}
                                            InputLabelProps={{ shrink: false }}
                                            inputProps={{ multiline: true, rows: isMobile ? 4 : 2 }}
                                            sx={{ border: 'solid 1px #E0E0E0', borderRadius: '5px', mt: isMobile ? 1 : 0 }}
                                            disabled={!permissions.canEditContacts || !isEditing}
                                            error={!!errors.addressTwo}
                                            helperText={errors.addressTwo}
                                        />
                                    </Grid>
                                    <Box display="flex" flexDirection={isMobile ? 'column' : 'row'} justifyContent="flex-start" mt={3} sx={{ width: '100%', paddingLeft: '16px' }}>
                                        {permissions.canEditContacts && (
                                            isEditing ? (
                                                <Button
                                                    type="submit"
                                                    variant="outlined"
                                                    color="primary"
                                                    startIcon={<SaveIcon />}
                                                    sx={{ mr: isMobile ? 0 : 2, mb: isMobile ? 2 : 0, width: isMobile ? '100%' : '180px', height: '2.5em', py: '0px', borderRadius: '4px', textTransform: 'capitalize', fontSize: '14px' }}
                                                    disabled={isUpdating}
                                                >
                                                    {isUpdating ? 'Updating...' : 'Save'}
                                                </Button>
                                            ) : (
                                                <Button
                                                    variant="outlined"
                                                    color="primary"
                                                    startIcon={<EditIcon />}
                                                    sx={{ mr: isMobile ? 0 : 2, mb: isMobile ? 2 : 0, width: isMobile ? '100%' : '180px', height: '2.5em', py: '0px', borderRadius: '4px', textTransform: 'capitalize', fontSize: '14px' }}
                                                    onClick={handleEditClick}
                                                >
                                                    Edit
                                                </Button>
                                            )
                                        )}
                                        <Link href='/contacts/contactsTable' passHref>
                                            <Button variant="outlined"
                                                sx={{ width: isMobile ? '100%' : '180px', height: '2.5em', py: '0px', borderRadius: '4px', textTransform: 'capitalize', fontSize: '14px' }}
                                            >
                                                Back
                                            </Button>
                                        </Link>
                                    </Box>
                                </Grid>
                            </Grid>
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
