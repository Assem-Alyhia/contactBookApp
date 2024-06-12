// pages/api/contacts/deleteContactsMutation.js
import axiosInstance from "../axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteContacts = async (ids) => {
    const data = await axiosInstance.delete(`/Contacts`, { data: ids });
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
