// import express from "express";
// import multer from "multer";
// import * as yup from "yup";
// import SparePart from "../../models/SparePart.js";
// import fs from "fs";
// import path from "path";
export {};
// const sparePartsRouter= express.Router();
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
// const schema = yup.object({
//   name: yup.string().required(),
//   partNumber: yup.string().required(),
//   description: yup.string().nullable(),
//   price: yup.number().required(),
//   quantityInStock: yup.number().default(0),
//   condition: yup.string().oneOf(["New", "Used", "Refurbished"]).required(),
//   compatibleCars: yup.array().of(yup.string()),
//   category: yup.string().required(),
//   isAvailable: yup.boolean(),
// });
// sparePartsRouter.post("/", upload.array("imageFiles", 5), async (req, res) => {
//   try {
//     const imagePaths = req.files?.map((file) => file.path) || [];
//     const {
//       name,
//       partNumber,
//       description,
//       price,
//       quantityInStock,
//       condition,
//       dealer,
//       category,
//       isAvailable,
//     } = req.body;
//     let compatibleCars = [];
//     if (typeof req.body.compatibleCars === "string") {
//       compatibleCars = req.body.compatibleCars.split(",").map((car) => car.trim());
//     } else if (Array.isArray(req.body.compatibleCars)) {
//       compatibleCars = req.body.compatibleCars.map((car) => car.trim());
//     }
//     const data = {
//       name,
//       partNumber,
//       description,
//       price,
//       quantityInStock,
//       condition,
//       compatibleCars,
//       dealer:req.user._id,
//       category,
//       isAvailable: isAvailable === "true" || isAvailable === true,
//       images:imagePaths,
//     };
//     await schema.validate(data, { abortEarly: false });
//     const newPart = new SparePart(data);
//     await newPart.save();
//     res.status(201).json({ message: "Spare part created", data: newPart });
//   } catch (err) {
//     res.status(400).json({ error: err.errors || "Validation error" });
//   }
// });
// sparePartsRouter.get("/list", async (req, res) => {
//   try {
//      const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const skip = (page - 1) * limit;
//     const garages = await SparePart.find()
//       .sort({ createdAt: -1 }) 
//       .skip(skip)
//       .limit(limit);
//     const total = await SparePart.countDocuments();
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
// sparePartsRouter.put("/:id", upload.array("imageFiles", 5), async (req, res) => {
//   try {
//     const partId = req.params.id;
//     const imagePaths = req.files?.map((file) => file.path) || [];
//     const {
//       name,
//       partNumber,
//       description,
//       price,
//       quantityInStock,
//       condition,
//       dealer,
//       category,
//       isAvailable,
//       existingImageUrls, 
//     } = req.body;
//     let compatibleCars = [];
//     if (typeof req.body.compatibleCars === "string") {
//       compatibleCars = req.body.compatibleCars.split(",").map((car) => car.trim());
//     } else if (Array.isArray(req.body.compatibleCars)) {
//       compatibleCars = req.body.compatibleCars.map((car) => car.trim());
//     }
//     const images = [
//       ...(Array.isArray(existingImageUrls)
//         ? existingImageUrls
//         : typeof existingImageUrls === "string"
//         ? [existingImageUrls]
//         : []),
//       ...imagePaths,
//     ];
//     const data = {
//       name,
//       partNumber,
//       description,
//       price,
//       quantityInStock,
//       condition,
//       compatibleCars,
//       dealer: req.user._id,
//       category,
//       isAvailable: isAvailable === "true" || isAvailable === true,
//       images,
//     };
//     await schema.validate(data, { abortEarly: false });
//     const updatedPart = await SparePart.findByIdAndUpdate(partId, data, {
//       new: true,
//     });
//     if (!updatedPart) {
//       return res.status(404).json({ error: "Spare part not found" });
//     }
//     res.status(200).json({ message: "Spare part updated", data: updatedPart });
//   } catch (err) {
//     res.status(400).json({ error: err.errors || "Update failed" });
//   }
// });
// sparePartsRouter.delete("/:id", async (req, res) => {
//   try {
//     const deletedSpareParts = await SparePart.findByIdAndDelete(req.params.id);
//     if (!deletedSpareParts) {
//       return res.status(404).json({ message: "SpareParts not found" });
//     }
//     res.status(200).json({ message: "SpareParts deleted successfully" });
//   } catch (e) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// });
// export default sparePartsRouter;
//# sourceMappingURL=spareparts.js.map