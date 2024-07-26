import { apiClient } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

export type ResponTypeProject = InferResponseType<typeof apiClient.api.projects[":id"]["$get"], 200>;

export const useGetProject = (id: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["project", { id }],
    queryFn: async () => {
      const response = await apiClient.api.projects[":id"].$get({
        param: {
          id,
        },
      });

      if(!response.ok){
        throw new Error("Something went wrong!");
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
};
