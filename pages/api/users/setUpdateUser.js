// pages/api/users/updateUser.js
import axiosInstance from '../axiosInstance';
import { useMutation } from '@tanstack/react-query';

const updateUser = async ({ id, firstName, lastName, email, phoneNumber, role, status }) => {
    try {
        const response = await axiosInstance.put(`/Users/${id}`, {
            firstName,
            lastName,
            email,
            phoneNumber,
            role,
            status
        }, {
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.status === 200 || response.status === 204) {
            return response.data;
        } else {
            throw new Error('Error updating user...');
        }
    } catch (error) {
        if (error.response && error.response.status === 400) {
            throw error.response.data;
        } else {
            throw error;
        }
    }
};

export const useUpdateUserMutation = () => {
    return useMutation( {
        mutationFn:updateUser,
        onError: (error) => {
            console.error('Error updating user: ', error);
        },
    });
};
