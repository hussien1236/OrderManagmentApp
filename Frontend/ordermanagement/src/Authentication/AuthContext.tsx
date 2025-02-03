import { createContext, ReactNode, useEffect, useState } from "react";

interface AuthContextType {
    token: string | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}
export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}:{children: ReactNode}) => {
      const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

      useEffect(() => {
        localStorage.setItem('token', token || '');
      },[token]);
      const login = async (username: string, password: string) => {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
            });
        const data = await response.json();
        if(data.token) {
            setToken(data.token);
        }
        if(!response.ok) 
            throw new Error('Invalid username or password');
      };
      const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
      };
      return (
        <AuthContext.Provider value={{token, login, logout}}>
            {children}
        </AuthContext.Provider>
      );
    }