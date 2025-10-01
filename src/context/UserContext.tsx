import { createContext, useContext, useEffect, useState } from "react";
import { dbPromise } from "../db/db";
import type { User } from "../domain/User";
import { mockGuest as defaultGuest, mockUser } from "../Mocks/user.mock";

interface UserContextType {
  user: User;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  addToWatchlist: (movieId: number) => Promise<void>;
  addToWatched: (movieId: number) => Promise<void>;
  removeFromWatchlist: (movieId: number) => Promise<void>;
  removeFromWatched: (movieId: number) => Promise<void>;
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
  const addToWatchlist = async (movieId: number) => {
    if (!user || !user.email) return;
    const db = await dbPromise;
    const freshUser = await db.get("users", user.email);
    if (!freshUser) return;

    const updatedUser = {
      ...freshUser,
      watchlist: [...(freshUser.watchlist ?? []), movieId],
    };

    await db.put("users", updatedUser);
    setUser(updatedUser);
  };

  const addToWatched = async (movieId: number) => {
    if (!user || !user.email) return;
    const db = await dbPromise;
    const freshUser = await db.get("users", user.email);
    if (!freshUser) return;

    const updatedUser = {
      ...freshUser,
      watched: [...(freshUser.watched ?? []), movieId],
    };

    await db.put("users", updatedUser);
    setUser(updatedUser);
  };

  const removeFromWatchlist = async (movieId: number) => {
    if (!user || !user.email) return;
    const db = await dbPromise;
    const freshUser = await db.get("users", user.email);
    if (!freshUser) return;

    const updatedUser = {
      ...freshUser,
      watchlist: (freshUser.watchlist ?? []).filter((id) => id !== movieId),
    };

    await db.put("users", updatedUser);
    setUser(updatedUser);
  };

  const removeFromWatched = async (movieId: number) => {
    if (!user || !user.email) return;
    const db = await dbPromise;
    const freshUser = await db.get("users", user.email);
    if (!freshUser) return;

    const updatedUser = {
      ...freshUser,
      watched: (freshUser.watched ?? []).filter((id) => id !== movieId),
    };

    await db.put("users", updatedUser);
    setUser(updatedUser);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        addToWatchlist,
        addToWatched,
        removeFromWatchlist,
        removeFromWatched,
      }}
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
