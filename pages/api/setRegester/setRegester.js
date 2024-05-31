// pages/api/users/setRegister.js
import axiosInstance from '../axiosInstance';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router';

const cookies = new Cookies();

const registerUser = async ({ firstName, lastName, email, password, companyName, vatNumber, streetOne, streetTwo, city, state, zip, country, phoneNumber }) => {
    const requestData = { firstName, lastName, email, password, companyName, vatNumber, streetOne, streetTwo, city, state, zip, country, phoneNumber };
    try {
        const response = await axiosInstance.post('/register', requestData, {
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.status === 200) {
            const token = response.data.token;
            cookies.set('authToken', token, { path: '/dashboard' });
            return token;
        } else {
            throw new Error('Error in Registration...');
        }
    } catch (error) {
        if (error.response && error.response.status === 400) {
            throw error.response.data;
        } else {
            throw error;
        }
    }
};

export const useRegisterUserMutation = () => {
    const router = useRouter();
    return useMutation( {
        mutationFn:registerUser,
        onSuccess: () => {
            router.push('/dashboard');
        },
        onError: (error) => {
            console.error('Registration error: ', error);
        },
    });
};
