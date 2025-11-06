import Car from "../models/Car.js";
import { vehicaleSchema } from "../validations/vehicaleValidation.js";
// Updated to use Cloudinary instead of Google Cloud Storage
import uploadFileToGCS, { deleteFileFromGCS } from '../utils/googleCloud.js';
import CommunityPost from "../models/Community.js";
import Dealer from "../models/Dealer.js";
const vehicaleController = {
    async getVehicales(req, res) {
        try {
            const { sort = "-createdAt", type, isAvailable, search } = req.query;
            const query = {};
            if (type)
                query.type = type;
            if (isAvailable !== undefined)
                query.isAvailable = isAvailable === "true";
            if (search) {
                query.$or = [
                    { title: { $regex: search, $options: "i" } },
                    { brand: { $regex: search, $options: "i" } },
                    { model: { $regex: search, $options: "i" } },
                ];
            }
            const sortField = sort.startsWith('-') ? sort.slice(1) : sort;
            const sortOrder = sort.startsWith('-') ? -1 : 1;
            // Fetch vehicles with pagination and sorting
            const vehicales = await Car.find()
                .sort({ [sortField]: sortOrder });
            // Get total count of vehicles
            const total = await Car.find(query);
            // Respond with the vehicles data and pagination info
            res.status(200).json({
                data: vehicales,
                totalCount: total,
            });
        }
        catch {
            // Log error and respond with a 500 status code
            res.status(500).json({ message: "Internal server error" });
        }
    },
    async getShareVehicales(req, res) {
        try {
            const { sort = "-createdAt", type, isAvailable, search } = req.query;
            const query = {};
            if (type)
                query.type = type;
            if (isAvailable !== undefined)
                query.isAvailable = isAvailable === "true";
            if (search) {
                query.$or = [
                    { title: { $regex: search, $options: "i" } },
                    { brand: { $regex: search, $options: "i" } },
                    { model: { $regex: search, $options: "i" } },
                ];
            }
            const sortField = sort.startsWith('-') ? sort.slice(1) : sort;
            const sortOrder = sort.startsWith('-') ? -1 : 1;
            // Fetch vehicles with pagination and sorting
            const vehicales = await Car.find()
                .sort({ [sortField]: sortOrder });
            // Get total count of vehicles
            const total = await Car.find(query);
            // Respond with the vehicles data and pagination info
            res.status(200).json({
                data: vehicales,
                totalCount: total,
            });
        }
        catch {
            // Log error and respond with a 500 status code
            res.status(500).json({ message: "Internal server error" });
        }
    },
    async getVehicaleBySlug(req, res) {
        const { slug } = req.params;
        try {
            const car = await Car.findOne({ slug });
            if (!car) {
                return res.status(404).json({ message: "Car not found" });
            }
            const orConditions = [];
            if (car.brand && car.model) {
                orConditions.push({ brand: car.brand, model: car.model });
            }
            if (car.brand && car.year) {
                orConditions.push({ brand: car.brand, year: { $gte: car.year - 2, $lte: car.year + 2 } });
            }
            if (car.brand && car.fuelType) {
                orConditions.push({ brand: car.brand, fuelType: car.fuelType });
            }
            if (car.brand && car.transmission) {
                orConditions.push({ brand: car.brand, transmission: car.transmission });
            }
            if (car.features && Array.isArray(car.features) && car.features.length > 0) {
                if (car.brand) {
                    orConditions.push({ brand: car.brand, features: { $in: car.features } });
                }
                else {
                    orConditions.push({ features: { $in: car.features } });
                }
            }
            if (car.title) {
                if (car.brand) {
                    orConditions.push({ brand: car.brand, title: car.title });
                }
                else {
                    orConditions.push({ title: car.title });
                }
            }
            let relatedCars = []; // Using unknown instead of any
            if (orConditions.length > 0) {
                const uniqueOrConditions = orConditions.filter((condition, index, self) => index === self.findIndex((c) => JSON.stringify(c) === JSON.stringify(condition)));
                if (uniqueOrConditions.length > 0) {
                    const relatedQuery = {
                        _id: { $ne: car._id },
                        $or: uniqueOrConditions
                    };
                    relatedCars = await Car.find(relatedQuery)
                        .limit(10)
                        .exec();
                }
            }
            if (relatedCars.length === 0 && orConditions.length === 0 && car.brand) {
                relatedCars = await Car.find({
                    _id: { $ne: car._id },
                    brand: car.brand
                }).limit(10).exec();
            }
            res.status(200).json({ car, relatedCars });
        }
        catch {
            res.status(500).json({ message: "Server error" });
        }
    },
    async getVehicaleById(req, res) {
        try {
            const vehicale = await Car.findById(req.params.id);
            if (!vehicale)
                return res.status(404).json({ message: "Car not found" });
            vehicale.views += 1;
            await vehicale.save();
            res.status(200).json(vehicale);
        }
        catch {
            res.status(500).json({ message: "Internal server error" });
        }
    },
    async createVehicale(req, res) {
        try {
            if (typeof req.body.location === 'string') {
                req.body.location = JSON.parse(req.body.location);
            }
            if (typeof req.body.location === 'object' && req.body.location?.coordinates && typeof req.body.location.coordinates === 'string') {
                req.body.location.coordinates = JSON.parse(req.body.location.coordinates);
            }
            if (typeof req.body.documents === 'string') {
                req.body.documents = JSON.parse(req.body.documents);
            }
            if (typeof req.body.features === 'string') {
                req.body.features = JSON.parse(req.body.features);
            }
            if (req.body.views) {
                req.body.views = Number(req.body.views);
            }
            await vehicaleSchema.validate(req.body, { abortEarly: false });
            const files = Array.isArray(req.files) ? req.files : req.files?.media || [];
            if (!files || files.length === 0) {
                return res.status(400).json({ message: "At least one image is required." });
            }
            // Check if Cloudinary is configured by looking for path property
            const isCloudinaryUpload = files[0] && files[0].path;
            let media;
            if (isCloudinaryUpload) {
                // With Cloudinary storage, files are already uploaded and URLs are available
                media = files.map((file) => {
                    const url = file.path; // Cloudinary provides the URL in the path property
                    const type = file.mimetype.startsWith("video") ? "video" : "image";
                    return { type, url };
                });
            }
            else {
                // With memory storage, upload to Cloudinary manually
                media = await Promise.all(files.map(async (file) => {
                    const url = await uploadFileToGCS(file);
                    const type = file.mimetype.startsWith("video") ? "video" : "image";
                    return { type, url };
                }));
            }
            const vehicaleData = {
                ...req.body,
                media,
                postedBy: req.user?._id,
            };
            const vehicale = new Car(vehicaleData);
            const savedVehicale = await vehicale.save();
            // Assign this car to the dealer
            if (req.user?._id) {
                await Dealer.findByIdAndUpdate(req.user._id, { $push: { carsPosted: savedVehicale._id } });
                const post = new CommunityPost({
                    text: req.body.title,
                    privacy: 'Public',
                    region: 'Global',
                    media,
                    dealerId: req.user._id,
                    car: savedVehicale._id,
                });
                await post.save();
            }
            res.status(201).json(savedVehicale);
        }
        catch (error) {
            if (error.name === "ValidationError") {
                const validationError = error;
                const errors = validationError.inner?.map((e) => ({
                    field: e.path,
                    message: e.message,
                })) || [];
                return res.status(400).json({ errors });
            }
            res.status(400).json({ message: error.message });
        }
    },
    async vehicalePublicChange(req, res) {
        try {
            const { id, isPublic } = req.body;
            if (!id || typeof isPublic !== 'boolean') {
                return res.status(400).json({ message: "Invalid request data" });
            }
            const updatedVehicle = await Car.findByIdAndUpdate(id, { public: isPublic }, { new: true, runValidators: true } // new: returns the updated doc; runValidators: validates against schema
            );
            if (!updatedVehicle) {
                return res.status(404).json({ message: "Car not found" });
            }
            res.status(200).json({ message: "Visibility updated", vehicle: updatedVehicle });
        }
        catch {
            res.status(500).json({ message: "Internal server error" });
        }
    },
    async updateVehicale(req, res) {
        try {
            // console.log('Update vehicle request:', {
            //     id: req.params.id,
            //     files: req.files ? (Array.isArray(req.files) ? req.files.length : Object.keys(req.files).length) : 0,
            //     existingImageUrls: req.body.existingImageUrls,
            //     bodyKeys: Object.keys(req.body),
            //     reqFiles: req.files,
            //     reqBody: req.body
            // });
            if (typeof req.body.location === 'string') {
                req.body.location = JSON.parse(req.body.location);
            }
            if (typeof req.body.location === 'object' && req.body.location?.coordinates && typeof req.body.location.coordinates === 'string') {
                req.body.location.coordinates = JSON.parse(req.body.location.coordinates);
            }
            if (typeof req.body.documents === 'string') {
                req.body.documents = JSON.parse(req.body.documents);
            }
            if (typeof req.body.features === 'string') {
                req.body.features = JSON.parse(req.body.features);
            }
            if (req.body.views) {
                req.body.views = Number(req.body.views);
            }
            await vehicaleSchema.validate(req.body, { abortEarly: false });
            const existingVehicle = await Car.findById(req.params.id);
            if (!existingVehicle) {
                return res.status(404).json({ message: "Car not found" });
            }
            const files = Array.isArray(req.files) ? req.files : req.files?.media || [];
            let newMedia = [];
          //  console.log('Files received:', files.length);
          //  console.log('Existing vehicle media:', existingVehicle.media?.length || 0);
            // Handle new file uploads
            if (files.length > 0) {
                // Check if Cloudinary is configured by looking for path property
                const isCloudinaryUpload = files[0] && files[0].path;
                if (isCloudinaryUpload) {
                    // With Cloudinary storage, files are already uploaded and URLs are available
                    newMedia = files.map((file) => {
                        const url = file.path; // Cloudinary provides the URL in the path property
                        const type = file.mimetype.startsWith("video") ? "video" : "image";
                      //  console.log('New media file (Cloudinary):', { url, type, originalname: file.originalname });
                        return { type, url };
                    });
                }
                else {
                    // With memory storage, upload to Cloudinary manually
                    newMedia = await Promise.all(files.map(async (file) => {
                        const url = await uploadFileToGCS(file);
                        const type = file.mimetype.startsWith("video") ? "video" : "image";
                      //  console.log('New media file (Memory->Cloudinary):', { url, type, originalname: file.originalname });
                        return { type, url };
                    }));
                }
            }
            // Handle existing images - check if existingImageUrls is provided
            let retainedMedia = [];
            let removedMedia = [];
            if (req.body.existingImageUrls) {
                // If existingImageUrls is provided, use it to determine which images to keep
                const incomingUrls = Array.isArray(req.body.existingImageUrls)
                    ? req.body.existingImageUrls.map((m) => typeof m === 'string' ? m : m.url)
                    : [];
                retainedMedia = (existingVehicle.media || []).filter(m => incomingUrls.includes(m.url));
                removedMedia = (existingVehicle.media || []).filter(m => !incomingUrls.includes(m.url));
            }
            else {
                // If no existingImageUrls provided, keep all existing media
                retainedMedia = existingVehicle.media || [];
            }
            // Delete removed media files from Cloudinary
            for (const item of removedMedia) {
                try {
                    await deleteFileFromGCS(item.url);
                }
                catch (error) {
                    console.error('Error deleting file from Cloudinary:', error);
                    // Continue even if deletion fails
                }
            }
            // Combine retained and new media
            const updatedMedia = [...retainedMedia, ...newMedia];
        //    console.log('Media summary:', {
        //         retained: retainedMedia.length,
        //         new: newMedia.length,
        //         total: updatedMedia.length,
        //         removed: removedMedia.length
        //     });
            const updatedData = {
                ...req.body,
                media: updatedMedia
            };
            // Remove undefined values to avoid overwriting with undefined
            Object.keys(updatedData).forEach(key => {
                if (updatedData[key] === undefined) {
                    delete updatedData[key];
                }
            });
            const updatedVehicle = await Car.findByIdAndUpdate(req.params.id, updatedData, {
                new: true,
                runValidators: true,
            });
            if (!updatedVehicle) {
                return res.status(404).json({ message: "Vehicle not found" });
            }
            res.status(200).json({
                message: "Vehicle updated successfully",
                vehicle: updatedVehicle
            });
        }
        catch (error) {
            if (error.name === "ValidationError") {
                const validationError = error;
                const errors = validationError.inner?.map((e) => ({
                    field: e.path,
                    message: e.message,
                })) || [];
                return res.status(400).json({ errors });
            }
            res.status(400).json({ message: error.message });
        }
    },
    async deleteVehicale(req, res) {
        try {
            const vehicale = await Car.findByIdAndDelete(req.params.id);
            if (!vehicale)
                return res.status(404).json({ message: "Car not found" });
            res.status(200).json({ message: "Car deleted successfully" });
        }
        catch {
            res.status(500).json({ message: "Internal server error" });
        }
    },
};
export default vehicaleController;
//# sourceMappingURL=vehicaleController.js.map