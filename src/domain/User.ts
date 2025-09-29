export type Role = "guest" | "admin" | "user";

export type User = {
    name: string;
    email: string;
    role: Role;
    avatar?: string;
    isLoggedIn: boolean;
}