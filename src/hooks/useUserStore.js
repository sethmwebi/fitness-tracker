import { create } from "zustand";

export const useUser = create((set) => ({
  user: [],
  setuser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
