export type Role = "guest" | "admin" | "user";

export type User = {
    name: string;
    email: string;
    role: Role;
    avatar: string;
    isLoggedIn: boolean;
};

export const mockGuest: User = {
    name: "",
    email: "",
    role: "guest",
    avatar: "",
    isLoggedIn: false,
};

export const mockAdmin: User = {
    name: "Admin",
    email: "admin@gmail.com",
    role: "admin",
    avatar: "https://i.pravatar.cc/40?img=12",
    isLoggedIn: true,
};

export const mockUser: User = {
    name: "John Perez",
    email: "john@gmail.com",
    role: "user",
    avatar: "https://i.pravatar.cc/40?img=5",
    isLoggedIn: true,
};
