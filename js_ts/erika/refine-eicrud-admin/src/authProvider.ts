import type { AuthProvider } from "@refinedev/core";
import { sp } from "./App";

export const TOKEN_KEY = "refine-auth";

export const authProvider: AuthProvider = {
  login: async ({ username, email, password }) => {
    if ((username || email) && password) {
      const res = await sp.user.login({ email: email, password: password });
      sp.user.setJwt(res.accessToken);
      return {
        success: true,
        redirectTo: "/",
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
    await sp.user.logout();

    return {
      success: true,
      redirectTo: "/login",
    };
  },

  check: async () => {
    const auth = await sp.user.checkJwt();

    // if (auth) {
    //   return {
    //     authenticated: true,
    //   };
    // }

    return {
      authenticated: true,
      // redirectTo: "/login",
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
