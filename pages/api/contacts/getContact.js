import axiosInstance from "../axiosInstance";
import { useQuery } from "@tanstack/react-query";

const useContactQuery = (id) => {
    return useQuery({
        queryKey: ["contact", id],
        queryFn: async () => {
            if (!id) {
                return null;
            }
            const response = await axiosInstance.get(`/contacts/${id}`);
            return response.data;
        },
        enabled: !!id, 
    });
};

export { useContactQuery };
