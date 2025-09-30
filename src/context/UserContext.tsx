import { createContext, useContext, useEffect, useState } from "react";
import { dbPromise } from "../db/db";
import type { User } from "../domain/User";
import { mockGuest as defaultGuest, mockAdmin } from "../Mocks/user.mock";

interface UserContextType {
  user: User;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
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
        await db.put("users", mockAdmin);
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

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be inside UserProvider");
  return ctx;
}
