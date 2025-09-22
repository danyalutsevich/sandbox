import type { AuthProvider } from "@refinedev/core";

export const TOKEN_KEY = "refine-auth";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const authProvider: AuthProvider = {
  login: async ({ username, email, password }) => {
    console.log("Login attempt with:", { username, email, password });

    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    const resData = await res.json();

    if (res.ok && resData?.jwt && resData?.user && resData?.refresh) {
      localStorage.setItem(TOKEN_KEY, resData.jwt);
      localStorage.setItem("refreshToken", resData.refresh);
      localStorage.setItem("user", JSON.stringify(resData.user));
      return {
        success: true,
        redirectTo: "/user",
      };
    }

    return {
      success: false,
      error: {
        name: "LoginError",
        message: "Invalid username or password",
      },
    };
  },
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        id: 1,
        name: "John Doe",
        avatar: "https://i.pravatar.cc/300",
      };
    }
    return null;
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
