import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { useProfileForm } from "@/hooks/profile/useProfileForm";
import { ProfileAlerts } from "./ProfileAlerts";
import { ProfileFormSection } from "./ProfileFormSection";
import { PasswordChangeSection } from "./PasswordChangeSection";
import { ProfileFormActions } from "./ProfileFormActions";

export const ProfileEditForm = () => {
  const { form, isLoading, error, success, handleSubmit, handleReset } =
    useProfileForm();

  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle className="font-main text-2xl font-bold">
          Edit Profile
        </CardTitle>
        <CardDescription>
          Update your account information and change your password
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <ProfileAlerts error={error} success={success} />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <ProfileFormSection control={form.control} isLoading={isLoading} />
            <PasswordChangeSection
              control={form.control}
              isLoading={isLoading}
            />
            <ProfileFormActions isLoading={isLoading} onReset={handleReset} />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
