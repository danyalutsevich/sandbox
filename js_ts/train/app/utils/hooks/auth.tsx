import React from "react";

interface AuthContextType {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  user: { id: string; email: string } | null;
}

export const AuthContext = React.createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<{ id: string; email: string } | null>(
    null,
  );

  const login = async (email: string, password: string) => {
    // Implement login logic here
  };

  const logout = async () => {
    // Implement logout logic here
  };

  const register = async (email: string, password: string) => {
    // Implement registration logic here
  };

  return (
    <AuthContext.Provider value={{ login, logout, register, user }}>
      {children}
    </AuthContext.Provider>
  );
}
