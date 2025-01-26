import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthStore {
  isAuthenticated: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const SESSION_DURATION = 24 * 60 * 60 * 1000; 

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: (user: User) => {
        const expiration = new Date().getTime() + SESSION_DURATION;
        set({ isAuthenticated: true, user });
        localStorage.setItem('auth-store-expiration', expiration.toString());
      },
      logout: () => {
        localStorage.removeItem('auth-store-expiration');
        set({ isAuthenticated: false, user: null });
      },
    }),
    {
      name: 'auth-store', 
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ isAuthenticated: state.isAuthenticated, user: state.user }),
    }
  )
);

const checkSession = () => {
  const expiration = localStorage.getItem('auth-store-expiration');
  if (expiration && new Date().getTime() > parseInt(expiration)) {
    useAuthStore.getState().logout();
  }
};

checkSession();

export default useAuthStore;
