import { createJSONStorage, persist } from "zustand/middleware";
import { User } from "../interfaces/user";
import { create } from "zustand";

interface AuthStore {
    user: User | null;
    isAuth: boolean;
    login: (user: User) => void;
    logout: () => void;
    updateProfile: (updatedUser: Partial<User>) => void;
}

export const useAuthStore = create<AuthStore>()(persist<AuthStore>((set) => {
    return {
        user: null,
        isAuth: false,
        login: (user: User) => {
            set({
                user,
                isAuth: user?.token ? true : false,
            });
        },
        logout: () => {
            set({ user: null, isAuth: false });
            sessionStorage.removeItem("auth-storage");
            localStorage.removeItem("remember-user");
        },
        updateProfile: (updatedUser: Partial<User>) => {
            set((state) => ({
                user: state.user ? { ...state.user, ...updatedUser } : null,
            }));
        }
    };
}, {
    name: "auth-storage",
    storage: createJSONStorage(() => sessionStorage),
}));
