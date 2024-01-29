import {  User } from "..";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface AuthState {
  status: "checking" | "authenticated" | "not-authenticated";
  token: string | null;
  errorMessage: string;
  loading: boolean;
  user: User | null;
  refreshToken: string | null;
}
export interface IState {
  layout: {
    layoutType?: "vertical" | "horizontal";
    layoutModeType?: "light" | "dark";
    layoutWidth?: "fluid" | "boxed" | "scrollable";
    leftSideBarTheme?: "dark" | "light" | "colored";
    leftSideBarThemeImage?: "none" | "img1" | "img2" | "img3" | "img4";
    leftSideBarType?: "default" | "compact" | "icon" | "condensed" | undefined;
    leftSideBarThemeTypes?:
    | "light"
    | "colored"
    | "dark"
    | "winter"
    | "ladylip"
    | "plumplate"
    | "strongbliss"
    | "greatwhale";
    topbarTheme?: "light" | "dark";
    isPreloader?: boolean;
    showRightSidebar?: boolean;
    isMobile?: boolean;
    showSidebar?: boolean;
    leftMenu?: boolean;
  };
  Login?: {
    loading?: boolean;
    error?: string;
  };
  auth: AuthState;
}
export interface IStateLogin {
  Login: {
    loading?: boolean;
    error?: string;
  };
}
export interface IStateRegister {
  Account: {
    loading?: boolean;
    registrationError?: string;
    message?: string;
    user?: User;
    accessToken?: string;
    refreshToken?: string;
  };
}

