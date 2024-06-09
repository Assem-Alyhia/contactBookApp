import axiosInstance from '../axiosInstance';
import { useMutation } from '@tanstack/react-query';

const sendEmail = async ({ to, cc, bcc, subject, body }) => {
    try {
        const response = await axiosInstance.post('/Contacts/send-email', {
            to,
            cc,
            bcc,
            subject,
            body
        }, {
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Error sending email...');
        }
    } catch (error) {
        if (error.response && error.response.status === 400) {
            throw error.response.data;
        } else {
            throw error;
        }
    }
};


export const useSendEmailMutation = () => {
    return useMutation({
        mutationFn: sendEmail,
        onError: (error) => {
            console.error('Error sending email: ', error);
        },
    });
};
