import axiosInstance from "../axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const addUser = async (user) => {
    const data = await axiosInstance.post("/Users", user);
    return data;
};

export const useAddUserMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:addUser,
        onSuccess: () => {
            queryClient.invalidateQueries("users");
        },
    });
};
