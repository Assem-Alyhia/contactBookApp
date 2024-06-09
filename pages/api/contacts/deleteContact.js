import axiosInstance from "../axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteContacts = async (id) => {
    const data = await axiosInstance.delete(`/Contacts/${id}`);
    return data;
};

export const useDeleteContactsMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteContacts,
        onSuccess: () => {
            queryClient.invalidateQueries("contacts");
        },
    });
};
