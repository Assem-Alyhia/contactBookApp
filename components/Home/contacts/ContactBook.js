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
    Avatar,
} from '@mui/material';
import Image from 'next/image';
import logoWB from '../../../public/images/logoWB.svg';
import Footer from '@/components/Utility/Footer';
import { useRouter } from 'next/router';

export default function ContactBook() {
    const router = useRouter();
    const { data } = router.query;
    const contacts = data ? JSON.parse(data) : [];

    return (
        <Box >
        <Container component="main" maxWidth="md"  sx={{ display: 'flex', flexDirection: 'column', padding: '0 !important' ,width :{xs:'100%' , md:'583px'} , margin:'auto'}}>
            <TableContainer component={Paper}  sx={{ boxShadow: '0px 3px 15px rgba(0,0,0,0.2)' , padding : '0 1rem' ,margin:'3rem 0 0 0'}}>
                <Box sx={{ margin: '0 auto', textAlign: 'center' }}>
                    <Image src={logoWB} alt="Contact Book Logo" width={200} height={130}/>
                </Box>
                <Table aria-label="contact book table" sx={{marginBottom :'5rem'}} >
                    <TableHead sx={{ backgroundColor: '#000' }}>
                        <TableRow>
                            <TableCell sx={{ borderBottom: '2px solid #000', fontWeight: 'bold', color: '#fff', fontSize: '12px', padding: '4px 8px' }}>ID</TableCell>
                            <TableCell sx={{ borderBottom: '2px solid #000', fontWeight: 'bold', color: '#fff', fontSize: '12px', padding: '4px 8px' }}>Image</TableCell>
                            <TableCell sx={{ borderBottom: '2px solid #000', fontWeight: 'bold', color: '#fff', fontSize: '12px', padding: '4px 8px' }}>First Name</TableCell>
                            <TableCell sx={{ borderBottom: '2px solid #000', fontWeight: 'bold', color: '#fff', fontSize: '12px', padding: '4px 8px' }}>Last Name</TableCell>
                            <TableCell sx={{ borderBottom: '2px solid #000', fontWeight: 'bold', color: '#fff', fontSize: '12px', padding: '4px 8px' }}>Email</TableCell>
                            <TableCell sx={{ borderBottom: '2px solid #000', fontWeight: 'bold', color: '#fff', fontSize: '12px', padding: '4px 8px' }}>Phone</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {contacts.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell sx={{ borderBottom: 'none', fontSize: '12px', padding: '4px 8px' }}>{row.id}</TableCell>
                                <TableCell sx={{ borderBottom: 'none', padding: '4px 8px' }}>
                                    <Avatar alt={row.firstName} src={row.image} sx={{width:'24px' , height:'24px' , fontSize:'10px' , margin:'auto'}}/>
                                </TableCell>
                                <TableCell sx={{ borderBottom: 'none', fontSize: '12px', padding: '4px 8px' }}>{row.firstName}</TableCell>
                                <TableCell sx={{ borderBottom: 'none', fontSize: '12px', padding: '4px 8px' }}>{row.lastName}</TableCell>
                                <TableCell sx={{ borderBottom: 'none', fontSize: '12px', padding: '4px 8px' }}>{row.email}</TableCell>
                                <TableCell sx={{ borderBottom: 'none', fontSize: '12px', padding: '4px 8px' }}>{row.phone}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Typography sx={{opacity : .4 , fontSize:'10px' , textAlign:'center' , fontWeight:600 , marginBottom:'2rem'}}>
                        Copyright © ITM Development | Contact Book | 2022
                </Typography>
            </TableContainer>
        </Container>
        <Footer  color = '#000' gap = '0 40% 0 10%' opacity='0.3' marginTop='15%' mdPosition='fixed'/>
        </Box>
    );
}
