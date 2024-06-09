// pages/api/contacts/getActivities.js
import axiosInstance from "../axiosInstance";
import { useQuery } from "@tanstack/react-query";

const useActivitiesQuery = () => {
    return useQuery({
        queryKey: ["logs"],
        queryFn: async () => (await axiosInstance.get("/Logs")).data,
    });
};

export { useActivitiesQuery };
