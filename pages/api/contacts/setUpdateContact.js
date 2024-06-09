import axiosInstance from '../axiosInstance';
import { useMutation } from '@tanstack/react-query';

const updateContact = async ({ id, ...formData }) => {
    try {
        const response = await axiosInstance.put(`/Contacts/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        if (response.status === 200 || response.status === 204) {
            return response.data;
        } else {
            throw new Error('Error updating contact...');
        }
    } catch (error) {
        if (error.response && error.response.status === 400) {
            throw error.response.data;
        } else {
            throw error;
        }
    }
};

export const useUpdateContactMutation = () => {
    return useMutation({
        mutationFn: updateContact,
        onError: (error) => {
            console.error('Error updating contact: ', error);
        },
    });
};
