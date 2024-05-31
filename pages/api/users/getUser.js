import axiosInstance from "../axiosInstance";
import { useQuery } from "@tanstack/react-query";

const useUserQuery = (id) => {
    return useQuery({
        queryKey: ["user", id],
        queryFn: async () => (await axiosInstance.get(`/users/${id}`)).data,
    });
};

export { useUserQuery };