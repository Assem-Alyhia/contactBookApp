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
    useMediaQuery,
    Snackbar,
    Alert
} from '@mui/material';
import Link from 'next/link';
import CustomPagination from '../../Utility/CustomPagination';
import Footer from '@/components/Utility/Footer';
import { useUsersQuery } from '../../../pages/api/users/getUsers';
import { useDeleteUsersMutation } from '@/pages/api/users/deleteUsers';
import { useProfileQuery } from '@/pages/api/users/getProfile';
import getPermissions from '@/components/Utility/rolesPermissions';

const columns = [
    { id: 'id', label: 'id' },
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
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    const { isLoading, data, refetch } = useUsersQuery();
    const { mutate: deleteUsers, isLoading: isDeleting } = useDeleteUsersMutation();
    const { data: userProfile, isLoading: isProfileLoading } = useProfileQuery();

    const role = userProfile?.role || 'User';
    const permissions = getPermissions(role);
    const userEmail = userProfile?.email;

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
        if (role === 'Admin') {
            const cannotDeleteAdmin = selectedUsers.some((userId) => {
                const user = data.find((user) => user.id === userId);
                return user.role === 'Admin';
            });

            if (cannotDeleteAdmin) {
                setSnackbarMessage('Admins cannot delete other admins.');
                setSnackbarOpen(true);
                return;
            }
        }

        deleteUsers(selectedUsers, {
            onSuccess: () => {
                console.log('Users deleted successfully');
                setSelectedUsers([]);
                refetch();
            },
            onError: (error) => {
                console.error('Error deleting users: ', error);
            },
        });
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
        setSnackbarMessage('');
    };

    const filteredData = data?.filter(user => user.email !== userEmail);

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
                            {permissions.canInviteUsers && (
                                <Grid item xs={12}>
                                    <Link href='/users/inviteNewUser'>
                                        <Button variant="contained" color="primary" fullWidth sx={{ marginBottom: 1 }}>
                                            Invite New User
                                        </Button>
                                    </Link>
                                </Grid>
                            )}
                            {permissions.canDeleteUsers && (
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
                            )}
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
                                {permissions.canDeleteUsers && (
                                    <Button
                                        variant="contained"
                                        color="error"
                                        sx={{ mr: 1, height: '2.5em', borderRadius: '4px', textTransform: 'capitalize', fontSize: '14px' }}
                                        onClick={handleDelete}
                                        disabled={isDeleting || selectedUsers.length === 0}
                                    >
                                        {isDeleting ? 'Deleting...' : 'Delete'}
                                    </Button>
                                )}
                                {permissions.canInviteUsers && (
                                    <Link href='/users/inviteNewUser'>
                                        <Button variant="contained" color="primary" sx={{ height: '2.5em', borderRadius: '4px', textTransform: 'capitalize', fontSize: '14px' }}>
                                            Invite New User
                                        </Button>
                                    </Link>
                                )}
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
                                {filteredData && filteredData.length > 0 ? filteredData.map((user, index) => (
                                    <Grid item xs={12} key={user.id}>
                                        <Card>
                                            <CardContent>
                                                <Grid container spacing={2} alignItems="center">
                                                    <Grid item xs={12} display="flex" alignItems="center">
                                                        <Checkbox
                                                            checked={isSelected(user.id)}
                                                            onChange={() => handleSelectOne(user.id)}
                                                        />
                                                        <Typography variant="body2" color="textSecondary">
                                                            {index + 1}
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
                                                            color={user.status === 'Active' ? 'success' : user.status === 'Pending' ? 'warning' : user.status === 'Locked' ? 'error' : 'default'}
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
                                        <TableRow sx={{borderBottom: 'solid 1px #e0e0e0'}}>
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    indeterminate={selectedUsers.length > 0 && selectedUsers.length < filteredData.length}
                                                    checked={filteredData.length > 0 && selectedUsers.length === filteredData.length}
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
                                        {filteredData && filteredData.length > 0 ? filteredData.map((user, index) => {
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
                                                                width:'93px',
                                                                fontSize:'14px',
                                                                textTransform: 'capitalize',
                                                                backgroundColor: user.status === 'Active' ? '#D4EDDA' : user.status === 'Pending' ? '#FFF3CD' : user.status === 'Locked' ? '#F8D7DA' : 'default'
                                                            }}
                                                            color={user.status === 'Active' ? 'success' : user.status === 'Pending' ? 'warning' : user.status === 'Locked' ? 'error' : 'default'}
                                                        >
                                                            {user.status}
                                                        </Button>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Link href={`/users/editUser?id=${user.id}`} passHref>
                                                            <Button variant="contained" sx={{textTransform: 'capitalize',}}>View</Button>
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
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}
