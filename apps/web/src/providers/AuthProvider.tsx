import { createContext, ReactNode, useState, useEffect } from 'react';

export type UserRole = 'student' | 'instructor' | 'admin' | 'super_admin';

export interface AuthenticatedUser {
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

interface AuthContextType {
  user: AuthenticatedUser | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Static mock users map matching DB seeds
const MOCK_USERS: Record<string, Omit<AuthenticatedUser, 'email'>> = {
  'student1@pragyaos.com': { firstName: 'Alice', lastName: 'Cooper', role: 'student' },
  'student2@pragyaos.com': { firstName: 'Bob', lastName: 'Dylan', role: 'student' },
  'instructor1@pragyaos.com': { firstName: 'Jane', lastName: 'Doe', role: 'instructor' },
  'instructor2@pragyaos.com': { firstName: 'Richard', lastName: 'Feynman', role: 'instructor' },
  'admin@pragyaos.com': { firstName: 'System', lastName: 'Manager', role: 'admin' },
  'superadmin@pragyaos.com': { firstName: 'Root', lastName: 'Administrator', role: 'super_admin' },
};

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps): React.JSX.Element {
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hydrate user session from localStorage on mount
    try {
      const stored = localStorage.getItem('pragyaos_session');
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to parse auth session:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    const normalizedEmail = email.toLowerCase().trim();
    const mockProfile = MOCK_USERS[normalizedEmail];

    if (!mockProfile) {
      return { success: false, error: 'User account not found.' };
    }

    if (password !== 'Password@123') {
      return { success: false, error: 'Incorrect password.' };
    }

    const authUser: AuthenticatedUser = {
      email: normalizedEmail,
      ...mockProfile,
    };

    localStorage.setItem('pragyaos_session', JSON.stringify(authUser));
    setUser(authUser);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('pragyaos_session');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
