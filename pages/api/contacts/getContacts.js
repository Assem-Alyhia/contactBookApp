import axiosInstance from "../axiosInstance";
import { useQuery } from "@tanstack/react-query";
const useContactsQuery = () => {
    return useQuery({
        queryKey: ["contact"],
        queryFn: async () => (await axiosInstance.get("contacts")).data,
    });
};
export { useContactsQuery };
