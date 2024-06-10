import axiosInstance from '../axiosInstance';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';

const resetPassword = async ({ id, code, password }) => {
    try {
        console.log(id ,code)
        const response = await axiosInstance.post(`/reset-password?id=${id}&code=${code}`, { password }, {
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

export const useResetPasswordMutation = () => {
    const router = useRouter();
    const { id, code } = router.query;

    return useMutation({
        mutationFn: (password) => resetPassword({ id, code, password }),
        onError: (error) => {
            console.error('Error setting new password: ', error);
        },
    });
};
