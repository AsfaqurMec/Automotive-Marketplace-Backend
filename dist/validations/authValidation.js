import * as yup from 'yup';
// Login validation schema
export const loginSchema = yup.object({
    email: yup
        .string()
        .email('Please enter a valid email address')
        .required('Email is required'),
    password: yup
        .string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    rememberMe: yup.boolean().optional(),
});
// Registration validation schema
export const registerSchema = yup.object({
    email: yup
        .string()
        .email('Please enter a valid email address')
        .required('Email is required'),
    password: yup
        .string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
        .required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('Please confirm your password'),
    fullName: yup
        .string()
        .min(2, 'Full name must be at least 2 characters')
        .max(50, 'Full name must be less than 50 characters')
        .required('Full name is required'),
    phone: yup
        .string()
        .matches(/^\+?[\d\s\-\(\)]+$/, 'Please enter a valid phone number')
        .optional(),
    companyName: yup
        .string()
        .min(2, 'Company name must be at least 2 characters')
        .max(100, 'Company name must be less than 100 characters')
        .optional(),
    contactPerson: yup
        .string()
        .min(2, 'Contact person name must be at least 2 characters')
        .max(50, 'Contact person name must be less than 50 characters')
        .optional(),
    address: yup.object({
        street: yup.string().optional(),
        city: yup.string().optional(),
        state: yup.string().optional(),
        zipCode: yup.string().optional(),
        country: yup.string().optional(),
    }).optional(),
});
// Password reset request schema
export const passwordResetRequestSchema = yup.object({
    email: yup
        .string()
        .email('Please enter a valid email address')
        .required('Email is required'),
});
// Password reset confirmation schema
export const passwordResetConfirmSchema = yup.object({
    token: yup
        .string()
        .required('Reset token is required'),
    newPassword: yup
        .string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
        .required('New password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('newPassword')], 'Passwords must match')
        .required('Please confirm your new password'),
});
// Email verification schema
export const emailVerificationSchema = yup.object({
    token: yup
        .string()
        .required('Verification token is required'),
});
// Profile update schema
export const profileUpdateSchema = yup.object({
    fullName: yup
        .string()
        .min(2, 'Full name must be at least 2 characters')
        .max(50, 'Full name must be less than 50 characters')
        .optional(),
    phone: yup
        .string()
        .matches(/^\+?[\d\s\-\(\)]+$/, 'Please enter a valid phone number')
        .optional(),
    companyName: yup
        .string()
        .min(2, 'Company name must be at least 2 characters')
        .max(100, 'Company name must be less than 100 characters')
        .optional(),
    address: yup.object({
        street: yup.string().optional(),
        city: yup.string().optional(),
        state: yup.string().optional(),
        zipCode: yup.string().optional(),
        country: yup.string().optional(),
    }).optional(),
});
// Change password schema
export const changePasswordSchema = yup.object({
    currentPassword: yup
        .string()
        .required('Current password is required'),
    newPassword: yup
        .string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
        .required('New password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('newPassword')], 'Passwords must match')
        .required('Please confirm your new password'),
});
//# sourceMappingURL=authValidation.js.map