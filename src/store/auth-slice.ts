import type { User } from "@/types/user.type";
import { create } from "zustand";

type State = {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
  clearAuth: () => void;
};

export const useAuth = create<State>((set) => ({
  isAuthenticated: false,
  user: null,
  setUser: (user) => set(() => ({ user, isAuthenticated: !!user })),
  clearAuth: () => set(() => ({ user: null, isAuthenticated: false })),
}));
