import axiosInstance from "../axiosInstance";
import { useMutation } from "@tanstack/react-query";

const updateCompany = async (formData) => {
    try {
        const response = await axiosInstance.put("/Companies", formData, {
        headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 400) {
        throw error.response.data;
        } else {
        throw error;
        }
    }
    };

    export const useUpdateCompanyMutation = () => {
    return useMutation({
        mutationFn: updateCompany,
        onError: (error) => {
        console.error('Error updating company profile: ', error);
        },
    });
};
