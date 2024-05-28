import React, { useEffect, useState } from 'react';
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Checkbox,
} from '@mui/material';
import Link from 'next/link'
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Footer from '@/components/Utility/Footer';
import CustomPagination from '../../Utility/CustomPagination';
import axiosInstance from '../../../pages/api/axiosInstance'; // استيراد axiosInstance

const columns = [
    { id: 'id', label: 'ID' },
    { id: 'favorite', label: 'Favorite' },
    { id: 'image', label: 'Image' },
    { id: 'firstName', label: 'First Name' },
    { id: 'lastName', label: 'Last Name' },
    { id: 'email', label: 'Email' },
    { id: 'phone', label: 'Phone' },
    { id: 'status', label: 'Status' },
    { id: 'action', label: 'Action' },
];

export default function ContactsTable() {
    const [contacts, setContacts] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchContactsData();
    }, [page, search]);

    const fetchContactsData = async () => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get('/api/Companies', {
                params: { page, search }
            });
            setContacts(response.data.contacts || []);
            setTotalPages(response.data.totalPages || 1);
        } catch (error) {
            console.error('Error fetching data: ', error);
            setContacts([]);
            setTotalPages(1);
        }
        setIsLoading(false);
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    return (
        <Box sx={{ marginTop : '1rem'}}>
            <Container maxWidth="lg" >
                <Typography variant="h6" gutterBottom sx={{fontWeight: 'bold'}}>
                    Home / Contacts
                </Typography>
                <Box borderBottom={2} mb={2} sx={{ opacity: 0.5 }} />
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <TextField
                        label="Search"
                        value={search}
                        onChange={handleSearchChange}
                        variant="outlined"
                        size="small"
                        sx={{ minHeight: '35px' }}
                    />
                    <Box>
                        <Button variant="contained" color="error" sx={{ mr: 1, height: '2.5em',  borderRadius: '4px', textTransform: 'capitalize', fontSize: '14px', borderRadius: '4px' }}>
                            Delete
                        </Button>
                        <Button variant="contained" color="primary" sx={{ mr: 1,width:142, height: '2.5em',  borderRadius: '4px', textTransform: 'capitalize', fontSize: '14px', borderRadius: '4px' }}>
                            Export to
                        </Button>
                        <Link href='/users/sendEmail'>
                            <Button variant="contained" color="primary" sx={{ mr: 1,width:142, height: '2.5em',  borderRadius: '4px', textTransform: 'capitalize', fontSize: '14px', borderRadius: '4px' }}>
                                Send Email
                            </Button>
                        </Link>
                        <Link href='/contacts/createNewContact'>
                            <Button variant="contained" color="success" sx={{ mr: 1,width:215, height: '2.5em',  borderRadius: '4px', textTransform: 'capitalize', fontSize: '14px', borderRadius: '4px' }}>
                                Create New
                            </Button>
                        </Link>
                    </Box>
                </Box>
                {isLoading ? (
                    <Typography>Loading...</Typography>
                ) : (
                    <>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell padding="checkbox">
                                            <Checkbox />
                                        </TableCell>
                                        {columns.map((column) => (
                                            <TableCell key={column.id}>
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {contacts.length > 0 ? contacts.map((contact) => (
                                        <TableRow key={contact.id}>
                                            <TableCell padding="checkbox">
                                                <Checkbox />
                                            </TableCell>
                                            <TableCell>{contact.id}</TableCell>
                                            <TableCell>
                                                {contact.favorite ? <StarIcon /> : <StarBorderIcon />}
                                            </TableCell>
                                            <TableCell>
                                                <Avatar src={contact.image} alt={contact.firstName} />
                                            </TableCell>
                                            <TableCell>{contact.firstName}</TableCell>
                                            <TableCell>{contact.lastName}</TableCell>
                                            <TableCell>{contact.email}</TableCell>
                                            <TableCell>{contact.phone}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="contained"
                                                    color={contact.status === 'Active' ? 'success' : 'default'}
                                                >
                                                    {contact.status}
                                                </Button>
                                            </TableCell>
                                            <TableCell>
                                                <Button variant="contained">View</Button>
                                            </TableCell>
                                        </TableRow>
                                    )) : (
                                        <TableRow>
                                            <TableCell colSpan={10} align="center">
                                                No contacts found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <CustomPagination count={totalPages} page={page} onChange={handlePageChange} />
                    </>
                )}
            </Container>
            <Footer  color = '#000' gap = '0 50% 0 10%' opacity='0.3' />
        </Box>
    );
}
