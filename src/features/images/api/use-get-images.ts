import { apiClient } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetImages = () => {
  const query = useQuery({
    queryKey: ["images"],
    queryFn: async () => {
      const response = await apiClient.api.images.$get();

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const { data } = await response.json();
      return data;
    },
  });
  return query;
};
