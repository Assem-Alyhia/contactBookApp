import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Checkbox, Card, CardContent, Grid, IconButton, useMediaQuery, Menu, MenuItem, Snackbar } from '@mui/material';
import Link from 'next/link';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ContentCopyIcon from '@mui/icons-material/FileCopyOutlined';

import Footer from '@/components/Utility/Footer';
import CustomPagination from '../../Utility/CustomPagination';
import { useContactsQuery } from '@/pages/api/contacts/getContacts';
import { useDeleteContactsMutation } from '@/pages/api/contacts/deleteContact';
import { useToggleFavoriteMutation } from '@/pages/api/contacts/toggleFavorite';
import { useRouter } from 'next/router';

const columns = [
    { id: 'id', label: 'ID' },
    { id: 'favorite', label: 'Favorite' },
    { id: 'image', label: 'Image' },
    { id: 'firstName', label: 'First Name' },
    { id: 'lastName', label: 'Last Name' },
    { id: 'email', label: 'Email' },
    { id: 'phoneNumber', label: 'Phone Number' },
    { id: 'status', label: 'Status' },
    { id: 'action', label: 'Action' },
];

export default function ContactsTable() {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [favorites, setFavorites] = useState({});
    const [anchorEl, setAnchorEl] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const router = useRouter();

    const { isLoading, data } = useContactsQuery();
    const { mutate: deleteContacts, isLoading: isDeleting } = useDeleteContactsMutation();
    const { mutate: toggleFavorite } = useToggleFavoriteMutation();

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleSelectAll = (event) => {
        if (event.target.checked) {
            const newSelectedContacts = data.map((contact) => contact.id);
            setSelectedContacts(newSelectedContacts);
        } else {
            setSelectedContacts([]);
        }
    };

    const handleSelectOne = (id) => {
        const selectedIndex = selectedContacts.indexOf(id);
        let newSelectedContacts = [];

        if (selectedIndex === -1) {
            newSelectedContacts = newSelectedContacts.concat(selectedContacts, id);
        } else if (selectedIndex === 0) {
            newSelectedContacts = newSelectedContacts.concat(selectedContacts.slice(1));
        } else if (selectedIndex === selectedContacts.length - 1) {
            newSelectedContacts = newSelectedContacts.concat(selectedContacts.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelectedContacts = newSelectedContacts.concat(
                selectedContacts.slice(0, selectedIndex),
                selectedContacts.slice(selectedIndex + 1)
            );
        }

        setSelectedContacts(newSelectedContacts);
    };

    const handleToggleFavorite = (id) => {
        toggleFavorite(id);
        setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const handleCopyEmail = (email) => {
        navigator.clipboard.writeText(email);
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const isSelected = (id) => selectedContacts.indexOf(id) !== -1;

    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    const handleExportClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleExportClose = () => {
        setAnchorEl(null);
    };

    const handleExportToPDF = () => {
        handleExportClose();
        router.push({
            pathname: '/contacts/contactBook',
            query: { data: JSON.stringify(data) }
        });
    };

    const handleExportToViaEmail = () => {
        handleExportClose();
        router.push({
            pathname: '/contacts/exportViaEmail',
            query: { data: JSON.stringify(data) }
        });
    };

    return (
        <Box sx={{ marginTop: '1rem' }}>
            <Container maxWidth={isMobile ? 'sm' : 'lg'}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Home / Contacts
                </Typography>
                <Box borderBottom={2} mb={2} sx={{ opacity: 0.5 }} />
                <Grid container spacing={2} mb={2}>
                    {isMobile ? (
                        <>
                            <Grid item xs={12} className={!isMobile ? 'hidden' : ''}>
                                <TextField
                                    fullWidth
                                    label="Search"
                                    value={search}
                                    onChange={handleSearchChange}
                                    variant="outlined"
                                    size="small"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Link href='/contacts/createNewContact'>
                                    <Button variant="contained" color="primary" fullWidth sx={{ marginBottom: 1 }}>
                                        Create New
                                    </Button>
                                </Link>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    variant="contained"
                                    color="error"
                                    fullWidth
                                    onClick={() => selectedContacts.forEach(contactId => deleteContacts(contactId))}
                                    disabled={isDeleting || selectedContacts.length === 0}
                                >
                                    {isDeleting ? 'Deleting...' : 'Delete'}
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button variant="contained" color="primary" fullWidth>
                                    Export to
                                </Button>
                            </Grid>
                        </>
                    ) : (
                        <Grid item xs={12} display="flex" justifyContent="space-between" alignItems="center">
                            <TextField
                                label="Search"
                                value={search}
                                onChange={handleSearchChange}
                                variant="outlined"
                                size="small"
                                sx={{ minHeight: '35px' }}
                            />
                            <Box>
                                <Button
                                    variant="contained"
                                    color="error"
                                    sx={{ mr: 1, height: '2.5em', borderRadius: '4px', textTransform: 'capitalize', fontSize: '14px' }}
                                    onClick={() => selectedContacts.forEach(contactId => deleteContacts(contactId))}
                                    disabled={isDeleting || selectedContacts.length === 0}
                                >
                                    {isDeleting ? 'Deleting...' : 'Delete'}
                                </Button>
                                <Button variant="contained" color="primary" sx={{ mr: 1, width: 142, height: '2.5em', borderRadius: '4px', textTransform: 'capitalize', fontSize: '14px' }} onClick={handleExportClick}>
                                    Export to
                                </Button>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleExportClose}
                                >
                                    <MenuItem onClick={handleExportToPDF}>PDF File</MenuItem>
                                    <MenuItem onClick={handleExportToViaEmail}>Send via Email</MenuItem>
                                </Menu>
                                <Link href='/users/sendEmail'>
                                    <Button variant="contained" color="primary" sx={{ mr: 1, width: 142, height: '2.5em', borderRadius: '4px', textTransform: 'capitalize', fontSize: '14px' }}>
                                        Send Email
                                    </Button>
                                </Link>
                                <Link href='/contacts/createNewContact'>
                                    <Button variant="contained" color="success" sx={{ mr: 1, width: 215, height: '2.5em', borderRadius: '4px', textTransform: 'capitalize', fontSize: '14px' }}>
                                        Create New
                                    </Button>
                                </Link>
                            </Box>
                        </Grid>
                    )}
                </Grid>
                {isLoading ? (
                    <Typography>Loading...</Typography>
                ) : (
                    <>
                        {isMobile ? (
                            <Grid container spacing={2}>
                                {data && data.length > 0 ? data.map((contact) => (
                                    <Grid item xs={12} key={contact.id}>
                                        <Card>
                                            <CardContent>
                                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                                    <Checkbox
                                                        checked={isSelected(contact.id)}
                                                        onChange={() => handleSelectOne(contact.id)}
                                                    />
                                                    <IconButton onClick={() => handleToggleFavorite(contact.id)}>
                                                        {favorites[contact.id] ? <StarIcon color="primary" /> : <StarBorderIcon />}
                                                    </IconButton>
                                                </Box>
                                                <Box borderBottom={1} mb={2} sx={{ opacity: 0.2 }} />
                                                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                                    <Typography variant="caption" color="textSecondary">#{contact.id}</Typography>
                                                    <Button
                                                        variant="outlined"
                                                        sx={{
                                                            backgroundColor: contact.status === 'Active' ? '#D4EDDA' : contact.status === 'Pending' ? '#FFF3CD' : contact.status === 'Locked' ? '#F8D7DA' : 'default',
                                                            height: '20px',
                                                            fontSize: '10px'
                                                        }}
                                                        color={contact.status === 'Active' ? 'success' : contact.status === 'Pending' ? 'warning' : 'error'}
                                                    >
                                                        {contact.status}
                                                    </Button>
                                                </Box>
                                                <Grid container spacing={2} alignItems="center">
                                                    <Grid item xs={12} display="flex" justifyContent="center">
                                                        <Avatar src={contact.image} alt={contact.firstName} sx={{ width: 56, height: 56 }} />
                                                    </Grid>
                                                    <Grid item xs={12} display="flex" justifyContent="center">
                                                        <Typography variant="h6">
                                                            {contact.firstName} {contact.lastName}
                                                        </Typography>
                                                    </Grid>
                                                    <Box borderBottom={1} mb={2} sx={{ opacity: 0.2, width: '100%' }} />
                                                    <Grid item xs={12} display="flex" justifyContent="center">
                                                        <Typography variant="body2" color="textSecondary">
                                                            {contact.email}
                                                            <IconButton onClick={() => handleCopyEmail(contact.email)} sx={{ padding: '5px', marginLeft: '5px' }}>
                                                                <ContentCopyIcon fontSize="small" />
                                                            </IconButton>
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} display="flex" justifyContent="center">
                                                        <Typography variant="body2" color="textSecondary">
                                                            {contact.phoneNumber}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                )) : (
                                    <Grid item xs={12}>
                                        <Typography align="center">No contacts found.</Typography>
                                    </Grid>
                                )}
                            </Grid>
                        ) : (
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    indeterminate={selectedContacts.length > 0 && selectedContacts.length < data.length}
                                                    checked={data.length > 0 && selectedContacts.length === data.length}
                                                    onChange={handleSelectAll}
                                                />
                                            </TableCell>
                                            {columns.map((column) => (
                                                <TableCell key={column.id}>
                                                    {column.label}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.map((contact, index) => {
                                            const isItemSelected = isSelected(contact.id);
                                            return (
                                                <TableRow
                                                    key={contact.id}
                                                    selected={isItemSelected}
                                                >
                                                    <TableCell padding="checkbox">
                                                        <Checkbox
                                                            checked={isItemSelected}
                                                            onChange={() => handleSelectOne(contact.id)}
                                                        />
                                                    </TableCell>
                                                    <TableCell>{index + 1}</TableCell>
                                                    <TableCell onClick={() => handleToggleFavorite(contact.id)}>
                                                        {favorites[contact.id] ? <StarIcon color="primary" /> : <StarBorderIcon />}
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
                                                    <TableCell>{contact.phoneNumber}</TableCell>
                                                    <TableCell>
                                                        <Button
                                                            variant="outlined"
                                                            sx={{
                                                                backgroundColor: contact.status === 'Active' ? '#D4EDDA' : contact.status === 'Pending' ? '#FFF3CD' : contact.status === 'Locked' ? '#F8D7DA' : 'default'
                                                            }}
                                                            color={contact.status === 'Active' ? 'success' : contact.status === 'Pending' ? 'warning' : contact.status === 'Locked' ? 'danger' : 'error'}
                                                        >
                                                            {contact.status}
                                                        </Button>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Link href={`/contacts/editContact?id=${contact.id}`} passHref>
                                                            <Button variant="contained">View</Button>
                                                        </Link>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                        <CustomPagination count={totalPages} page={page} onChange={handlePageChange} />
                    </>
                )}
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
