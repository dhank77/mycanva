import { apiClient } from "@/lib/hono";
import { useMutation } from "@tanstack/react-query";
import { InferResponseType, InferRequestType } from "hono";

type ResponType = InferResponseType<
   (typeof apiClient.api.images)["generate-image"]["$post"]
>;
type RequestType = InferRequestType<
   (typeof apiClient.api.images)["generate-image"]["$post"]
>["json"];

export const useGenerateImage = () => {
   const mutation = useMutation<ResponType, Error, RequestType>({
      mutationFn: async (json) => {
         const response = await apiClient.api.images["generate-image"].$post({
            json,
         });

         return await response.json();
      },
   });

   return mutation;
};
