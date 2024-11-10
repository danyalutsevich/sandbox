import { AuthProvider } from "react-admin";
import { sp } from "../client";

export const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    console.log("login", { username, password });
    return await sp.user.login({ email: username, password });
  },
  logout: () => {
    console.log("logout");
    return sp.user.logout();
  },
  checkError: (error) => {
    console.log("checkError", { error });
    return Promise.resolve();
  },
  checkAuth: async () => {
    const res = await sp.user.checkJwt();
    console.log("checkAuth", { res });
    if (res == null) {
      return Promise.reject();
    }
    return Promise.resolve();
  },
  getPermissions: () => {
    console.log("getPermissions");
    return Promise.resolve();
  },
  getId: () => {
    console.log("getId");
    return Promise.resolve();
  },

  // login: (
  //     params: any
  // ) => Promise<{ redirectTo?: string | boolean } | void | any>;
  // logout: (params: any) => Promise<void | false | string>;
  // checkAuth: (params: any & QueryFunctionContext) => Promise<void>;
  // checkError: (error: any) => Promise<void>;
  // getIdentity?: (params?: QueryFunctionContext) => Promise<UserIdentity>;
  // getPermissions: (params: any & QueryFunctionContext) => Promise<any>;
  // handleCallback?: (
  //     params?: QueryFunctionContext
  // ) => Promise<AuthRedirectResult | void | any>;
  // [key: string]: any;
};
