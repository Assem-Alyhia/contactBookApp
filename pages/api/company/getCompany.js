// pages/api/company/getCompanyProfile.js
import axiosInstance from "../axiosInstance";
import { useQuery } from "@tanstack/react-query";

const useCompanyProfileQuery = () => {
    return useQuery({
        queryFn: async () => (await axiosInstance.get("/Companies")).data,
        queryKey: ["companyProfile"],
    });
};

export { useCompanyProfileQuery };
