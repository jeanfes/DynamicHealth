import { Select } from "@/components/select/Select";
import { useState } from "react";

const RequestAppointment = () => {
    const [selectSpecialty, setSelectSpecialty] = useState<string>("");

    return (
        <div className="requestAppointment">
            <h1>RequestAppointment</h1>
            <p>Welcome to the RequestAppointment page!</p>
            <Select
                value={selectSpecialty}
                onChange={setSelectSpecialty}
                options={[
                    { value: "cardiology", label: "Cardiology" },
                    { value: "dermatology", label: "Dermatology" },
                    { value: "neurology", label: "Neurology" },
                    { value: "orthopedics", label: "Orthopedics" },
                    { value: "pediatrics", label: "Pediatrics" },
                ]}
            />
        </div>
    );
};

export default RequestAppointment;
