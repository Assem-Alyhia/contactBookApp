// src/components/CustomPagination.js
import React from 'react';
import { Box, Button, Pagination, PaginationItem } from '@mui/material';

export default function CustomPagination({ count, page, onChange }) {
    return (
        <Box display="flex" justifyContent="flex-end" alignItems="center" mt={2}>
            <Pagination
                count={count}
                page={page}
                onChange={onChange}
                variant="outlined"
                shape="rounded"
                renderItem={(item) => (
                    <PaginationItem
                        components={{
                            previous: () => <Button variant="text" sx={{ mr: 1, height: '2.5em',  borderRadius: '4px', textTransform: 'capitalize', fontSize: '14px', borderRadius: '4px' }}>Previous</Button>,
                            next: () => <Button variant="text" sx={{ mr: 1, height: '2.5em',  borderRadius: '4px', textTransform: 'capitalize', fontSize: '14px', borderRadius: '4px' }}>Next</Button>,
                        }}
                        {...item}
                        sx={{
                            color: '#1976d2',
                            '&:hover': {
                                backgroundColor: '#4E73DF',
                                color: '#fff',
                            },
                            '&.Mui-selected': {
                                backgroundColor: '#4E73DF',
                                color: '#fff',
                                '&:hover': {
                                    backgroundColor: '#4E73DF',
                                    color: '#fff',
                                },
                            },
                        }}
                    />
                )}
            />
        </Box>
    );
}
