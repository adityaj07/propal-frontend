interface STTConfigurationHeaderProps {
  title: string;
  description: string;
}

export const STTConfigurationHeader = ({
  title,
  description,
}: STTConfigurationHeaderProps) => {
  return (
    <div className="mb-4 mt-4">
      <div className="flex items-center gap-3 mb-2">
        <h1 className="text-5xl font-bold font-main">{title}</h1>
      </div>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};
