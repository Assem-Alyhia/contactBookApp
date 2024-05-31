import React from 'react';
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    Paper,
    MenuItem,
} from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
import Footer from '@/components/Utility/Footer';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';

// // تعيين أيقونة Marker الافتراضية لتعمل مع react-leaflet
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
//   iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
// });

export default function CompanyProfile() {
    const position = [20.9517, 45.2197]; // إحداثيات موقع عزاز في المملكة العربية السعودية

    return (
        <Box sx={{ marginTop: '1rem' }}>
            <Container maxWidth="lg">
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Home / Company Profile
                </Typography>
                <Box borderBottom={2} mb={2} sx={{ opacity: 0.2 }} />
                
                <Paper elevation={3} >
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 3 ,background:'#E0E0E0' ,padding:'1rem'}}>
                        My Profile
                    </Typography>
                    <Grid container spacing={2} sx={{ padding : '10px' }}>
                        <Grid item xs={12} md={7}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="body2" gutterBottom>Company Name</Typography>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        placeholder="Company"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="body2" gutterBottom>VAT Number</Typography>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        placeholder="VAT Number"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="body2" gutterBottom>Street</Typography>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        placeholder="Street"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="body2" gutterBottom>Street 2</Typography>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        placeholder="Street 2"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="body2" gutterBottom>City</Typography>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        placeholder="City"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="body2" gutterBottom>State</Typography>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        placeholder="State"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="body2" gutterBottom>Zip</Typography>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        placeholder="Zip"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="body2" gutterBottom>Country</Typography>
                                    <TextField
                                        select
                                        defaultValue=""
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        placeholder="Country"
                                    >
                                        <MenuItem value="US">United States</MenuItem>
                                        <MenuItem value="CA">Canada</MenuItem>
                                        <MenuItem value="MX">Mexico</MenuItem>
                                    </TextField>
                                </Grid>
                            </Grid>
                        </Grid>
                        {/* <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <MapContainer center={position} zoom={13} style={{ height: '305px', width: '80%' }}>
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                />
                                <Marker position={position}>
                                    <Popup>
                                        Your location
                                    </Popup>
                                </Marker>
                            </MapContainer>
                        </Grid>
                        <Box display="flex" justifyContent="flex-start" sx={{ mt: 3 , ml:2}}>
                            <Button variant="outlined" startIcon={<EditIcon />} 
                            sx={{ mr: 2,width: '180px', height: '2.5em', py: '0px', borderRadius: '4px', textTransform: 'capitalize', fontSize: '14px', borderRadius: '4px' }}>
                                Edit
                            </Button>
                        </Box> */}
                    </Grid>
                </Paper>
            </Container>
            <Footer color='#000' gap='0 10%' opacity='0.4' />
        </Box>
    );
}
