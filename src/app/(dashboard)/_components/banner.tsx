"use client";

import { Button } from "@/components/ui/button";
import { useCreateProject } from "@/features/projects/api/use-create-project";
import { ArrowRightIcon, SparklesIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const Banner = () => {
  const { mutate, isPending } = useCreateProject();
  const router = useRouter();

  const handleCreateProject = () => {
    mutate({
      name: "Untitled Project",
      height: 1200,
      width: 900,
    }, {
      onSuccess: ({data}) => {
         router.push(`/editor/${data.id}`);
      }
    });
  };

  return (
    <div className="flex flex-col space-y-6 pb-10 max-w-screen-xl mx-auto">
      <div className="text-white aspect-[5/1] min-h-[248px] flex items-center gap-x-6 p-6 rounded-xl bg-gradient-to-r from-blue-700 via-blue-500 to-sky-300">
        <div className="hidden md:flex size-28 bg-white/50 rounded-full items-center justify-center min-w-[7rem]">
          <div className="size-20 bg-white rounded-full flex items-center justify-center">
            <SparklesIcon className="size-5 fill-blue-500 text-blue-500" />
          </div>
        </div>

        <div className="flex flex-col gap-y-2">
          <h1 className="text-xl lg:text-2xl font-semibold">
            Visualize your amazing design here!
          </h1>
          <p className="text-xs lg:text-sm">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus
            error rem ipsam modi id beatae repellat libero inventore officia
            accusantium voluptatum, blanditiis eligendi nemo a laborum amet
            veniam velit illum.
          </p>
          <Button
            disabled={isPending}
            onClick={handleCreateProject}
            variant="secondary"
            className="w-[10rem]"
          >
            <p className="font-medium flex items-center">
              Create Project <ArrowRightIcon className="size-4 ml-2" />
            </p>
          </Button>
        </div>
      </div>
    </div>
  );
};
