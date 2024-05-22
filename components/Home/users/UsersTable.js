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
import CustomPagination from '../../Utility/CustomPagination'; // استيراد مكون الباجينيشن
import axiosInstance from '../../../pages/api/axiosInstance';
import Footer from '../../Utility/Footer';

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
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchUsersData();
    }, [page, search]);

    const fetchUsersData = async () => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get('/api/Users', {
                params: { page, search }
            });
            setUsers(response.data.users || []);
            setTotalPages(Math.ceil(response.data.total / 5)); // تحديث عدد الصفحات بناءً على البيانات
        } catch (error) {
            console.error('Error fetching data: ', error);
            setUsers([]);
            setTotalPages(1);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    return (
        <Box sx={{ marginTop: '2rem' }}>
            <Container maxWidth="lg">
                <Typography variant="h6" gutterBottom sx={{fontWeight: 'bold'}}>
                    Home / Users
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
                    <Box>
                        <Button variant="contained" color="error" sx={{ mr: 1 , textTransform: 'capitalize'}}>
                            Delete
                        </Button>
                        <Button variant="contained" color="primary" sx={{ mr: 1 , textTransform: 'capitalize'}}>
                            Invite New User
                        </Button>
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
                                    {users.length > 0 ? users.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell padding="checkbox">
                                                <Checkbox />
                                            </TableCell>
                                            <TableCell>{user.id}</TableCell>
                                            <TableCell>{user.firstName}</TableCell>
                                            <TableCell>{user.lastName}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.phone}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="contained"
                                                    color={user.status === 'Active' ? 'success' : user.status === 'Pending' ? 'warning' : 'error'}
                                                >
                                                    {user.status}
                                                </Button>
                                            </TableCell>
                                            <TableCell>
                                                <Button variant="contained">View</Button>
                                            </TableCell>
                                        </TableRow>
                                    )) : (
                                        <TableRow>
                                            <TableCell colSpan={8} align="center">
                                                No users found.
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
            <Footer />
        </Box>
    );
}
