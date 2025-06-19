import {
  ProfileFormData,
  StoredUser,
  UserWithoutPassword,
} from "../types/profile";

export const findUserByEmail = (
  users: StoredUser[],
  email: string
): { user: StoredUser; index: number } | null => {
  const index = users.findIndex((u) => u.email === email);
  return index !== -1 ? { user: users[index], index } : null;
};

export const isEmailTaken = (
  users: StoredUser[],
  email: string,
  excludeIndex: number
): boolean => {
  return users.some((u, index) => u.email === email && index !== excludeIndex);
};

export const isPasswordChangeRequested = (data: ProfileFormData): boolean => {
  return !!(data.newPassword && data.currentPassword);
};

export const createUpdatedUser = (
  currentUser: StoredUser,
  formData: ProfileFormData
): StoredUser => {
  return {
    ...currentUser,
    username: formData.username,
    email: formData.email,
    phone: formData.phone || currentUser.phone,
  };
};

export const removePasswordFromUser = (
  user: StoredUser
): UserWithoutPassword => {
  const { ...userWithoutPassword } = user;
  return userWithoutPassword;
};
