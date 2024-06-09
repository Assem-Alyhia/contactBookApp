// pages/api/users/getProfile.js
import axiosInstance from '../axiosInstance';
import { useQuery } from '@tanstack/react-query';

const getProfile = async () => {
    const response = await axiosInstance.get('/Users/current-user'); 
    return response.data;
};

const useProfileQuery = () => {
    return useQuery({
        queryKey: ['profile'],
        queryFn: getProfile,
    });
};

export { useProfileQuery };
