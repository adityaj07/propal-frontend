import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ProfileFormActionsProps {
  isLoading: boolean;
  onReset: () => void;
}

export const ProfileFormActions = ({
  isLoading,
  onReset,
}: ProfileFormActionsProps) => {
  return (
    <div className="flex gap-3 pt-6">
      <Button type="submit" disabled={isLoading} className="flex-1">
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isLoading ? "Updating..." : "Update Profile"}
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={onReset}
        disabled={isLoading}
      >
        Reset
      </Button>
    </div>
  );
};
