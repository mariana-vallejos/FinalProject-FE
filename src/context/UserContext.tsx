import { createContext, useContext, useEffect, useState } from "react";
import { dbPromise } from "../db/db";
import type { User } from "../domain/User";
import { mockGuest as defaultGuest, mockUser } from "../Mocks/user.mock";

interface UserContextType {
  user: User;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  addToWatchlist: (movieId: number) => "added" | "exists";
  addToWatched: (movieId: number) => "added" | "exists";
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(defaultGuest);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const db = await dbPromise;
      const session = await db.get("session", "current");
      if (session) {
        const savedUser = await db.get("users", session);
        setUser(savedUser ?? defaultGuest);
      } else {
        await db.put("users", mockUser);
      }
      setLoading(false);
    })();
  }, []);

  const login = async (email: string, password: string) => {
    const db = await dbPromise;
    const existingUser = await db.get("users", email);

    if (!existingUser) {
      throw new Error("User not found");
    }
    if (existingUser.password !== password) {
      throw new Error("Invalid password");
    }

    const loggedUser: User = { ...existingUser, isLoggedIn: true };

    await db.put("users", loggedUser);
    await db.put("session", email, "current");
    setUser(loggedUser);
  };

  const logout = async () => {
    const db = await dbPromise;
    await db.delete("session", "current");
    setUser(defaultGuest);
  };

  const addToWatchlist = (movieId: number): "added" | "exists" => {
    if (user.watchlist?.includes(movieId)) {
      return "exists";
    }
    const updatedUser = {
      ...user,
      watchlist: [...(user.watchlist ?? []), movieId],
    };
    setUser(updatedUser);
    return "added";
  };

  const addToWatched = (movieId: number): "added" | "exists" => {
    if (user.watched?.includes(movieId)) {
      return "exists";
    }
    const updatedUser = {
      ...user,
      watched: [...(user.watched ?? []), movieId],
    };
    setUser(updatedUser);
    return "added";
  };

  return (
    <UserContext.Provider
      value={{ user, login, logout, addToWatchlist, addToWatched, loading }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be inside UserProvider");
  return ctx;
}
