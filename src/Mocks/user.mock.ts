import type { User } from "../domain/User";

export const mockGuest: User = {
  name: "",
  email: "",
  password: "",
  role: "guest",
  avatar: "",
  isLoggedIn: false,
};

export const mockAdmin: User = {
  name: "Admin",
  email: "admin@gmail.com",
  password: "admin",
  role: "admin",
  avatar: "https://i.pravatar.cc/40?img=12",
  isLoggedIn: true,
  watchlist: [],
  watched: [],
};

export const mockUser: User = {
  name: "John Perez",
  email: "john@gmail.com",
  password: "user",
  role: "user",
  avatar: "https://i.pravatar.cc/40?img=5",
  isLoggedIn: true,
  watchlist: [],
  watched: [],
};
