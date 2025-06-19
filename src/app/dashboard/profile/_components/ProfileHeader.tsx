interface ProfileHeaderProps {
  title: string;
  description: string;
}

export const ProfileHeader = ({ title, description }: ProfileHeaderProps) => {
  return (
    <div className="mb-4 mt-4">
      <h1 className="text-5xl font-bold font-main">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};
