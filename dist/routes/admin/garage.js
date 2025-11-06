// import { Router } from "express";
// import multer from "multer";
// import * as Yup from "yup";
// import CarGarage from "../../models/CarGarage.js";
export {};
// const garageRoute = Router();
// import fs from "fs";
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const dir = "uploads/";
//     if (!fs.existsSync(dir)) {
//       fs.mkdirSync(dir, { recursive: true });
//     }
//     cb(null, dir);
//   },
//   filename: function (req, file, cb) {
//     const uniqueName = `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`;
//     cb(null, uniqueName);
//   },
// });
// const upload = multer({ storage });
// const garageSchema = Yup.object({
//   name: Yup.string().required("Name is required"),
//   description: Yup.string(),
//   services: Yup.array().of(Yup.string()).min(1, "At least one service is required"),
//   city: Yup.string().required("City is required"),
//   country: Yup.string().required("Country is required"),
//   phone: Yup.string().required("Phone is required"),
//   email: Yup.string().email("Invalid email format").required("Email is required"),
// });
// garageRoute.post("/create-garage",upload.array("images", 5), async (req, res) => {
//   try {
//     if (!req.body) {
//       return res.status(400).json({ message: "Missing 'data' in request body" });
//     }
//     const bodyData = req.body;
//     await garageSchema.validate(bodyData, { abortEarly: false });
//     const imagePaths = req.files?.map((file) => file.path) || [];
//     const newGarage = new CarGarage({
//       ...bodyData,
//       images: imagePaths,
//       dealer: req.user?._id || null,  
//     });
//     const savedGarage = await newGarage.save();
//     res.status(201).json({ message: "Garage created", data: savedGarage });
//   } catch (err) {
//     if (err.name === "ValidationError") {
//       return res.status(400).json({ errors: err.errors });
//     }
//     res.status(500).json({ message: "Internal server error" });
//   }
// });
// garageRoute.put("/update-garage/:id", upload.array("imageFiles", 5), async (req, res) => {
//   try {
//     const garageId = req.params.id;
//     const bodyData = req.body;
//     if (!bodyData) {
//       return res.status(400).json({ message: "Missing data in request body" });
//     }
//     let existingImages = [];
//     if (Array.isArray(bodyData.existingImageUrls)) {
//       existingImages = bodyData.existingImageUrls;
//     } else if (typeof bodyData.existingImageUrls === "string") {
//       existingImages = [bodyData.existingImageUrls];
//     }
//     const newImagePaths = req.files?.map((file) => file.path) || [];
//     const updatedData = {
//       ...bodyData,
//       images: [...existingImages, ...newImagePaths],
//       dealer: req.user?._id || null,
//     };
//     await garageSchema.validate(updatedData, { abortEarly: false });
//     const updatedGarage = await CarGarage.findByIdAndUpdate(garageId, updatedData, {
//       new: true,
//     });
//     if (!updatedGarage) {
//       return res.status(404).json({ message: "Garage not found" });
//     }
//     res.status(200).json({ message: "Garage updated", data: updatedGarage });
//   } catch (err) {
//     if (err.name === "ValidationError") {
//       return res.status(400).json({ errors: err.errors });
//     }
//     res.status(500).json({ message: "Internal server error" });
//   }
// });
// garageRoute.delete("/delete-garage/:id", async (req, res) => {
//   try {
//     const deletedGarage = await CarGarage.findByIdAndDelete(req.params.id);
//     if (!deletedGarage) {
//       return res.status(404).json({ message: "Garage not found" });
//     }
//     res.status(200).json({ message: "Garage deleted successfully" });
//   } catch (e) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// });
// garageRoute.get("/list", async (req, res) => {
//   try {
//      const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const skip = (page - 1) * limit;
//     const garages = await CarGarage.find()
//       .sort({ createdAt: -1 }) 
//       .skip(skip)
//       .limit(limit);
//     const total = await CarGarage.countDocuments();
//     res.status(200).json({
//       data: garages,
//       pagination: {
//         total,
//         page,
//         pages: Math.ceil(total / limit),
//       },
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// });
// export default garageRoute;
//# sourceMappingURL=garage.js.map