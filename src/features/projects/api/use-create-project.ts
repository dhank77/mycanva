import { apiClient } from "@/lib/hono";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";
import { CheckCheckIcon, AlertCircle } from "lucide-react";

type ResponseType = InferResponseType<typeof apiClient.api.projects.$post, 200>;
type RequestType = InferRequestType<
  typeof apiClient.api.projects.$post
>["json"];

export const useCreateProject = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await apiClient.api.projects.$post({ json });

      if (!response.ok) {
        throw new Error("something went wrong");
      }
      return await response.json();
    },
    onError: () => {
      toast.error("Project failed to create!");
    },
    onSuccess: () => {
      toast.success("Project created");
    },
  });

  return mutation;
};
