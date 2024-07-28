import { apiClient } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetCvJson = () => {
   const query = useQuery({
      queryKey: ["cv"],
      queryFn: async () => {
         const response = await apiClient.api.projects.cv.$get();
         if(!response.ok){
            throw new Error("Something went wrong!");
         }

         const { data } = await response.json();
         
         return data;
      },
   });

   return query;
};
