import React, { useState } from 'react';
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
    Checkbox,
    Card,
    CardContent,
    Grid,
    IconButton,
    useMediaQuery
} from '@mui/material';
import Link from 'next/link';
import CustomPagination from '../../Utility/CustomPagination';
import Footer from '@/components/Utility/Footer';
import { useUsersQuery } from '../../../pages/api/users/getUsers';
import { useDeleteUserMutation } from '@/pages/api/users/deleteUsers';

const columns = [
    { id: 'id', label: 'ID' },
    { id: 'firstName', label: 'First Name' },
    { id: 'lastName', label: 'Last Name' },
    { id: 'email', label: 'Email' },
    { id: 'phone', label: 'Phone' },
    { id: 'status', label: 'Status' },
    { id: 'action', label: 'Action' },
];

export default function UsersTable() {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    const { isLoading, data, refetch } = useUsersQuery();
    const { mutate: deleteUser, isLoading: isDeleting } = useDeleteUserMutation();

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleSelectAll = (event) => {
        if (event.target.checked) {
            const newSelectedUsers = data.map((user) => user.id);
            setSelectedUsers(newSelectedUsers);
        } else {
            setSelectedUsers([]);
        }
    };

    const handleSelectOne = (id) => {
        const selectedIndex = selectedUsers.indexOf(id);
        let newSelectedUsers = [];

        if (selectedIndex === -1) {
            newSelectedUsers = newSelectedUsers.concat(selectedUsers, id);
        } else if (selectedIndex === 0) {
            newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(1));
        } else if (selectedIndex === selectedUsers.length - 1) {
            newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelectedUsers = newSelectedUsers.concat(
                selectedUsers.slice(0, selectedIndex),
                selectedUsers.slice(selectedIndex + 1)
            );
        }

        setSelectedUsers(newSelectedUsers);
    };

    const isSelected = (id) => selectedUsers.indexOf(id) !== -1;

    const handleDelete = () => {
        selectedUsers.forEach((id) => {
            deleteUser(id, {
                onSuccess: () => {
                    console.log(`User with id ${id} deleted successfully`);
                    setSelectedUsers((prev) => prev.filter((userId) => userId !== id));
                    refetch();
                },
                onError: (error) => {
                    console.error('Error deleting user: ', error);
                },
            });
        });
    };

    return (
        <Box sx={{ marginTop: '1rem' }}>
            <Container maxWidth={isMobile ? 'sm' : 'lg'}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Home / Users
                </Typography>
                <Box borderBottom={2} mb={2} sx={{ opacity: 0.2 }} />
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
                                <Link href='/users/inviteNewUser'>
                                    <Button variant="contained" color="primary" fullWidth sx={{ marginBottom: 1 }}>
                                        Invite New User
                                    </Button>
                                </Link>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    color="error"
                                    fullWidth
                                    onClick={handleDelete}
                                    disabled={isDeleting || selectedUsers.length === 0}
                                >
                                    {isDeleting ? 'Deleting...' : 'Delete'}
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
                                    onClick={handleDelete}
                                    disabled={isDeleting || selectedUsers.length === 0}
                                >
                                    {isDeleting ? 'Deleting...' : 'Delete'}
                                </Button>
                                <Link href='/users/inviteNewUser'>
                                    <Button variant="contained" color="primary" sx={{ height: '2.5em', borderRadius: '4px', textTransform: 'capitalize', fontSize: '14px' }}>
                                        Invite New User
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
                                {data && data.length > 0 ? data.map((user) => (
                                    <Grid item xs={12} key={user.id}>
                                        <Card>
                                            <CardContent>
                                                <Grid container spacing={2} alignItems="center">
                                                    <Grid item xs={12} display="flex" justifyContent="space-between">
                                                        <Checkbox
                                                            checked={isSelected(user.id)}
                                                            onChange={() => handleSelectOne(user.id)}
                                                        />
                                                        <Typography variant="body2" color="textSecondary">
                                                            ID: {user.id}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} display="flex" justifyContent="center">
                                                        <Typography variant="h6">
                                                            {user.firstName} {user.lastName}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} display="flex" justifyContent="center">
                                                        <Typography variant="body2" color="textSecondary">
                                                            {user.email}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} display="flex" justifyContent="center">
                                                        <Typography variant="body2" color="textSecondary">
                                                            {user.phone}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} display="flex" justifyContent="space-between">
                                                        <Button
                                                                sx={{
                                                                backgroundColor: user.status === 'Active' ? '#D4EDDA' : user.status === 'Pending' ? '#FFF3CD' : user.status === 'Locked' ? '#F8D7DA' : 'default'
                                                            }}
                                                            variant="outlined"
                                                            color={user.status === 'Active' ? 'success' : user.status === 'Pending' ? 'warning' : user.status === 'Locked' ? 'danger' : 'error'}
                                                        >
                                                            {user.status}
                                                        </Button>
                                                        <Link href={`/users/editUser?id=${user.id}`} passHref>
                                                            <Button variant="contained">View</Button>
                                                        </Link>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                )) : (
                                    <Grid item xs={12}>
                                        <Typography align="center">No users found.</Typography>
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
                                                    indeterminate={selectedUsers.length > 0 && selectedUsers.length < data.length}
                                                    checked={data.length > 0 && selectedUsers.length === data.length}
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
                                        {data && data.length > 0 ? data.map((user, index) => {
                                            const isItemSelected = isSelected(user.id);
                                            return (
                                                <TableRow
                                                    key={user.id}
                                                    selected={isItemSelected}
                                                >
                                                    <TableCell padding="checkbox">
                                                        <Checkbox
                                                            checked={isItemSelected}
                                                            onChange={() => handleSelectOne(user.id)}
                                                        />
                                                    </TableCell>
                                                    <TableCell>{index + 1}</TableCell>
                                                    <TableCell>{user.firstName}</TableCell>
                                                    <TableCell>{user.lastName}</TableCell>
                                                    <TableCell>{user.email}</TableCell>
                                                    <TableCell>{user.phoneNumber}</TableCell>
                                                    <TableCell>
                                                        <Button
                                                            variant="outlined"
                                                            sx={{
                                                                backgroundColor: user.status === 'Active' ? '#D4EDDA' : user.status === 'Pending' ? '#FFF3CD' : user.status === 'Locked' ? '#F8D7DA' : 'default'
                                                            }}
                                                            color={user.status === 'Active' ? 'success' : user.status === 'Pending' ? 'warning' : 'error'}
                                                        >
                                                            {user.status}
                                                        </Button>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Link href={`/users/editUser?id=${user.id}`} passHref>
                                                            <Button variant="contained">View</Button>
                                                        </Link>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        }) : (
                                            <TableRow>
                                                <TableCell colSpan={8} align="center">
                                                    No users found.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                        <CustomPagination count={totalPages} page={page} onChange={handlePageChange} />
                    </>
                )}
            </Container>
            <Footer color='#000' gap='0 50% 0 10%' opacity='0.3' />
        </Box>
    );
}
