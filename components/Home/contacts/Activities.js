import * as React from 'react';
import {
    Container,
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    CircularProgress,
} from '@mui/material';
import dynamic from 'next/dynamic';
import Footer from '@/components/Utility/Footer';
import { useActivitiesQuery } from '@/pages/api/contacts/getActivitie';

const CustomPagination = dynamic(() => import('../../Utility/CustomPagination'), { ssr: false });

export default function Activities() {
    const { data, isLoading, error } = useActivitiesQuery();

    if (isLoading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">Error fetching activities</Typography>;
    }

    return (
        <Box>
            <Container component="main" maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', padding: '0 !important'}}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', marginTop: '1rem' }}>
                    Home / Activities
                </Typography>
                <Box borderBottom={2} mb={2} sx={{ opacity: 0.2, width: '100%' }} />
                <Box sx={{ backgroundColor: '#fff', borderRadius: '5px', boxShadow: '0px 3px 15px #00000012', width: '100%', padding: '1rem' }}>
                    <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
                        <Table aria-label="activities table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ borderBottom: '2px solid #000', fontWeight: 'bold' }}>Contact</TableCell>
                                    <TableCell align="left" sx={{ borderBottom: '2px solid #000', fontWeight: 'bold' }}>Date</TableCell>
                                    <TableCell align="left" sx={{ borderBottom: '2px solid #000', fontWeight: 'bold' }}>Action</TableCell>
                                    <TableCell align="left" sx={{ borderBottom: '2px solid #000', fontWeight: 'bold' }}>By</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data && data.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell component="th" scope="row" sx={{ borderBottom: 'none', width: '60%' }}>
                                            {row.contact}
                                        </TableCell>
                                        <TableCell align="left" sx={{ borderBottom: 'none', opacity: 0.4, fontSize: '12px' }}>
                                            {new Date(row.timestamp).toLocaleString()}
                                        </TableCell>
                                        <TableCell align="left" sx={{ borderBottom: 'none', display: 'flex', alignItems: 'center', opacity: 0.4, fontSize: '12px' }}>
                                            <span style={{ height: '7px', width: '7px', opacity: 1, borderRadius: '50%', backgroundColor: row.action === 'Add' ? 'green' : row.action === 'Delete' ? 'red' : row.action === 'Update' ? 'orange' : row.action === 'Access' ? 'blue' : 'grey', marginRight: '0.5rem' }}></span>
                                            {row.action}
                                        </TableCell>
                                        <TableCell align="left" sx={{ borderBottom: 'none' }}>
                                            <Button variant="contained" sx={{ backgroundColor: '#E0E0E0', color: '#000', border: 'none', boxShadow: 'none', textTransform: 'none', borderRadius: '2px', width: '54px', height: '20px', fontSize: '12px', padding: '13px', '&:hover': { background: '#e8e8e8' } }}>
                                                {row.by}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
                <CustomPagination />
            </Container>
            <Footer color='#000' gap='0 50% 0 10%' opacity='0.3' />
        </Box>
    );
}
