import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Avatar, Grid, useMediaQuery } from '@mui/material';
import Footer from '@/components/Utility/Footer';
import Link from 'next/link';
import { useAddContactMutation } from '@/pages/api/contacts/addContact';
import { useRouter } from 'next/router';

export default function CreateNewContact() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        image: null,
        email: '',
        EmailTwo: '',
        phoneNumber: '',
        mobileNumber: '',
        address: '',
        AddressTwo: '',
    });

    const { mutate: addContact, isLoading } = useAddContactMutation();
    const router = useRouter();
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setFormData((prev) => ({
                ...prev,
                [name]: files[0],
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addContact(formData, {
            onSuccess: () => {
                router.push('/contacts/contactsTable');
            },
            onError: (error) => {
                console.error('Error adding contact: ', error);
            },
        });
    };

    return (
        <Box sx={{ marginTop: '1rem' }}>
            <Container maxWidth="lg">
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Home / Contacts / Create new
                </Typography>
                <Box borderBottom={2} mb={2} sx={{ opacity: 0.2 }} />
                <Box
                    sx={{
                        backgroundColor: '#fff',
                        borderRadius: '5px',
                        boxShadow: '0px 3px 15px #00000012',
                    }}
                >
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{
                            border: '1px solid #E0E0E0',
                            fontSize: '20px',
                            fontWeight: '600',
                            background: '#F7F7F7 0% 0% no-repeat padding-box',
                            padding: '.7rem',
                            borderRadius: '5px',
                        }}
                    >
                        <Typography variant="h6" sx={{ fontSize: '20px', fontWeight: '600' }}>
                            Contact details
                        </Typography>
                    </Box>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3} sx={{ padding: '2rem' }}>
                            <Grid
                                item
                                xs={12}
                                md={4}
                                display="flex"
                                justifyContent="start"
                                alignItems="center"
                                flexDirection="column"
                            >
                                <Avatar
                                    sx={{ width: 202, height: 202, marginBottom: '1rem' }}
                                    src={formData.image ? URL.createObjectURL(formData.image) : '/broken-image.jpg'}
                                />
                                <Typography variant="caption" display="block" gutterBottom sx={{ opacity: 0.4 }}>
                                    JPG or PNG no larger than 5 MB
                                </Typography>
                                <Button variant="contained" component="label" sx={{ width: '200px', height: '40px' }}>
                                    Upload new image
                                    <input hidden accept="image/*" type="file" name="image" onChange={handleChange} />
                                </Button>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6} display="flex" flexDirection="column" alignItems="flex-start">
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
                                            size="small"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            sx={{ border: 'solid 1px #E0E0E0', borderRadius: '5px' }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} display="flex" flexDirection="column" alignItems="flex-start">
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
                                            size="small"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            sx={{ border: 'solid 1px #E0E0E0', borderRadius: '5px' }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} display="flex" flexDirection="column" alignItems="flex-start">
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
                                            size="small"
                                            value={formData.email}
                                            onChange={handleChange}
                                            sx={{ border: 'solid 1px #E0E0E0', borderRadius: '5px' }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} display="flex" flexDirection="column" alignItems="flex-start">
                                        <Typography variant="caption" display="block" gutterBottom sx={{ fontSize: '16px', fontWeight: '600' }}>
                                            Phone *
                                        </Typography>
                                        <TextField
                                            required
                                            fullWidth
                                            id="phoneNumber"
                                            placeholder="555-123-4567"
                                            name="phoneNumber"
                                            autoComplete="tel"
                                            InputLabelProps={{ shrink: false }}
                                            size="small"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            sx={{ border: 'solid 1px #E0E0E0', borderRadius: '5px' }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} display="flex" flexDirection="column" alignItems="flex-start">
                                        <Typography variant="caption" display="block" gutterBottom sx={{ fontSize: '16px', fontWeight: '600' }}>
                                            Email 2
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            id="EmailTwo"
                                            placeholder="name@example.com"
                                            name="EmailTwo"
                                            autoComplete="email"
                                            InputLabelProps={{ shrink: false }}
                                            size="small"
                                            value={formData.EmailTwo}
                                            onChange={handleChange}
                                            sx={{ border: 'solid 1px #E0E0E0', borderRadius: '5px' }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} display="flex" flexDirection="column" alignItems="flex-start">
                                        <Typography variant="caption" display="block" gutterBottom sx={{ fontSize: '16px', fontWeight: '600' }}>
                                            Mobile
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            id="mobileNumber"
                                            placeholder="555-123-4567"
                                            name="mobileNumber"
                                            autoComplete="tel"
                                            InputLabelProps={{ shrink: false }}
                                            size="small"
                                            value={formData.mobileNumber}
                                            onChange={handleChange}
                                            sx={{ border: 'solid 1px #E0E0E0', borderRadius: '5px' }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} display="flex" flexDirection="column" alignItems="flex-start">
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
                                            size="small"
                                            value={formData.address}
                                            onChange={handleChange}
                                            sx={{ border: 'solid 1px #E0E0E0', borderRadius: '5px' }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} display="flex" flexDirection="column" alignItems="flex-start">
                                        <Typography variant="caption" display="block" gutterBottom sx={{ fontSize: '16px', fontWeight: '600' }}>
                                            Address 2
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            id="AddressTwo"
                                            placeholder="Address 2"
                                            name="AddressTwo"
                                            autoComplete="street-address"
                                            InputLabelProps={{ shrink: false }}
                                            size="small"
                                            value={formData.AddressTwo}
                                            onChange={handleChange}
                                            sx={{ border: 'solid 1px #E0E0E0', borderRadius: '5px' }}
                                        />
                                    </Grid>
                                    <Box display="flex" flexDirection={isMobile ? 'column' : 'row'} justifyContent="flex-start" mt={3} sx={{ paddingLeft: isMobile ? '16px' : '16px', width: isMobile ? '100%' : 'auto' }}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            sx={{
                                                mr: isMobile ? 0 : 2,
                                                mb: isMobile ? 2 : 0,
                                                width: isMobile ? '100%' : '180px',
                                                height: '2.5em',
                                                py: '0px',
                                                borderRadius: '4px',
                                                textTransform: 'capitalize',
                                                fontSize: '14px',
                                            }}
                                            disabled={isLoading}
                                        >
                                            {isLoading ? 'Creating...' : 'Create'}
                                        </Button>
                                        <Link href='/contacts/contactsTable'>
                                            <Button
                                                variant="outlined"
                                                sx={{
                                                    width: isMobile ? '100%' : '180px',
                                                    height: '2.5em',
                                                    py: '0px',
                                                    borderRadius: '4px',
                                                    textTransform: 'capitalize',
                                                    fontSize: '14px',
                                                }}
                                            >
                                                Back
                                            </Button>
                                        </Link>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Container>
            <Footer color='#000' gap='0 50% 0 10%' opacity='0.3' mdPosition='auto' />
        </Box>
    );
}
