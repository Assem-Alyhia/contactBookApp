import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Avatar, Grid, Switch, FormControlLabel } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Footer from '@/components/Utility/Footer';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContactQuery } from '../../../pages/api/contacts/getContact';


export default function EditContact() {
    const [isActive, setIsActive] = useState(false);


    const router = useRouter();
    const { id } = router.query;
    const { data , isLoading } = useContactQuery(id);


    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <Box sx={{ marginTop: '1rem' }}>
            <Container maxWidth="lg">
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Home / Contacts / {data.firstName} {data.lastName}
                </Typography>
                <Box borderBottom={2} mb={2} sx={{ opacity: 0.2 }} />
                <Box sx={{ backgroundColor: '#fff', borderRadius: '5px', boxShadow: '0px 3px 15px #00000012' }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ border: '1px solid #E0E0E0', fontSize: '20px', fontWeight: '600', background: '#F7F7F7 0% 0% no-repeat padding-box', padding: '.7rem', borderRadius: '5px' }}>
                        <Typography variant="h6" sx={{fontSize:'20px' ,  fontWeight: '600'}}> 
                            Contact details
                        </Typography>   
                        <FormControlLabel
                            control={<Switch checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />}
                            label="Active"
                            labelPlacement="start"
                            sx={{ marginLeft: 'auto' }}
                        />
                    </Box>
                    <Grid container spacing={3} sx={{ padding: '2rem 2rem 2rem 2rem' }}>
                        <Grid item xs={12} md={4} display="flex" justifyContent="start" alignItems="center" flexDirection="column" >
                            <Avatar
                                sx={{ width: 202, height: 202, marginBottom: '1rem' }}
                                src={data.avatarUrl || "/broken-image.jpg"}
                            />
                            <Typography variant="body1" display="block" gutterBottom>
                                {data.firstName} {data.lastName}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="caption" display="block" gutterBottom sx={{ fontSize: '16px', fontWeight: '500' }}>
                                        First name *
                                    </Typography>
                                    <TextField
                                        required
                                        fullWidth
                                        id="firstName"
                                        placeholder="First"
                                        name="firstName"
                                        autoComplete="given-name"
                                        defaultValue={data.firstName}
                                        InputLabelProps={{ shrink: false }}
                                        size={'small'}
                                        sx={{border: 'solid 1px #E0E0E0', borderRadius: '5px' }}
                                        
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="caption" display="block" gutterBottom sx={{ fontSize: '16px', fontWeight: '500' }}>
                                        Last name *
                                    </Typography>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        placeholder="Last"
                                        name="lastName"
                                        autoComplete="family-name"
                                        defaultValue={data.lastName}
                                        InputLabelProps={{ shrink: false }}
                                        size={'small'}
                                        sx={{ border: 'solid 1px #E0E0E0', borderRadius: '5px' }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="caption" display="block" gutterBottom sx={{ fontSize: '16px', fontWeight: '500' }}>
                                        Email
                                    </Typography>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        placeholder="name@example.com"
                                        name="email"
                                        autoComplete="email"
                                        defaultValue={data.email}
                                        InputLabelProps={{ shrink: false }}
                                        size={'small'}
                                        sx={{ border: 'solid 1px #E0E0E0', borderRadius: '5px' }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="caption" display="block" gutterBottom sx={{ fontSize: '16px', fontWeight: '500' }}>
                                        Phone *
                                    </Typography>
                                    <TextField
                                        required
                                        fullWidth
                                        id="phone"
                                        placeholder="555-123-4567"
                                        name="phone"
                                        autoComplete="tel"
                                        defaultValue={data.phone}
                                        InputLabelProps={{ shrink: false }}
                                        size={'small'}
                                        sx={{ border: 'solid 1px #E0E0E0', borderRadius: '5px' }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="caption" display="block" gutterBottom sx={{ fontSize: '16px', fontWeight: '500' }}>
                                        Email 2
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        id="email2"
                                        placeholder="name@example.com"
                                        name="email2"
                                        autoComplete="email"
                                        defaultValue={data.email2}
                                        InputLabelProps={{ shrink: false }}
                                        size={'small'}
                                        sx={{ border: 'solid 1px #E0E0E0', borderRadius: '5px' }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="caption" display="block" gutterBottom sx={{ fontSize: '16px', fontWeight: '500' }}>
                                        Mobile
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        id="mobile"
                                        placeholder="555-123-4567"
                                        name="mobile"
                                        autoComplete="tel"
                                        defaultValue={data.mobile}
                                        InputLabelProps={{ shrink: false }}
                                        size={'small'}
                                        sx={{ border: 'solid 1px #E0E0E0', borderRadius: '5px' }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="caption" display="block" gutterBottom sx={{ fontSize: '16px', fontWeight: '500' }}>
                                        Address
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        id="address"
                                        placeholder="Address"
                                        name="address"
                                        autoComplete="street-address"
                                        defaultValue={data.address}
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
                                    <Typography variant="caption" display="block" gutterBottom sx={{ fontSize: '16px', fontWeight: '500' }}>
                                        Address 2
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        id="address2"
                                        placeholder="Address 2"
                                        name="address2"
                                        autoComplete="street-address"
                                        defaultValue={data.address2}
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
                                    <Button variant="outlined" color="primary" startIcon={<EditIcon />} 
                                    sx={{ mr: 2,width: '180px', height: '2.5em', py: '0px', borderRadius: '4px', textTransform: 'capitalize', fontSize: '14px', borderRadius: '4px' }}>
                                        Edit
                                    </Button>
                                    <Link href='/contacts/contactsTable'>
                                        <Button variant="outlined" startIcon={<ArrowBackIcon />} 
                                        sx={{ mr: 2,width: '180px', height: '2.5em', py: '0px', borderRadius: '4px', textTransform: 'capitalize', fontSize: '14px', borderRadius: '4px' }}>
                                            Back
                                        </Button>
                                    </Link>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Footer  color = '#000' gap = '0 50% 0 10%' opacity='0.3' />
        </Box>
    );
}
