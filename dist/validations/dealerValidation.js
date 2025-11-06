import * as yup from 'yup';
const addressSchema = yup.object().shape({
    street: yup.string().nullable(),
    city: yup.string().nullable(),
    state: yup.string().nullable(),
    zipCode: yup.string().nullable(),
    country: yup.string().nullable(),
});
export const updateDealerSchema = yup.object().shape({
    companyName: yup.string().nullable(),
    fullName: yup.string().required('Full name is required'),
    contactPerson: yup.string().nullable(),
    email: yup.string().email('Invalid email').required('Email is required'),
    phone: yup.string().nullable(),
    licenseExpiry: yup.date().nullable().transform((value, originalValue) => (originalValue === '' ? null : value)),
    isVerified: yup.boolean().nullable(),
    address: addressSchema.nullable(),
});
export const createDealerSchema = yup.object().shape({
    companyName: yup.string().nullable(),
    fullName: yup.string().required('Full name is required'),
    contactPerson: yup.string().nullable(),
    email: yup.string().email('Invalid email').required('Email is required'),
    phone: yup.string().nullable(),
    licenseExpiry: yup.date().nullable(),
    isVerified: yup.boolean().nullable(),
    address: yup.object().shape({
        street: yup.string().nullable(),
        city: yup.string().nullable(),
        state: yup.string().nullable(),
        zipCode: yup.string().nullable(),
        country: yup.string().nullable(),
    }).nullable(),
});
//# sourceMappingURL=dealerValidation.js.map