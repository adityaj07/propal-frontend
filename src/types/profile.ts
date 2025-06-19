export interface StoredUser {
  username: string;
  email: string;
  password: string;
  phone?: string;
}

export interface UserWithoutPassword {
  username: string;
  email: string;
  phone?: string;
}

export interface ProfileFormData {
  username: string;
  email: string;
  phone?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export interface ProfileUpdateResult {
  success: boolean;
  error?: string;
  updatedUser?: UserWithoutPassword;
}
