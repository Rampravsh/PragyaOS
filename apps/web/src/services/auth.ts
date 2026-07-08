export interface UserProfile {
  email: string;
  name: string;
  role?: 'student' | 'instructor' | 'organization' | 'support';
  avatar?: string;
  profileCompleted?: boolean;
}

const DELAY_MS = 800;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const authService = {
  async login(email: string, _password?: string): Promise<UserProfile> {
    await sleep(DELAY_MS);
    
    // Simple local validation mockup
    if (email.includes('error')) {
      throw new Error('Database server connection timeout.');
    }
    if (email.includes('notfound')) {
      throw new Error('Account credentials not registered.');
    }

    const registeredUsers = JSON.parse(localStorage.getItem('pragyaos_users') || '[]');
    const match = registeredUsers.find((u: any) => u.email === email);
    
    const user: UserProfile = match || {
      email,
      name: email.split('@')[0],
      role: 'student',
      profileCompleted: false,
    };

    localStorage.setItem('pragyaos_current_user', JSON.stringify(user));
    return user;
  },

  async register(email: string, name: string): Promise<UserProfile> {
    await sleep(DELAY_MS);

    if (email.includes('taken')) {
      throw new Error('Email address already registered.');
    }

    const registeredUsers = JSON.parse(localStorage.getItem('pragyaos_users') || '[]');
    const newUser = { email, name, role: 'student' as const, profileCompleted: false };
    
    if (!registeredUsers.some((u: any) => u.email === email)) {
      registeredUsers.push(newUser);
      localStorage.setItem('pragyaos_users', JSON.stringify(registeredUsers));
    }

    localStorage.setItem('pragyaos_current_user', JSON.stringify(newUser));
    return newUser;
  },

  async logout(): Promise<void> {
    await sleep(400);
    localStorage.removeItem('pragyaos_current_user');
  },

  async forgotPassword(email: string): Promise<void> {
    await sleep(DELAY_MS);
    if (!email.includes('@')) {
      throw new Error('Invalid email format coordinates.');
    }
  },

  async resetPassword(): Promise<void> {
    await sleep(DELAY_MS);
  },

  async verifyEmail(): Promise<void> {
    await sleep(1000);
  },

  async refreshSession(): Promise<UserProfile | null> {
    const cached = localStorage.getItem('pragyaos_current_user');
    if (!cached) return null;
    return JSON.parse(cached);
  },

  async updateProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
    await sleep(DELAY_MS);
    const cached = localStorage.getItem('pragyaos_current_user');
    if (!cached) throw new Error('No active auth session.');

    const user = { ...JSON.parse(cached), ...updates };
    localStorage.setItem('pragyaos_current_user', JSON.stringify(user));

    // Update in users database
    const registeredUsers = JSON.parse(localStorage.getItem('pragyaos_users') || '[]');
    const updatedUsers = registeredUsers.map((u: any) => u.email === user.email ? user : u);
    localStorage.setItem('pragyaos_users', JSON.stringify(updatedUsers));

    return user;
  }
};
