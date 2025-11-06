import * as yup from "yup";

export const publicSchema = yup.object().shape({
  id: yup.string().required("Vehicle ID is required"),
  isPublic: yup.boolean().required("Public status is required"),
});
