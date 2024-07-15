export const ToolHeader = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  return (
    <div className="flex flex-col gap-x-3 py-4 px-2 border-b">
      <p className="font-semibold text-md">{title}</p>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
};
