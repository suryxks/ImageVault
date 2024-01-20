import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../types";

interface AuthState {
  user: User;
  isAuthenticated: boolean;
  token: string;
  updateUser: (user: User) => void;
  updateIsAuthenticated: (isAuthenticated: boolean) => void;
  updateToken: (token: string) => void;
}
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: {
        email: "",
        firstname: "",
        lastname: "",
      },
      isAuthenticated: false,
      token: "",
      updateUser: (user: User) => set(() => ({ user: user })),
      updateIsAuthenticated: (isAuthenticated: boolean) =>
        set(() => ({ isAuthenticated: isAuthenticated })),
      updateToken: (token: string) => set(() => ({ token: token })),
    }),
    {
      name: "user",
    },
  ),
);
