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
import Footer from '@/components/Utility/Footer';
import Link from 'next/link'
import { useQuery} from '@tanstack/react-query';
import {useUsersQuery} from '../../../pages/api/users/getUsers';
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

const  {isLoading ,  data} = useUsersQuery();

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    return (
        <Box sx={{ marginTop: '1rem' }}>
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
                        <Button variant="contained" color="error"  sx={{ mr: 1, height: '2.5em',  borderRadius: '4px', textTransform: 'capitalize', fontSize: '14px', borderRadius: '4px' }}>
                            Delete
                        </Button>
                        <Link href='/users/inviteNewUser'>
                            <Button variant="contained" color="primary" sx={{ mr: 1, height: '2.5em',  borderRadius: '4px', textTransform: 'capitalize', fontSize: '14px', borderRadius: '4px' }}>
                                Invite New User
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
                                    {data && data.length > 0 ? data.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell padding="checkbox">
                                                <Checkbox />
                                            </TableCell>
                                            <TableCell>{user.id}</TableCell>
                                            <TableCell>{user.firstName}</TableCell>
                                            <TableCell>{user.lastName}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.phoneNumber}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="contained"
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
            <Footer  color = '#000' gap = '0 50% 0 10%' opacity='0.3' />
        </Box>
    );
}
