import { Role } from "./role";

export interface User {
  id: number;

  username: string;

  email: string;

  password: string;

  role: Role;

  resetPasswordToken: string | null;

  avatarUrl?: string; // for now it doesn't exist in the backend

  createdAt: Date;

  updatedAt: Date;
}
