import { InferRequestType, InferResponseType } from "hono";
import { useMutation } from "@tanstack/react-query";

import { apiClient } from "@/lib/hono";

type ResponType = InferResponseType<
   (typeof apiClient.api.images)["remove-bg"]["$post"]
>;
type RequestType = InferRequestType<
   (typeof apiClient.api.images)["remove-bg"]["$post"]
>["json"];

export const useRemoveBg = () => {
   const mutation = useMutation<ResponType, Error, RequestType>({
      mutationFn: async (json) => {
         const response = await apiClient.api.images["remove-bg"].$post({
            json,
         });

         return await response.json();
      },
   });

   return mutation;
};
