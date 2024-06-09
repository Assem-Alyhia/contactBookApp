// pages/api/contacts/addContact.js
import axiosInstance from "../axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const addContact = async (contact) => {
    const formData = new FormData();
    for (const key in contact) {
        formData.append(key, contact[key]);
    }

    const { data } = await axiosInstance.post("/Contacts", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return data;
};

export const useAddContactMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addContact,
        onSuccess: () => {
            queryClient.invalidateQueries("contacts");
        },
    });
};
