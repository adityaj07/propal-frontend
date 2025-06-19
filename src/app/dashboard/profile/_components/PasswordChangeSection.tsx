import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";
import { Control } from "react-hook-form";
import { ProfileSchemaType } from "@/schemas";

interface PasswordChangeSectionProps {
  control: Control<ProfileSchemaType>;
  isLoading: boolean;
}

export const PasswordChangeSection = ({
  control,
  isLoading,
}: PasswordChangeSectionProps) => {
  return (
    <div className="space-y-4 pt-6 border-t">
      <div className="flex items-center gap-2">
        <Lock className="h-5 w-5" />
        <h3 className="text-xl font-medium font-main">Change Password</h3>
      </div>
      <p className="text-sm text-muted-foreground">
        Leave password fields empty if you don&apos;t want to change your
        password
      </p>

      <FormField
        control={control}
        name="currentPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Current Password</FormLabel>
            <FormControl>
              <Input
                type="password"
                placeholder="Enter current password"
                disabled={isLoading}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="newPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel>New Password</FormLabel>
            <FormControl>
              <Input
                type="password"
                placeholder="Enter new password"
                disabled={isLoading}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="confirmPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Confirm New Password</FormLabel>
            <FormControl>
              <Input
                type="password"
                placeholder="Confirm new password"
                disabled={isLoading}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
