import { Button } from "@/components/ui/button";
import { RotateCcw, Save } from "lucide-react";

interface ConfigurationActionsProps {
  onSave: () => void;
  onReset: () => void;
  isSaving: boolean;
  isConfigComplete: boolean;
}

export const ConfigurationActions = ({
  onSave,
  onReset,
  isSaving,
  isConfigComplete,
}: ConfigurationActionsProps) => {
  return (
    <div className="flex gap-3 pt-4">
      <Button
        onClick={onSave}
        disabled={!isConfigComplete || isSaving}
        className="flex-1 transition-all duration-200"
      >
        {isSaving ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Saving...
          </>
        ) : (
          <>
            <Save className="mr-2 h-4 w-4" />
            Save Config
          </>
        )}
      </Button>
      <Button
        variant="outline"
        onClick={onReset}
        disabled={isSaving}
        className="transition-all duration-200 hover:border-destructive hover:text-destructive"
      >
        <RotateCcw className="mr-2 h-4 w-4" />
        Reset
      </Button>
    </div>
  );
};
