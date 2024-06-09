// pages/api/users/setRegister.js
import axiosInstance from '../axiosInstance';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router';
import { loginUser } from '../setSignIn/setSignin'; // استيراد دالة تسجيل الدخول

const cookies = new Cookies();

const registerUser = async ({ firstName, lastName, email, phoneNumber, password, companyName, vatNumber, streetOne, streetTwo, city, state, zip, country }) => {
    const requestData = { firstName, lastName, email, phoneNumber, password, companyName, vatNumber, streetOne, streetTwo, city, state, zip, country };
    try {
        const response = await axiosInstance.post('/register', requestData, {
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.status === 200) {
            // تسجيل الدخول تلقائيًا بعد التسجيل الناجح
            const loginResponse = await loginUser({ email, password });
            cookies.set('authToken', loginResponse.token, { path: '/' });
            return loginResponse.token;
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
    return useMutation({
        mutationFn: registerUser,
        onSuccess: () => {
            router.push('/dashboard');
        },
        onError: (error) => {
            console.error('Registration error: ', error);
        },
    });
};
