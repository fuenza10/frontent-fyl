export interface User {
  id: string;
  email: string;
  password: string;
  state: boolean;
  UserRole: [UserRole];

  companies:[string];
  lastName: string;
  firstName: string;
  rut: string;
  updatedAt: string;
  createdAt: string;
  isFirsLogin:boolean;
}
export interface UserResponse {
  ok: boolean;
  status: number;
  user: User;
}
export enum UserRole {
  ADMIN_ROLE = "ADMIN_ROLE",
  USER_ROLE = "USER_ROLE",
  CLIENT_ROLE = "CLIENT_ROLE",
}