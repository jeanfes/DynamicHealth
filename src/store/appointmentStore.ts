import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Appointment } from "@/interfaces/appointment";

interface AppointmentStore {
    appointmentList: Appointment[];
    addAppointment: (appointment: Appointment) => void;
    addAppointments: (appointments: Appointment[]) => void;
    removeAppointment: (id: number) => void;
    updateAppointment: (id: number, updatedAppointment: Partial<Appointment>) => void;
}

const useAppointmentStore = create(
    persist<AppointmentStore>(
        (set) => ({
            appointmentList: [],
            addAppointment: (appointment) =>
                set((state) => {
                    if (!state.appointmentList.some((a) => a.id === appointment.id)) {
                        return {
                            appointmentList: [...state.appointmentList, appointment],
                        };
                    }
                    return state;
                }),
            addAppointments: (appointments) =>
                set((state) => {
                    const newAppointments = appointments.filter(
                        (appointment) => !state.appointmentList.some((a) => a.id === appointment.id)
                    );
                    return {
                        appointmentList: [...state.appointmentList, ...newAppointments],
                    };
                }),
            removeAppointment: (id) =>
                set((state) => ({
                    appointmentList: state.appointmentList.filter((appointment) => appointment.id !== id),
                })),
            updateAppointment: (id, updatedAppointment) =>
                set((state) => ({
                    appointmentList: state.appointmentList.map((appointment) =>
                        appointment.id === id ? { ...appointment, ...updatedAppointment } : appointment
                    ),
                })),
        }),
        {
            name: "appointment-storage",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);

export default useAppointmentStore;
