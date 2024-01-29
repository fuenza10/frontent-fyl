// authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";


import { AxiosError } from "axios";
import { AuthState, LoginData, RegisterData, User } from "@/src/Interfaces";
import { login, register } from "@/src/api/axios/services/auth/post.auth";
import { api } from "@/src/api/axios";
import { notification } from "antd";
import { CREATED, OK } from "@/src/api/constants/status-response.constant";

import { findOneUser } from "@/src/api/axios/services/user/get.user";


const initialState: AuthState = {
  status: "checking",
  token: null,
  user: null,
  loading: false,
  refreshToken: null,
  errorMessage: "",
};
interface action {
  payload: {
    user: LoginData;
    history: (path: string) => void;
  };
}
export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ payload: { user, history } }: action, { rejectWithValue }) => {

    const response = await login(user);

    if (response.status === OK) {
      notification.success({
        message: "Bienvenido",
        description: "Has iniciado sesión correctamente",
        type: "success",
        duration: 2
      });
      return {
        token: response.accessToken,
        refreshToken: response.refreshToken,
        user: response.user,
        history,
      };

    }
    return rejectWithValue("Información incorrecta");
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (registerData: RegisterData, { rejectWithValue }) => {
    const response = await register(registerData);
    if (response.status === CREATED) {
      localStorage.setItem('authUser', JSON.stringify( response))
      return {
        token: response.accessToken,
        refreshToken: response.refreshToken,
        user: response.user,
      };
    }
    return rejectWithValue("Información incorrecta");
  }
);
export const findUserUpdate = createAsyncThunk(
  "auth/findOne",
  async (  { rejectWithValue})=>{
    
    const response = await findOneUser();
    
    return response
  }
)
export const refreshTokenAction = createAsyncThunk(
  "auth/refreshToken",
  async (refreshToken: string, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.post("/auth/refresh", { refreshToken });
      // Realiza la solicitud de refresco del token
      const newAccessToken = response.data.accessToken; // Obtén el nuevo token de acceso de la respuesta
      dispatch(refreshTokenSuccess({ token: newAccessToken, refreshToken }));
      return {
        token: newAccessToken,
        refreshToken,
      };
    } catch (error) {
      // Maneja los errores de refresco del token
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state, action) => {

      action.payload.history("/login");
      notification.success({
        message: "Adios",
        description: "Has cerrado sesión correctamente",
        type: "success",
        duration: 2
      });
      state.status = "not-authenticated";
      state.token = null;
      state.user = null;
    },
    removeError: (state) => {
      state.errorMessage = "";
    },
    initChecking: (state) => {
      state.status = "checking";
      state.loading = true;
    },
    finishChecking: (state) => {
      state.loading = false;
    },
    refreshTokenSuccess: (state, action) => {
      state.token = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    firstLoginSuccess: (state) => {
      if (state.user) {
        state.user.isFirsLogin = false;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        signIn.fulfilled,
        (
          state,
          action: PayloadAction<{
            token: string;
            refreshToken: string;
            user: User;
            history: (path: string) => void;
          }>
        ) => {
         localStorage.setItem('token', action.payload.token)
          
          action.payload.history("/dashboard");
          state.status = "authenticated";
          state.token = action.payload.token ;
          state.refreshToken = action.payload.refreshToken;
          state.user = action.payload.user;
          state.errorMessage = "";
          state.loading = false;
        }
      )
      .addCase(signIn.rejected, (state, action: PayloadAction<unknown>) => {
        state.status = "not-authenticated";
        state.errorMessage = action.payload as string; 
        state.loading = false;
      })
      .addCase (findUserUpdate.fulfilled, (state, action: PayloadAction<{user:User}>) => {
        state.user= action.payload.user;
      })
      .addCase(signUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        signUp.fulfilled,
        (
          state,
          action: PayloadAction<{
            token: string;
            refreshToken: string;
            user: User;
          }>
        ) => {
          state.status = "authenticated";
          state.token = action.payload.token;
          state.refreshToken = action.payload.refreshToken;
          state.user = action.payload.user;
          state.errorMessage = "";
          state.loading = false;
        }
      )
      .addCase(signUp.rejected, (state, action: PayloadAction<unknown>) => {
        state.status = "not-authenticated";
        state.errorMessage = action.payload as string; // explicitly type payload as string
        state.loading = false;
      })
      .addCase(refreshTokenAction.fulfilled, (state, action) => {
        state.token = action.payload?.token;
        state.refreshToken = action.payload?.refreshToken;
      })
      .addCase(refreshTokenAction.rejected, (state, _action) => {
        state.status = "not-authenticated";
        state.loading = false;
      });
  },
});

export const {
  logoutUser,
  removeError,
  initChecking,
  finishChecking,
  refreshTokenSuccess,
  firstLoginSuccess
} = authSlice.actions;

export default authSlice.reducer;
