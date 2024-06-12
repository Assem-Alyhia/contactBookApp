import * as React from 'react';
import {
    Container,
    Box,
    Typography,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Button,
    CircularProgress,
    useMediaQuery
} from '@mui/material';
import Link from 'next/link';
import { ArrowUpward, ArrowDownward, Email, Close } from '@mui/icons-material';
import Footer from '@/components/Utility/Footer';
import { useContactsQuery } from '@/pages/api/contacts/getContacts';
import { useActivitiesQuery } from '@/pages/api/contacts/getActivitie';
import { useProfileQuery } from '@/pages/api/users/getProfile';
import getPermissions from '@/components/Utility/rolesPermissions';

export default function Dashboard() {
    const { data: contactsData, isLoading: isContactsLoading, error: contactsError } = useContactsQuery();
    const { data: userProfile, isLoading: isProfileLoading } = useProfileQuery();
    const activitiesQuery = useActivitiesQuery();
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    if (isContactsLoading || isProfileLoading) {
        return <CircularProgress />;
    }

    const role = userProfile?.role || 'Owner';
    const permissions = getPermissions(role);

    let activitiesData = [];
    let isActivitiesLoading = false;
    let activitiesError = null;

    if (permissions.canActivitiesContacts) {
        activitiesData = activitiesQuery.data;
        isActivitiesLoading = activitiesQuery.isLoading;
        activitiesError = activitiesQuery.error;
    }

    if (isContactsLoading || (permissions.canActivitiesContacts && isActivitiesLoading)) {
        return <CircularProgress />;
    }

    if (contactsError) {
        return <Typography color="error">Error fetching contacts</Typography>;
    }

    if (permissions.canActivitiesContacts && activitiesError) {
        return <Typography color="error">Error fetching activities</Typography>;
    }

    const sortedActivities = activitiesData ? [...activitiesData].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) : [];

    const activeCount = contactsData.filter(row => row.status === 'Active').length;
    const inactiveCount = contactsData.filter(row => row.status === 'Inactive').length;
    const withEmailCount = contactsData.filter(row => row.emailTwo).length;
    const withoutEmailCount = contactsData.filter(row => !row.emailTwo).length;

    const cardStyles = role === 'User' ? { padding: '2rem', fontSize: '1.8rem', marginBottom: '1rem' } : { padding: '1.5rem', fontSize: '1.5rem', marginBottom: '1.5rem' };

    return (
        <Box>
            <Container component="main" maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', padding: '0 !important', padding: { xs: '0rem', md: '2rem' } }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', marginTop: '1rem', textAlign: { xs: 'start', md: 'left' }, padding: { xs: '1rem 0  0 1rem' , md: '1rem 0 0 0'} , fontSize: { xs: '1rem', md: '1.5rem' } }}>
                    Statistical Dashboard
                </Typography>
                <Box borderBottom={2} mb={2} sx={{ opacity: 0.2, width: '100%' }} />
                <Grid container spacing={role === 'User' ? 6 : 5} mt={1} justifyContent={permissions.canActivitiesContacts ? 'flex-start' : 'center'} >
                    <Grid item xs={12} md={6} >
                        <Grid container spacing={role === 'User' ? 4 : 3} justifyContent="center" sx={{padding: { xs: '1rem' }}}>
                            <Grid item xs={12} sm={12} md={6}>
                                <Paper sx={{ ...cardStyles, textAlign: 'start', backgroundColor: '#00AC69', color: '#fff', position: 'relative' }}>
                                    <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', md: cardStyles.fontSize } }}>{activeCount}</Typography>
                                    <Typography sx={{ fontSize: { xs: '0.8rem', md: '1rem' } }}>Active</Typography>
                                    <Typography variant="caption" sx={{ display: 'flex', fontSize: { xs: '0.6rem', md: '1rem' } , alignItems: 'center'}}><ArrowUpward sx={{ width: '10px', marginRight: '5px' }} /> 3% from last month</Typography>
                                    <ArrowUpward sx={{ position: 'absolute', top: '10px', right: '10px', fontSize: '40px', opacity: 0.5, background: 'white', color: '#00AC69', borderRadius: '50%', padding: '7px' }} />
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <Paper sx={{ ...cardStyles, textAlign: 'start', backgroundColor: '#FC766A', color: '#fff', position: 'relative' }}>
                                    <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', md: cardStyles.fontSize } }}>{inactiveCount}</Typography>
                                    <Typography sx={{ fontSize: { xs: '0.8rem', md: '1rem' } }}>Inactive</Typography>
                                    <Typography variant="caption" sx={{ display: 'flex', fontSize: { xs: '0.6rem', md: '1rem' } , alignItems: 'center'}}><ArrowUpward sx={{ width: '10px', marginRight: '5px' }} /> 3% from last month</Typography>
                                    <ArrowDownward sx={{ position: 'absolute', top: '10px', right: '10px', fontSize: '40px', opacity: 0.5, background: 'white', color: '#FC766A', borderRadius: '50%', padding: '7px' }} />
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <Paper sx={{ ...cardStyles, textAlign: 'start', backgroundColor: '#2C3E50', color: '#fff', position: 'relative' }}>
                                    <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', md: cardStyles.fontSize } }}>{withEmailCount}</Typography>
                                    <Typography sx={{ fontSize: { xs: '0.8rem', md: '1rem' } }}>With email</Typography>
                                    <Typography variant="caption" sx={{ display: 'flex', fontSize: { xs: '0.6rem', md: '1rem' } , alignItems: 'center'}}><ArrowUpward sx={{ width: '10px', marginRight: '5px' }} /> 3% from last month</Typography>
                                    <Email sx={{ position: 'absolute', top: '10px', right: '10px', fontSize: '40px', opacity: 0.5, background: 'white', color: '#2C3E50', borderRadius: '50%', padding: '7px' }} />
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <Paper sx={{ ...cardStyles, textAlign: 'start', backgroundColor: '#5B84B1', color: '#fff', position: 'relative' }}>
                                    <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', md: cardStyles.fontSize } }}>{withoutEmailCount}</Typography>
                                    <Typography sx={{ fontSize: { xs: '0.8rem', md: '1rem' } }}>Without email</Typography>
                                    <Typography variant="caption" sx={{ display: 'flex', fontSize: { xs: '0.6rem', md: '1rem' } , alignItems: 'center'}}><ArrowUpward sx={{ width: '10px', marginRight: '5px' }} /> 3% from last month</Typography>
                                    <Close sx={{ position: 'absolute', top: '10px', right: '10px', fontSize: '40px', opacity: 0.5, background: 'white', color: '#5B84B1', borderRadius: '50%', padding: '7px' }} />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                    {permissions.canActivitiesContacts && (
                        <Grid item xs={12} md={6} >
                            <Box sx={{ backgroundColor: '#fff', borderRadius: '5px', boxShadow: '0px 3px 15px #00000012' }}>
                                <Link href='/contacts/activities' style={{ color: '#000', textDecoration: 'none' }}>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '1rem', background: { xs: 'none' , md:'#F7F7F7'} , borderTop: { xs: 'solid #E0E0E0 1px' , md :'none'} , borderBottom: { xs: 'solid #E0E0E0 1px' , md :'none'}, padding: '.8rem', borderRadius: '3px', fontSize: { xs: '1rem', md: '1.5rem' } }}>Latest activities</Typography>
                                </Link>
                                <TableContainer component={Paper} sx={{ boxShadow: 'none', padding: '0 2rem 1rem', maxHeight: '220px', overflowY: 'auto', '&::-webkit-scrollbar': { display: 'none' } }}>
                                    <Table aria-label="activities table">
                                        <TableBody>
                                            {sortedActivities.map((row) => (
                                                <TableRow key={row.id} sx={{height:'20px' }}>
                                                    <TableCell component="th" scope="row" sx={{ borderBottom: 'none', fontSize: '15px', padding: '0', width: '40%' ,fontWeight:'bold' , opacity: '0.7' ,  width: { xs: '80%' }  }}>
                                                        {row.contact}
                                                        {isMobile && (
                                                            <Typography sx={{ opacity: 0.4, fontSize: '10px' }}>
                                                                {new Date(row.timestamp).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                                                            </Typography>
                                                        )}
                                                    </TableCell>
                                                    {!isMobile && (
                                                        <TableCell align="left" sx={{ borderBottom: 'none', opacity: 0.4, fontSize: '10px', padding: '0' }}>
                                                            {new Date(row.timestamp).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                                                        </TableCell>
                                                    )}
                                                    <TableCell align="left" sx={{flexWrap:'wrap', borderBottom: 'none', display: 'flex', flexDirection: 'column', alignItems: isMobile ? 'start' : 'center', opacity: 0.4, fontSize: '10px' ,padding: '0', margin: { xs: '0 0  0 1rem' } }}>
                                                        <Box sx={{display:'flex' , alignItems: 'center !important' ,padding: '0.5rem 0 0 0'}}>
                                                        <span style={{  height: '7px', width: '7px', opacity: 1, borderRadius: '50%', backgroundColor: row.action === 'Add' ? 'green' : row.action === 'Delete' ? 'red' : row.action === 'Update' ? 'orange' : row.action === 'Access' ? 'blue' : 'grey', marginRight: '0.5rem' }}></span>
                                                        {row.action}
                                                        </Box>
                                                        {isMobile && (
                                                            <Button sx={{ cursor: 'default', backgroundColor: '#EEEEEE', color: '#000', border: 'none', boxShadow: 'none', textTransform: 'none', borderRadius: '2px', width: '54px', height: '20px', fontSize: '12px', padding: '0', marginTop: '5px', '&:hover': { background: ' #EEEEEE' } }}>
                                                                {row.by}
                                                            </Button>
                                                        )}
                                                    </TableCell>
                                                    {!isMobile && (
                                                        <TableCell align="left" sx={{ borderBottom: 'none', padding: '5px' }}>
                                                            <Button sx={{ cursor: 'default', backgroundColor: '#EEEEEE', color: '#000', border: 'none', boxShadow: 'none', textTransform: 'none', borderRadius: '2px', width: '54px', height: '20px', fontSize: '12px', padding: '13px', '&:hover': { background: ' #EEEEEE' } , margin: { xs: '0 0  0 1rem' } }}>
                                                                {row.by}
                                                            </Button>
                                                        </TableCell>
                                                    )}
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </Grid>
                    )}
                </Grid>
            </Container>
            <Footer color='#000' gap='0 50% 0 10%' opacity='0.3' />
        </Box>
    );
}
