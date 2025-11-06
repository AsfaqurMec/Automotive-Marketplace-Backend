import * as yup from "yup";
export declare const vehicaleSchema: yup.ObjectSchema<{
    title: string;
    price: number;
    priceNegotiable: boolean | undefined;
    vinNumber: string | null | undefined;
    location: {
        state?: string | null | undefined;
        area?: string | null | undefined;
        addressLine?: string | null | undefined;
        city: string;
        country: string;
        coordinates: {
            lng?: number | null | undefined;
            lat?: number | null | undefined;
        } | null;
    };
    description: string | null | undefined;
    brand: string;
    model: string;
    year: number;
    mileage: number | null | undefined;
    condition: "New" | "Used" | null | undefined;
    fuelType: string | null | undefined;
    transmission: string | null | undefined;
    seats: number | null | undefined;
    color: string | null | undefined;
    videoUrl: string | null | undefined;
    documents: {
        registrationNumber?: string | null | undefined;
        registrationExpiry?: Date | null | undefined;
        insuranceExpiry?: Date | null | undefined;
        pollutionCertificateExpiry?: Date | null | undefined;
    } | null;
    features: (string | undefined)[] | null | undefined;
    isAvailable: boolean | undefined;
    contactPhone: string | null | undefined;
    contactEmail: string | null | undefined;
    views: number | undefined;
}, yup.AnyObject, {
    title: undefined;
    price: undefined;
    priceNegotiable: undefined;
    vinNumber: undefined;
    location: {
        country: undefined;
        state: undefined;
        city: undefined;
        area: undefined;
        addressLine: undefined;
        coordinates: {
            lat: undefined;
            lng: undefined;
        };
    };
    description: undefined;
    brand: undefined;
    model: undefined;
    year: undefined;
    mileage: undefined;
    condition: undefined;
    fuelType: undefined;
    transmission: undefined;
    seats: undefined;
    color: undefined;
    videoUrl: undefined;
    documents: {
        registrationNumber: undefined;
        registrationExpiry: undefined;
        insuranceExpiry: undefined;
        pollutionCertificateExpiry: undefined;
    };
    features: "";
    isAvailable: undefined;
    contactPhone: undefined;
    contactEmail: undefined;
    views: undefined;
}, "">;
