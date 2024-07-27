import { apiClient } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
   (typeof apiClient.api.projects)[":id"]["$patch"],
   200
>;
type RequestType = InferRequestType<
   (typeof apiClient.api.projects)[":id"]["$patch"]
>["json"];

export const useUpdateProject = (id: string) => {
   const queryClient = useQueryClient();

   const mutation = useMutation<ResponseType, Error, RequestType>({
      mutationKey: ["project", { id }],
      mutationFn: async (json) => {
         const response = await apiClient.api.projects[":id"].$patch({
            json,
            param: {
               id,
            },
         });

         if (!response.ok) {
            throw new Error("Failed to update project!");
         }

         return response.json();
      },
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["project", { id }] });
      },
      onError: () => {
         toast.error("Project failed to update!");
      },
   });

   return mutation;
};
