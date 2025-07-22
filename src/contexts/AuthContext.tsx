import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'admin' | 'coach' | 'medical' | 'parent' | 'scout' | 'player';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  academyId?: string;
  academyName?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Mwangi',
    email: 'admin@nairobi-fc.com',
    role: 'admin',
    academyId: '1',
    academyName: 'Nairobi FC Academy'
  },
  {
    id: '2',
    name: 'Mary Wanjiku',
    email: 'coach@nairobi-fc.com',
    role: 'coach',
    academyId: '1',
    academyName: 'Nairobi FC Academy'
  },
  {
    id: '3',
    name: 'Dr. Peter Kamau',
    email: 'medical@nairobi-fc.com',
    role: 'medical',
    academyId: '1',
    academyName: 'Nairobi FC Academy'
  },
  {
    id: '4',
    name: 'Grace Njeri',
    email: 'parent@example.com',
    role: 'parent',
    academyId: '1',
    academyName: 'Nairobi FC Academy'
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Mock authentication - in production, this would be an API call
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser && password === 'password123') {
      setUser(foundUser);
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}