import { createContext, useContext, useEffect, useState } from "react";
import { dbPromise } from "../db/db";

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin?: boolean;
}

interface UserContextType {
  user: User | null;
  login: (email: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const db = await dbPromise;
      const session = await db.get("session", "current");
      if (session) {
        const savedUser = await db.get("users", session);
        setUser(savedUser ?? null);
      }
    })();
  }, []);

  const login = async (email: string, name = "Guest") => {
    const db = await dbPromise;
    const id = email;
    const newUser: User = {
      id,
      email,
      name,
      isAdmin: email === "admin@cinelog.com",
    };
    await db.put("users", newUser);
    await db.put("session", id, "current");
    setUser(newUser);
  };

  const logout = async () => {
    const db = await dbPromise;
    await db.delete("session", "current");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be inside UserProvider");
  return ctx;
}
