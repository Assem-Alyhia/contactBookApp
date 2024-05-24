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
    TableHead,
    TableRow,
    Button
} from '@mui/material';
import { ArrowUpward, ArrowDownward, Email, Close } from '@mui/icons-material';
import dynamic from 'next/dynamic';
import Footer from '@/components/Utility/Footer';

const CustomPagination = dynamic(() => import('../../Utility/CustomPagination'), { ssr: false });

function createData(contact, date, action, by) {
    return { contact, date, action, by };
}

const rows = [
    createData('Adam Smith', '01 Jan 2022', 'Add', 'Noor'),
    createData('Ronald Markson', '01 Jan 2022', 'Delete', 'David'),
    createData('David Walso', '01 Jan 2022', 'Update', 'Chris'),
    createData('Adam Waldo', '01 Jan 2022', 'Access', 'Noor'),
    createData('John Bullak', '01 Jan 2022', 'Email sent', 'Noor'),
    createData('Matt Adams', '01 Jan 2022', 'Add', 'Noor'),
];

export default function Dashboard() {
    return (
        <Box>
        <Container component="main" maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', padding: '0 !important' }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', marginTop: '1rem' }}>
                Statistical Dashboard
            </Typography>
            <Box borderBottom={2} mb={2}  sx={{ opacity: 0.2, width: '100%' }} />
            <Grid container spacing={5} mt={1}>
                <Grid item xs={12} md={6}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} md={6}>
                            <Paper sx={{ padding: '1.7rem', textAlign: 'start', backgroundColor: '#00AC69', color: '#fff', position: 'relative' }}>
                                <Typography variant="h4">101</Typography>
                                <Typography>Active</Typography>
                                <Typography variant="caption" sx={{display: 'flex'}}><ArrowUpward sx={{width:'10px' , marginRight : '5px'    }}/> 3% from last month</Typography>
                                <ArrowUpward sx={{ position: 'absolute', top: '10px', right: '10px', fontSize: '40px', opacity: 0.2 }} />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <Paper sx={{ padding: '1.7rem', textAlign: 'start', backgroundColor: '#FC766A', color: '#fff', position: 'relative' }}>
                                <Typography variant="h4">101</Typography>
                                <Typography>Inactive</Typography>
                                <Typography variant="caption"sx={{display: 'flex'}}><ArrowUpward sx={{width:'10px' , marginRight : '5px' }}/> 3% from last month</Typography>
                                <ArrowDownward sx={{ position: 'absolute', top: '10px', right: '10px', fontSize: '40px', opacity: 0.2 }} />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <Paper sx={{ padding: '1.7rem', textAlign: 'start', backgroundColor: '#2C3E50', color: '#fff', position: 'relative' }}>
                                <Typography variant="h4">101</Typography>
                                <Typography>With email</Typography>
                                <Typography variant="caption"sx={{display: 'flex'}}><ArrowUpward sx={{width:'10px' , marginRight : '5px' }}/> 3% from last month</Typography>
                                <Email sx={{ position: 'absolute', top: '10px', right: '10px', fontSize: '40px', opacity: 0.2 }} />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <Paper sx={{ padding: '1.7rem', textAlign: 'start', backgroundColor: '#5B84B1', color: '#fff', position: 'relative' }}>
                                <Typography variant="h4">101</Typography>
                                <Typography>Without email</Typography>
                                <Typography variant="caption"sx={{display: 'flex'}}><ArrowUpward sx={{width:'10px'  , marginRight : '5px'}}/> 3% from last month</Typography>
                                <Close sx={{ position: 'absolute', top: '10px', right: '10px', fontSize: '40px', opacity: 0.2 }} />
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ backgroundColor: '#fff', borderRadius: '5px', boxShadow: '0px 3px 15px #00000012' }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '1rem' ,background:'#E0E0E0' ,padding:'.8rem' ,borderRadius: '3px' }}>Latest activities</Typography>
                        <TableContainer component={Paper} sx={{ boxShadow: 'none' , padding:'0 2rem 1rem'}}>
                            <Table aria-label="activities table" >
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow key={row.contact}>
                                            <TableCell component="th" scope="row" sx={{ borderBottom: 'none' , fontSize: '14px' , padding:'5px' , width:'60%'}}>
                                                {row.contact}
                                            </TableCell>
                                            <TableCell align="left" sx={{ borderBottom: 'none', opacity: 0.4, fontSize: '10px' , padding:'5px'}}>{row.date}</TableCell>
                                            <TableCell align="left" sx={{ borderBottom: 'none', display: 'flex', alignItems: 'center', opacity: 0.4, fontSize: '10px', padding:'5px' }}>
                                                <span style={{ height: '7px', width: '7px', opacity: 1 , borderRadius: '50%', backgroundColor: row.action === 'Add' ? 'green' : row.action === 'Delete' ? 'red' : row.action === 'Update' ? 'orange' : row.action === 'Access' ? 'blue' : 'grey', marginRight: '0.5rem' }}></span>
                                                {row.action}
                                            </TableCell>
                                            <TableCell align="left" sx={{ borderBottom: 'none' , padding:'5px'}}>
                                                <Button variant="contained" sx={{ backgroundColor: '#E0E0E0', color: '#000', textTransform: 'none', borderRadius: '2px', width: '54px',border:'none' , boxShadow:'none', height: '20px', fontSize: '12px', padding: '0 5px', '&:hover': { background: '#e8e8e8' } }}>{row.by}</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Grid>
            </Grid>
        </Container>
        <Footer  color = '#000' gap = '0 50% 0 10%' opacity='0.3' />
        </Box>
    );
}