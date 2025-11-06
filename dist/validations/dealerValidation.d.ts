import * as yup from 'yup';
export declare const updateDealerSchema: yup.ObjectSchema<{
    companyName: string | null | undefined;
    fullName: string;
    contactPerson: string | null | undefined;
    email: string;
    phone: string | null | undefined;
    licenseExpiry: Date | null | undefined;
    isVerified: boolean | null | undefined;
    address: {
        street?: string | null | undefined;
        city?: string | null | undefined;
        state?: string | null | undefined;
        zipCode?: string | null | undefined;
        country?: string | null | undefined;
    } | null;
}, yup.AnyObject, {
    companyName: undefined;
    fullName: undefined;
    contactPerson: undefined;
    email: undefined;
    phone: undefined;
    licenseExpiry: undefined;
    isVerified: undefined;
    address: {
        street: undefined;
        city: undefined;
        state: undefined;
        zipCode: undefined;
        country: undefined;
    };
}, "">;
export declare const createDealerSchema: yup.ObjectSchema<{
    companyName: string | null | undefined;
    fullName: string;
    contactPerson: string | null | undefined;
    email: string;
    phone: string | null | undefined;
    licenseExpiry: Date | null | undefined;
    isVerified: boolean | null | undefined;
    address: {
        street?: string | null | undefined;
        city?: string | null | undefined;
        state?: string | null | undefined;
        zipCode?: string | null | undefined;
        country?: string | null | undefined;
    } | null;
}, yup.AnyObject, {
    companyName: undefined;
    fullName: undefined;
    contactPerson: undefined;
    email: undefined;
    phone: undefined;
    licenseExpiry: undefined;
    isVerified: undefined;
    address: {
        street: undefined;
        city: undefined;
        state: undefined;
        zipCode: undefined;
        country: undefined;
    };
}, "">;
