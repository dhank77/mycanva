import { apiClient } from "@/lib/hono";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<typeof apiClient.api.user.register.$post>;
type RequestType = InferRequestType<
  typeof apiClient.api.user.register.$post
>["json"];

export const useRegister = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await apiClient.api.user.register.$post({
        json,
      });

      if(!response.ok){
        throw new Error("Something went wrong!");
      }

      return await response.json();
    },
  });

  return mutation;
};
