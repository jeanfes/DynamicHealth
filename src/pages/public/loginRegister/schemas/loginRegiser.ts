import * as Yup from 'yup';

export const loginValidationSchema = Yup.object({
    loginIdentificationNumber: Yup.string().required('El número de identificación es requerido'),
    loginBirthDate: Yup.string()
        .required('La fecha de nacimiento es requerida')
        .matches(
            /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/,
            'Formato de fecha inválido (dd/mm/yyyy)'
        ),
});

export const signupValidationSchema = Yup.object({
    registerIdentificationNumber: Yup.string().required('El número de identificación es requerido'),
    registerBirthDate: Yup.string()
        .required('La fecha de nacimiento es requerida')
        .matches(
            /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/,
            'Formato de fecha inválido (dd/mm/yyyy)'
        ),
});
