export type Role = "guest" | "admin" | "user";

export type User = {
  name: string;
  email: string;
  password: string;
  role: Role;
  avatar?: string;
  isLoggedIn: boolean;
};
