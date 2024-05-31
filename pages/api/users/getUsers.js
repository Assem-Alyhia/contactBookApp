import axiosInstance from "../axiosInstance";
import { useQuery } from "@tanstack/react-query";
const useUsersQuery = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => (await axiosInstance.get("users")).data,
  });
};
export { useUsersQuery };
