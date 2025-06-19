import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle } from "lucide-react";

interface ProfileAlertsProps {
  error: string | null;
  success: boolean;
}

export const ProfileAlerts = ({ error, success }: ProfileAlertsProps) => {
  if (!error && !success) return null;

  return (
    <div className="mb-6">
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="border-green-200 bg-green-50 dark:bg-green-900/20">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800 dark:text-green-200">
            Profile updated successfully!
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
