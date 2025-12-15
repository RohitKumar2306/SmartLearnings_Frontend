import React, { useEffect, useState } from "react";
import { AppContext, AppContextValue, AuthState } from './AppContext';

interface AppContextProviderProps {
  children: React.ReactNode;
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
                                                                        children,
                                                                      }) => {
  const [auth, setAuth] = useState<AuthState>({ token: null, role: null });

  const setAuthData = (token: string | null, role: string | null) => {
    setAuth({ token, role });
  };

  // Restore auth from localStorage (similar to your previous useEffect)
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    if (storedToken && storedRole) {
      setAuth({ token: storedToken, role: storedRole });
    }
  }, []);

  const value: AppContextValue = {
    auth,
    setAuthData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};