import { CardDisponibility } from "@/components/cardDisponibility/CardDisponibility";
import { AlertModal } from "@/components/alertModal/AlertModal";
import { SearchBar } from "@/components/searchBar/SearchBar";
import { listDisponibilities } from "@/utilities/storage";
import { Select } from "@/components/select/Select";
import { Button } from "@/components/button/Button";
import { useState } from "react";
import "./requestAppointment.scss";

const specialties = [
    { value: "General", label: "General" },
    { value: "Cardiología", label: "Cardiología" },
    { value: "Dermatología", label: "Dermatología" },
    { value: "Neurología", label: "Neurología" },
    { value: "Pediatría", label: "Pediatría" },
];

const RequestAppointment = () => {
    const [open, setOpen] = useState(true);
    const [specialty, setSpecialty] = useState<string>("");
    const [searchValue, setSearchValue] = useState<string>("");
    const [selectedSpecialty, setSelectSpecialty] = useState<string>("");

    const sortedDisponibilities = [...listDisponibilities]
        .filter((disponibility) => disponibility.specialty === selectedSpecialty)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const filteredDisponibilities = sortedDisponibilities.filter((disponibility) => {
        if (!searchValue.trim()) return true;
        const lowerSearch = searchValue.toLowerCase();
        const doctor = disponibility.doctor.toLowerCase();
        const location = disponibility.location.toLowerCase();
        return doctor.includes(lowerSearch) || location.includes(lowerSearch);
    });

    const handleConfirmAppointment = () => {
        if (specialty) {
            setSelectSpecialty(specialty.trim());
            setOpen(false);
        }
    };

    const handleCloseModal = () => {
        if (specialty) {
            setOpen(false);
        }
    };

    return (
        <>
            {selectedSpecialty && (
                <div className="requestAppointment">
                    <h1>Solicitar cita de {selectedSpecialty}</h1>
                    <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
                    <div className="requestAppointmentList">
                        {filteredDisponibilities.length > 0 ? (
                            filteredDisponibilities.map((disponibility) => (
                                <CardDisponibility
                                    key={disponibility.id}
                                    {...disponibility}
                                />
                            ))
                        ) : (
                            <p className="notFoundDisponibilities">No se encontraron resultados.</p>
                        )}
                    </div>
                </div>
            )}
            <AlertModal
                open={open}
                type="modal"
                title="Selecciona una especialidad"
                showCloseIcon={false}
                handleClose={handleCloseModal}
                designButtonConfirmation="buttonWhite"
                textButton="Consultar disponibilidad"
                onClick={handleConfirmAppointment}
            >
                <div className="requestAppointmentAlertModal">
                    <Select
                        value={specialty}
                        onChange={setSpecialty}
                        options={specialties}
                    />
                    <Button
                        design="buttonWhite"
                        text="Consultar disponibilidad"
                        onClick={handleConfirmAppointment}
                        disabled={!specialty}
                        maxWidth
                    />
                </div>
            </AlertModal>
        </>
    );
};

export default RequestAppointment;
