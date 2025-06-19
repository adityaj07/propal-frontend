import { StoredUser, UserWithoutPassword } from "../types/profile";

const USERS_KEY = "users";
const AUTH_USER_KEY = "authUser";

export const getStoredUsers = (): StoredUser[] => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch (error) {
    console.error("Error parsing stored users:", error);
    return [];
  }
};

export const saveStoredUsers = (users: StoredUser[]): void => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const saveAuthUser = (user: UserWithoutPassword): void => {
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
};
