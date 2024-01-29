import { AuthResponse, LoginData, RegisterData } from "@/src/Interfaces/";
import { post } from "@/src/api/axios/index";

export const login = (data: LoginData): Promise<AuthResponse> =>
  post("/auth/login", data).then((response) => {
    if (response === null) {
      throw new Error("Response is null");
    }

    return response;
  });

export const register = (data: RegisterData): Promise<AuthResponse> =>
  post("/users/new-user", data).then((response) => {
    if (response === null) {
      throw new Error("Response is null");
    }
    return response;
  });
