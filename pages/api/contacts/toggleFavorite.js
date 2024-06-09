// pages/api/contacts/toggleFavorite.js
import axiosInstance from "../axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const toggleFavorite = async (id) => {
    const { data } = await axiosInstance.patch(`/Contacts/toggle-favorite/${id}`);
    return data;
};

export const useToggleFavoriteMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: toggleFavorite,
        onSuccess: () => {
            queryClient.invalidateQueries("contacts");
        },
    });
};
