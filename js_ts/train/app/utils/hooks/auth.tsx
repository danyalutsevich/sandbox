import React from "react";
import axios from "axios";
import { useRouter } from "expo-router";

interface AuthContextType {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string,
  ) => Promise<void>;
  user: { id: string; email: string } | null;
  jwt?: string;
  refresh?: string;
}

export const AuthContext = React.createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = React.useState<{ id: string; email: string } | null>(
    null,
  );
  const [jwt, setJwt] = React.useState<string | null>(null);
  const [refresh, setRefresh] = React.useState<string | null>(null);

  const login = async (email: string, password: string) => {
    console.log("login");
    const res = await axios.post(
      process.env.EXPO_PUBLIC_BASE_URL + "/auth/login",
      {
        email,
        password,
      },
    );
    setUser(res.data.user);
    setJwt(res.data.jwt);
    setRefresh(res.data.refresh);
    router.replace("/(tabs)");
  };

  const logout = async () => {
    console.log("logout");
    setUser(null);
    setJwt(null);
    setRefresh(null);
    router.replace("/(auth)/login");
  };

  const register = async (
    username: string,
    email: string,
    password: string,
  ) => {
    console.log("register");
    const res = await axios.post(
      process.env.EXPO_PUBLIC_BASE_URL + "/auth/register",
      { username, email, password },
    );
    setUser(res.data.user);
    setJwt(res.data.jwt);
    setRefresh(res.data.refresh);
  };

  return (
    <AuthContext.Provider value={{ login, logout, register, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
