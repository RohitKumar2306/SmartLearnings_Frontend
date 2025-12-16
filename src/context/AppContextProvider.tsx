import React, { useState } from "react";
import { AppContext, AppContextValue, AuthState } from './AppContext';

interface AppContextProviderProps {
  children: React.ReactNode;
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
                                                                        children,
                                                                      }) => {
  const [auth, setAuth] = useState<AuthState>({
    token: localStorage.getItem("token"),
    role: localStorage.getItem("role"),
  });

  const setAuthData = (token: string | null, role: string | null) => {
    setAuth({ token, role });
    if (token && role) {
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    }
  };

  const logout = () => {
    // clear storage
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    // clear auth state
    setAuth({ token: null, role: null });
  };

  const value: AppContextValue = {
    auth,
    setAuthData,
    logout,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};