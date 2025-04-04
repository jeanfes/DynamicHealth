import { persist, createJSONStorage } from "zustand/middleware";
import { Availability } from "@/interfaces/availability";
import { create } from "zustand";

interface AvailabilityStore {
    availabilities: Availability[];
    addAvailabilities: (availabilities: Availability[]) => void;
    updateAvailability: (id: string, updatedData: Partial<Availability>) => void;
}

const useAvailabilityStore = create(
    persist<AvailabilityStore>(
        (set) => ({
            availabilities: [],
            addAvailabilities: (newAvailabilities) =>
                set((state) => {
                    const uniqueAvailabilities = newAvailabilities.filter(
                        (availability) => !state.availabilities.some((a) => a.id === availability.id)
                    );
                    return { availabilities: [...state.availabilities, ...uniqueAvailabilities] };
                }),

            updateAvailability: (id, updatedData) =>
                set((state) => ({
                    availabilities: state.availabilities.map((availability) =>
                        availability.id === Number(id) ? { ...availability, ...updatedData } : availability
                    ),
                })),
        }),
        {
            name: "availability-storage",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);

export default useAvailabilityStore;
