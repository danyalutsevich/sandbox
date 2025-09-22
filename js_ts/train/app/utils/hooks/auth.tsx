import React, { useEffect } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import { axiosInstance } from "../axiosInstance";
import { User } from "../types/user";

interface AuthContextType {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string,
  ) => Promise<void>;
  user: User | null;
  jwt?: string | null;
  refresh?: string | null;
}

export const AuthContext = React.createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  // POTENTIAL THROW JSON PARSE ERROR
  const [user, setUser] = React.useState<User | null>(
    JSON.parse(SecureStore.getItem("user") || "null"),
  );

  const [jwt, setJwt] = React.useState<string | null>(
    SecureStore.getItem("jwt"),
  );

  const [refresh, setRefresh] = React.useState<string | null>(
    SecureStore.getItem("refresh"),
  );

  useEffect(() => {
    console.log("AuthProvider mounted");
    axiosInstance.defaults.headers.common["Authorization"] =
      `Bearer ${SecureStore.getItem("jwt")}` || "";

    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          // TODO: try to refresh token first
          logout();
        }
        return Promise.reject(error);
      },
    );
  }, [jwt]);

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

    axiosInstance.defaults.headers.common["Authorization"] =
      `Bearer ${res.data.jwt}`;

    SecureStore.setItem("jwt", res.data.jwt);
    SecureStore.setItem("refresh", res.data.refresh);
    SecureStore.setItem("user", JSON.stringify(res.data.user));

    router.replace("/(tabs)");
  };

  const logout = async () => {
    console.log("logout");
    setUser(null);
    setJwt(null);
    setRefresh(null);

    await SecureStore.deleteItemAsync("jwt");
    await SecureStore.deleteItemAsync("refresh");
    await SecureStore.deleteItemAsync("user");

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
    <AuthContext.Provider
      value={{ login, logout, register, user, jwt, refresh }}
    >
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
