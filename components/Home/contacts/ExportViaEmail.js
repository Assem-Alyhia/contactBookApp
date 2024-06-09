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
    Alert,
    IconButton,
    Snackbar
} from '@mui/material';
import Link from 'next/link';
import CustomPagination from '../../Utility/CustomPagination';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ContentCopyIcon from '@mui/icons-material/FileCopyOutlined';
import Footer from '@/components/Utility/Footer';
import { useRouter } from 'next/router';

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

export default function ExportViaEmail() {
    const router = useRouter();
    const { data } = router.query;
    const contacts = data ? JSON.parse(data) : [];
    const [search, setSearch] = useState('');
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState('');
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(1);
    const [isClient, setIsClient] = useState(false); 
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    useEffect(() => {
        setIsClient(true); 
    }, []);

    useEffect(() => {
        if (contacts) {
            setCount(Math.ceil(contacts.length / 5));
        }
    }, [contacts]);

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSendEmail = () => {
        setEmailSent(true);
        setTimeout(() => setEmailSent(false), 3000);
    };

    const handlePageChange = (event, value) => {
        setPage(value); 
    };

    const handleCopyEmail = (email) => {
        navigator.clipboard.writeText(email);
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    if (!isClient) {
        return <div>Loading...</div>;
    }

    return (
        <Box sx={{ marginTop: '1rem' }}>
            <Container maxWidth="lg">
                <Typography variant="h6" gutterBottom sx={{fontWeight: 'bold'}}>
                    Home / Contacts / Export via email
                </Typography>
                <Box borderBottom={2} mb={2} sx={{ opacity: 0.2 }} />
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <TextField
                        label="Search"
                        value={search}
                        onChange={handleSearchChange}
                        variant="outlined"
                        size="small"
                        sx={{ minHeight: '35px' }}
                    />
                    <Box display="flex" alignItems="center">
                        {emailSent && <Alert severity="success" sx={{ mr: 2 }}>Email sent successfully</Alert>}
                        <TextField
                            label="name@example.com"
                            value={email}
                            onChange={handleEmailChange}
                            variant="outlined"
                            size="small"
                            sx={{ mr: 2, minHeight: '35px' }}
                        />
                        <Button variant="contained" color="primary" onClick={handleSendEmail} sx={{ mr: 1, width:142, height: '2.5em',  borderRadius: '4px', textTransform: 'capitalize', fontSize: '14px' }}>
                            Send
                        </Button>
                    </Box>
                </Box>
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
                            {contacts.slice((page - 1) * 5, page * 5).map((contact) => (
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
                                    <TableCell>
                                        {contact.email}
                                        <IconButton onClick={() => handleCopyEmail(contact.email)} sx={{ padding: '5px', marginLeft: '5px' }}>
                                            <ContentCopyIcon fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>{contact.phone}</TableCell>
                                    <TableCell>
                                        <Button
                                            sx={{ mr: 1, width:93, height: '2.5em',  borderRadius: '4px', textTransform: 'capitalize', fontSize: '14px' }}
                                            variant="contained"
                                            color={contact.status === 'Active' ? 'success' : 'default'}
                                        >
                                            {contact.status}
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Link href="/contacts/editContact" >
                                            <Button variant="contained">View</Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <CustomPagination count={count} page={page} onChange={handlePageChange} />
            </Container>
            <Footer color='#000' gap='0 50% 0 10%' opacity='0.3' />
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                message="Email copied to clipboard"
            />
        </Box>
    );
}
