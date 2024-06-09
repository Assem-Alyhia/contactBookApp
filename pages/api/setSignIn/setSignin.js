// pages/api/users/setSignin.js
import axiosInstance from '../axiosInstance';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router';

const cookies = new Cookies();

export const loginUser = async ({ email, password }) => {
    const requestData = { email, password };
    const response = await axiosInstance.post('/login', requestData, {
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem('authToken', token); // حفظ التوكن في localStorage
        cookies.set('authToken', token, { path: '/' });
        return { token };
    } else {
        throw new Error('Error in Login...');
    }
};

export const useLoginUserMutation = () => {
    const router = useRouter();
    return useMutation({
        mutationFn: loginUser,
        onSuccess: () => {
            router.push('/dashboard');
        },
        onError: (error) => {
            console.error('Login error: ', error);
        },
    });
};
