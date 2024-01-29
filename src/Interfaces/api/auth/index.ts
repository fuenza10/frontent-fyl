import { User } from "..";

export interface LoginData {
  email: string;
  password: string;
}
export interface AuthResponse {
  ok: boolean;

  status: number;

  user: User;
  accessToken: string;
  refreshToken: string;
}
export interface RegisterData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    rut: string;

    userRole: string[];
    
  }
