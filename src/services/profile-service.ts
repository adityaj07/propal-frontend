import { hashPassword, verifyPassword } from "@/contexts/auth-context";
import {
  getStoredUsers,
  saveAuthUser,
  saveStoredUsers,
} from "@/utils/profileLocalStorage";
import {
  createUpdatedUser,
  findUserByEmail,
  isEmailTaken,
  isPasswordChangeRequested,
  removePasswordFromUser,
} from "@/utils/profileUtilities";
import {
  ProfileFormData,
  ProfileUpdateResult,
  UserWithoutPassword,
} from "../types/profile";

export const updateProfile = async (
  currentUser: UserWithoutPassword,
  formData: ProfileFormData
): Promise<ProfileUpdateResult> => {
  try {
    const users = getStoredUsers();
    const userResult = findUserByEmail(users, currentUser.email);

    if (!userResult) {
      return {
        success: false,
        error: "User not found. Please try logging in again.",
      };
    }

    const { user: storedUser, index: userIndex } = userResult;

    // Validate password change if requested
    if (isPasswordChangeRequested(formData)) {
      const isValidPassword = await verifyPassword(
        formData.currentPassword!,
        storedUser.password
      );

      if (!isValidPassword) {
        return {
          success: false,
          error: "Current password is incorrect.",
        };
      }
    }

    // Check email uniqueness if changed
    if (formData.email !== currentUser.email) {
      if (isEmailTaken(users, formData.email, userIndex)) {
        return {
          success: false,
          error: "This email is already taken by another user.",
        };
      }
    }

    // Create updated user
    const updatedUser = createUpdatedUser(storedUser, formData);

    // Hash new password if provided
    if (formData.newPassword) {
      updatedUser.password = await hashPassword(formData.newPassword);
    }

    // Update storage
    users[userIndex] = updatedUser;
    saveStoredUsers(users);

    // Update auth user
    const userWithoutPassword = removePasswordFromUser(updatedUser);
    saveAuthUser(userWithoutPassword);

    return {
      success: true,
      updatedUser: userWithoutPassword,
    };
  } catch (error) {
    console.error("Profile update service error:", error);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }
};
