export type Role = "guest" | "admin" | "user";

export type User = {
  name: string;
  email: string;
  password: string;
  role: Role;
  avatar?: string;
  isLoggedIn: boolean;
};

export const UserRole = {
  Guest: "guest",
  User: "user",
  Admin: "admin",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];
