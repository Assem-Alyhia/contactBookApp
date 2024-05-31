// sendResetCode.js
import axiosInstance from '../axiosInstance';
import { useMutation } from '@tanstack/react-query';

const sendResetCode = async ({ email }) => {
    try {
        const response = await axiosInstance.post('/forgot-password', { email }, {
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.status === 200 || response.status === 201) {
            return response.data;
        } else {
            throw new Error('Error sending reset code...');
        }
    } catch (error) {
        if (error.response && error.response.status === 400) {
            throw error.response.data;
        } else {
            throw error;
        }
    }
};

export const useSendResetCodeMutation = () => {
    return useMutation( {
        mutationFn:sendResetCode,
        onError: (error) => {
            console.error('Error sending reset code: ', error);
        },
    });
};
