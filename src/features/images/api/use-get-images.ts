import { apiClient } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";
import { ActiveToolTypes } from '@/lib/types';

export const useGetImages = ({
  activeTool,
} : {
  activeTool? : ActiveToolTypes | undefined,
}) => {
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
    enabled: activeTool == 'image',
  });
  return query;
};
