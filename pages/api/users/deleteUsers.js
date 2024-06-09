// pages/api/users/deleteUserMutation.js
import axiosInstance from "../axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteUser = async (id) => {
    const response = await axiosInstance.delete(`/Users/${id}`);
    return response.data;
};

export const useDeleteUserMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries("users");
        },
    });
};
