export interface User {
    id: string,
    profile: {
        id: number;
        identification_type: string;
        name: string;
        last_name: string;
        email: string;
        birth_date: string;
    }
    token: string;
    identification_number: string;
}