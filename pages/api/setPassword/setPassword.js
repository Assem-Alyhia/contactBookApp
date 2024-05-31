// setPassword.js
import axiosInstance from '../axiosInstance';
import { useMutation } from '@tanstack/react-query';

const setPassword = async ({ id, code, newPassword }) => {
    try {
        const response = await axiosInstance.post(`/set-password?id=${id}&code=${code}`, { password: newPassword }, {
            headers: { 'Content-Type': 'application/json' },
        });
        console.log('Response Data:', response.data);

        if (response.status === 200 || response.status === 201) {
            return response.data;
        } else {
            throw new Error('Error setting new password...');
        }
    } catch (error) {
        if (error.response && error.response.status === 400) {
            console.error('Response Error:', error.response.data);
            throw error.response.data;
        } else {
            throw error;
        }
    }
};

export const useSetPasswordMutation = () => {
    return useMutation({
        mutatinFn:setPassword,
        onError: (error) => {
            console.error('Error setting new password: ', error);
        },
    });
};
