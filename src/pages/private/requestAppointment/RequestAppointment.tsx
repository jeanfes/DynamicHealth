import { CardDisponibility } from "@/components/cardDisponibility/CardDisponibility";
import { AlertModal } from "@/components/alertModal/AlertModal";
import { SearchBar } from "@/components/searchBar/SearchBar";
import { listDisponibilities } from "@/utilities/storage";
import { Select } from "@/components/select/Select";
import { Button } from "@/components/button/Button";
import { useState } from "react";
import "./requestAppointment.scss";

const RequestAppointment = () => {
    const [open, setOpen] = useState(true);
    const [specialty, setSpecialty] = useState<string>("");
    const [searchValue, setSearchValue] = useState<string>("");
    const [selectedSpecialty, setSelectSpecialty] = useState<string>("");

    const sortedDisponibilities = [...listDisponibilities]
        .filter((disponibility) => disponibility.specialty === selectedSpecialty)
        .sort(
            (a, b) =>
                new Date(b.date).getTime() - new Date(a.date).getTime()
        );

    const handleConfirmAppointment = () => {
        if (specialty) {
            setSelectSpecialty(specialty.trim());
            setOpen(false);
        } else {
            return;
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
                        {sortedDisponibilities.map((disponibility) => (
                            <CardDisponibility
                                key={disponibility.id}
                                {...disponibility}
                            />
                        ))}
                    </div>
                </div>
            )}
            <AlertModal
                open={open}
                type="modal"
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
                        options={[
                            { value: "Cardiología", label: "Cardiología" },
                            { value: "Dermatología", label: "Dermatología" },
                            { value: "Neurología", label: "Neurología" },
                            { value: "Ortopedia", label: "Ortopedia" },
                            { value: "Pediatría", label: "Pediatría" },
                        ]}
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
