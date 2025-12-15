import { createContext } from "react";

export interface AuthState {
  token: string | null;
  role: string | null;
}

export interface AppContextValue {
  auth: AuthState;
  setAuthData: (token: string | null, role: string | null) => void;
}

export const AppContext = createContext<AppContextValue>({
  auth: { token: null, role: null },
  setAuthData: () => {},
});