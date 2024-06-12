// pages/api/users/deleteUserMutation.js
import axiosInstance from "../axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteUsers = async (ids) => {
    const response = await axiosInstance.delete(`/Users`, { data: ids });
    return response.data;
};

export const useDeleteUsersMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteUsers,
        onSuccess: () => {
            queryClient.invalidateQueries("users");
        },
    });
};
