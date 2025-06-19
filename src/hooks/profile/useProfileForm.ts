import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { profileSchema, ProfileSchemaType } from "@/schemas";
import { useAuth } from "@/contexts/auth-context";
import { updateProfile } from "@/services/profile-service";

interface UseProfileFormReturn {
  form: ReturnType<typeof useForm<ProfileSchemaType>>;
  isLoading: boolean;
  error: string | null;
  success: boolean;
  handleSubmit: (data: ProfileSchemaType) => Promise<void>;
  handleReset: () => void;
  clearMessages: () => void;
}

export const useProfileForm = (): UseProfileFormReturn => {
  const { user, updateUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const form = useForm<ProfileSchemaType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: user?.username || "",
      email: user?.email || "",
      phone: user?.phone || "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = async (data: ProfileSchemaType) => {
    if (!user) return;

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await updateProfile(user, data);
      if (result.success && result.updatedUser) {
        updateUser(result.updatedUser);

        // Reset password fields
        form.setValue("currentPassword", "");
        form.setValue("newPassword", "");
        form.setValue("confirmPassword", "");

        setSuccess(true);
        toast.success("Profile updated successfully!");

        // Auto-hide success message
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(result.error || "Failed to update profile");
      }
    } catch (err) {
      console.error("Profile update error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    form.reset({
      username: user?.username || "",
      email: user?.email || "",
      phone: user?.phone || "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setError(null);
    setSuccess(false);
  };

  const clearMessages = () => {
    setError(null);
    setSuccess(false);
  };

  return {
    form,
    isLoading,
    error,
    success,
    handleSubmit,
    handleReset,
    clearMessages,
  };
};
