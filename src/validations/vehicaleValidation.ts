import * as yup from "yup";
 

export const vehicaleSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  // type: yup.string().oneOf(["rent", "sell"]).required("Type is required"),
  price: yup.number().required("Price is required"),
  priceNegotiable: yup.boolean(),
  vinNumber:yup.string().nullable(),
  location: yup.object({
    country: yup.string().required("Country is required"),
    state: yup.string().nullable(),
    city: yup.string().required("City is required"),
    area: yup.string().nullable(),
    addressLine: yup.string().nullable(),
    coordinates: yup.object({
      lat: yup.number().nullable(),
      lng: yup.number().nullable(),
    }).nullable(),
  }).required("Location is required"),

  description: yup.string().nullable(),

  brand: yup.string().required("Brand is required"),
  model: yup.string().required("Model is required"),
  year: yup.number().required("Year is required"),
  mileage: yup.number().nullable(),
  condition: yup.string().oneOf(["New", "Used"]).nullable(),

  fuelType: yup.string().nullable(),
  transmission: yup.string().nullable(),
  seats: yup.number().nullable(),
  color: yup.string().nullable(),

  // media: yup.array().of(
  //   yup.object().shape({
  //     type: yup.string().oneOf(["image", "video"]).required("Media type is required"),
  //     url: yup.string().url().required("Media URL is required"),
  //   })
  // ).min(1, "At least one media item is required"),

  videoUrl: yup.string().url().nullable(),

  documents: yup.object({
    registrationNumber: yup.string().nullable(),
    registrationExpiry: yup.date().nullable(),
    insuranceExpiry: yup.date().nullable(),
    pollutionCertificateExpiry: yup.date().nullable(),
  }).nullable(),

  features: yup.array().of(yup.string()).nullable(),
  isAvailable: yup.boolean(),
   
  contactPhone: yup.string().nullable(),
  contactEmail: yup.string().email().nullable(),
  views: yup.number(),
})