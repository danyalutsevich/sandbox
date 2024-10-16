import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3333",
  disableCSRFTokenCheck: true,
});

export const { signIn, signUp, signOut } = authClient;
