"use client";

import { Button } from "@/components/ui/button";
import { Editor } from "@/features/editor/components/editor";
import { useGetProject } from "@/features/projects/api/use-get-project";
import { AlertTriangleIcon, ArrowLeft, Loader } from "lucide-react";
import Link from "next/link";

const EditorPage = ({
  params,
}: {
  params: {
    projectid: string;
  };
}) => {
  const { data, isLoading, isError } = useGetProject(params.projectid);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader className="size-10 text-sky-500 animate-spin transition" />
      </div>
    );
  }
  if (isError || !data) {
    return (
      <div className="w-full h-screen flex flex-col gap-y-4 justify-center items-center">
        <div className="flex flex-col items-center justify-center">
          <AlertTriangleIcon className="text-red-500 size-10" />
          <p className="text-sm text-muted-foreground">Failed to load project</p>
        </div>
        <Button asChild variant="secondary" size="sm">
          <Link href="/">
            <ArrowLeft className="size-4 mr-2" /> Back to Home
          </Link>
        </Button>
      </div>
    );
  }

  return <Editor initialData={data} />;
};

export default EditorPage;
