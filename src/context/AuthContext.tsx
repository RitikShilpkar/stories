import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface User {
    id: string;
    email: string;
    name?: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    // In a real app, we would validate the token with the backend
                    // const res = await axios.get('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } });
                    // setUser(res.data);

                    // For now, we'll just simulate a user if a token exists
                    setUser({ id: '1', email: 'user@example.com', name: 'Demo User' });
                } catch (error) {
                    console.error('Auth check failed', error);
                    localStorage.removeItem('token');
                }
            }
            setIsLoading(false);
        };

        checkAuth();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            // const res = await axios.post('/api/auth/login', { email, password });
            // const { token, user } = res.data;

            // Mock login for development since backend might not be running
            console.log('Logging in with', email, password);
            const token = 'mock-token-' + Date.now();
            const mockUser = { id: '1', email, name: 'Demo User' };

            localStorage.setItem('token', token);
            setUser(mockUser);
        } catch (error) {
            console.error('Login failed', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};
