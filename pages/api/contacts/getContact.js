import axiosInstance from '../axiosInstance';
import { useQuery } from '@tanstack/react-query';

const getContact = async (id) => {
    const { data } = await axiosInstance.get(`/Contacts/${id}`);
    return data;
};

const useContactQuery = (id) => {
    return useQuery({
        queryKey: ['contact', id],
        queryFn: () => getContact(id),
    });
};

export { useContactQuery };
