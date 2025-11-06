import * as yup from 'yup';
export declare const loginSchema: yup.ObjectSchema<{
    email: string;
    password: string;
    rememberMe: boolean | undefined;
}, yup.AnyObject, {
    email: undefined;
    password: undefined;
    rememberMe: undefined;
}, "">;
export declare const registerSchema: yup.ObjectSchema<{
    email: string;
    password: string;
    confirmPassword: string;
    fullName: string;
    phone: string | undefined;
    companyName: string | undefined;
    contactPerson: string | undefined;
    address: {
        street?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        zipCode?: string | undefined;
        country?: string | undefined;
    } | undefined;
}, yup.AnyObject, {
    email: undefined;
    password: undefined;
    confirmPassword: undefined;
    fullName: undefined;
    phone: undefined;
    companyName: undefined;
    contactPerson: undefined;
    address: {
        street: undefined;
        city: undefined;
        state: undefined;
        zipCode: undefined;
        country: undefined;
    };
}, "">;
export declare const passwordResetRequestSchema: yup.ObjectSchema<{
    email: string;
}, yup.AnyObject, {
    email: undefined;
}, "">;
export declare const passwordResetConfirmSchema: yup.ObjectSchema<{
    token: string;
    newPassword: string;
    confirmPassword: string;
}, yup.AnyObject, {
    token: undefined;
    newPassword: undefined;
    confirmPassword: undefined;
}, "">;
export declare const emailVerificationSchema: yup.ObjectSchema<{
    token: string;
}, yup.AnyObject, {
    token: undefined;
}, "">;
export declare const profileUpdateSchema: yup.ObjectSchema<{
    fullName: string | undefined;
    phone: string | undefined;
    companyName: string | undefined;
    address: {
        street?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        zipCode?: string | undefined;
        country?: string | undefined;
    } | undefined;
}, yup.AnyObject, {
    fullName: undefined;
    phone: undefined;
    companyName: undefined;
    address: {
        street: undefined;
        city: undefined;
        state: undefined;
        zipCode: undefined;
        country: undefined;
    };
}, "">;
export declare const changePasswordSchema: yup.ObjectSchema<{
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}, yup.AnyObject, {
    currentPassword: undefined;
    newPassword: undefined;
    confirmPassword: undefined;
}, "">;
