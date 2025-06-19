import { z } from "zod";

export const signupSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters" }),
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  phone: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Enter a valid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const profileSchema = z
  .object({
    username: z
      .string()
      .min(2, { message: "Username must be at least 2 characters" }),
    email: z.string().email({ message: "Enter a valid email address" }),
    phone: z.string().optional(),
    currentPassword: z
      .string()
      .min(6, { message: "Current password must be at least 6 characters" })
      .optional()
      .or(z.literal("")),
    newPassword: z
      .string()
      .min(6, { message: "New password must be at least 6 characters" })
      .optional()
      .or(z.literal("")),
    confirmPassword: z.string().optional().or(z.literal("")),
  })
  .refine(
    (data) => {
      if (data.newPassword && data.newPassword !== data.confirmPassword) {
        return false;
      }
      return true;
    },
    {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.currentPassword) {
        return false;
      }
      return true;
    },
    {
      message: "Current password is required to set new password",
      path: ["currentPassword"],
    }
  );

export type ProfileSchemaType = z.infer<typeof profileSchema>;

export type LoginSchemaType = z.infer<typeof loginSchema>;
export type SignupSchemaType = z.infer<typeof signupSchema>;
