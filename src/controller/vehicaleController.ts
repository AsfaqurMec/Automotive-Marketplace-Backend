import { Response } from 'express';
import Car from "../models/Car.js";
import { vehicaleSchema } from "../validations/vehicaleValidation.js";
// Updated to use Cloudinary instead of Google Cloud Storage
import uploadFileToGCS, { deleteFileFromGCS } from '../utils/googleCloud.js';
import CommunityPost from "../models/Community.js";
import Dealer from "../models/Dealer.js";
import { 
  VehicleRequest, 
  AuthenticatedVehicleRequest, 
  VehicleMedia
} from '../types/index.js';

// Internal query interface for the controller
interface VehicleQuery {
  type?: string;
  isAvailable?: boolean;
  $or?: Array<{ [key: string]: { $regex: string; $options: string } }>;
}

const vehicaleController = {
  
  async getPublicVehicales(req: VehicleRequest, res: Response) {
   // console.log('getPublicVehicales');
    try {
      const { sort = "-createdAt", type, isAvailable, search } = req.query;
        
    //  const query: VehicleQuery = { public: true };
    const query: VehicleQuery = {};
      if (type) query.type = type;
      if (isAvailable !== undefined) query.isAvailable = isAvailable === "true";
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: "i" } },
          { brand: { $regex: search, $options: "i" } },
          { model: { $regex: search, $options: "i" } },
        ];
      }
  
      const sortField = (sort as string).startsWith('-') ? (sort as string).slice(1) : sort;
      const sortOrder = (sort as string).startsWith('-') ? -1 : 1;
  
      // Fetch vehicles with pagination and sorting
      const vehicales = await Car.find(query)
        .sort({ [sortField]: sortOrder });
   
      // Get total count of vehicles
      const total = await Car.find(query);
      // Respond with the vehicles data and pagination info
      res.status(200).json({
        data: vehicales,
        totalCount: total,
      });
    } catch (error) {
   //   console.log('Error in getPublicVehicales:', error);
      // Log error and respond with a 500 status code
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async getVehicales(req: VehicleRequest, res: Response) {
    try {
      const { sort = "-createdAt", type, isAvailable, search } = req.query;
        
      const query: VehicleQuery = {};
      if (type) query.type = type;
      if (isAvailable !== undefined) query.isAvailable = isAvailable === "true";
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: "i" } },
          { brand: { $regex: search, $options: "i" } },
          { model: { $regex: search, $options: "i" } },
        ];
      }
  
      const sortField = (sort as string).startsWith('-') ? (sort as string).slice(1) : sort;
      const sortOrder = (sort as string).startsWith('-') ? -1 : 1;
  
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
    } catch {
      // Log error and respond with a 500 status code
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async getShareVehicales(req: VehicleRequest, res: Response) {
    try {
      const { sort = "-createdAt", type, isAvailable, search } = req.query;
        
      const query: VehicleQuery = {};
      if (type) query.type = type;
      if (isAvailable !== undefined) query.isAvailable = isAvailable === "true";
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: "i" } },
          { brand: { $regex: search, $options: "i" } },
          { model: { $regex: search, $options: "i" } },
        ];
      }
  
      const sortField = (sort as string).startsWith('-') ? (sort as string).slice(1) : sort;
      const sortOrder = (sort as string).startsWith('-') ? -1 : 1;
  
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
    } catch {
      // Log error and respond with a 500 status code
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async getVehicaleBySlug(req: VehicleRequest, res: Response) {
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
        } else {
          orConditions.push({ features: { $in: car.features } });
        }
      }
  
      if (car.title) {  
        if (car.brand) {
          orConditions.push({ brand: car.brand, title: car.title });
        } else {
          orConditions.push({ title: car.title });
        }
      }
  
      let relatedCars: unknown[] = []; // Using unknown instead of any
      if (orConditions.length > 0) {
        const uniqueOrConditions = orConditions.filter((condition, index, self) =>
          index === self.findIndex((c) => JSON.stringify(c) === JSON.stringify(condition))
        );
  
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
  
    } catch {
      res.status(500).json({ message: "Server error" });
    }
  },

  async getVehicaleById(req: VehicleRequest, res: Response) {
    try {
      const vehicale = await Car.findById(req.params.id);
      if (!vehicale) return res.status(404).json({ message: "Car not found" });

      vehicale.views += 1;
      await vehicale.save();

      res.status(200).json(vehicale);
    } catch {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async createVehicale(req: AuthenticatedVehicleRequest, res: Response) {
    console.log('createVehicale');
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
      const isCloudinaryUpload = files[0] && (files[0] as any).path;
      
      let media;
      if (isCloudinaryUpload) {
        // With Cloudinary storage, files are already uploaded and URLs are available
        media = files.map((file: Express.Multer.File) => {
          const url = (file as any).path; // Cloudinary provides the URL in the path property
          const type = file.mimetype.startsWith("video") ? "video" : "image";
          return { type, url };
        });
      } else {
        // With memory storage, upload to Cloudinary manually
        media = await Promise.all(
          files.map(async (file: Express.Multer.File) => {
            const url = await uploadFileToGCS(file);
            const type = file.mimetype.startsWith("video") ? "video" : "image";
            return { type, url };
          })
        );
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
        await Dealer.findByIdAndUpdate(
          req.user._id,
          { $push: { carsPosted: savedVehicale._id } }
        );

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

    } catch (error) {
      console.log('Error in createVehicale:', error);
      if ((error as Error).name === "ValidationError") {
        const validationError = error as { inner?: Array<{ path: string; message: string }> };
        const errors = validationError.inner?.map((e: { path: string; message: string }) => ({
          field: e.path,
          message: e.message,
        })) || [];
        return res.status(400).json({ errors });
      }

      res.status(400).json({ message: (error as Error).message });
    }
  },

  async vehicalePublicChange(req: AuthenticatedVehicleRequest, res: Response) {
    try {
      const { id, isPublic } = req.body;

      if (!id || typeof isPublic !== 'boolean') {
        return res.status(400).json({ message: "Invalid request data" });
      }

      const updatedVehicle = await Car.findByIdAndUpdate(
        id,
        { public: isPublic },
        { new: true, runValidators: true } // new: returns the updated doc; runValidators: validates against schema
      );

      if (!updatedVehicle) {
        return res.status(404).json({ message: "Car not found" });
      }

      res.status(200).json({ message: "Visibility updated", vehicle: updatedVehicle });
    } catch {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async updateVehicale(req: AuthenticatedVehicleRequest, res: Response) {
    try {
      // console.log('Update vehicle request:', {
      //   id: req.params.id,
      //   files: req.files ? (Array.isArray(req.files) ? req.files.length : Object.keys(req.files).length) : 0,
      //   existingImageUrls: req.body.existingImageUrls,
      //   bodyKeys: Object.keys(req.body),
      //   reqFiles: req.files,
      //   reqBody: req.body
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

      // Handle features array - could be string, array, or object with keys like 'features[]'
      if (req.body.features) {
        if (typeof req.body.features === 'string') {
          try {
            req.body.features = JSON.parse(req.body.features);
          } catch {
            // If not JSON, treat as single item array
            req.body.features = [req.body.features];
          }
        } else if (!Array.isArray(req.body.features)) {
          // Handle case where features might be an object with array-like keys
          const featuresObj = req.body.features;
          if (typeof featuresObj === 'object') {
            const featureValues = Object.values(featuresObj);
            req.body.features = featureValues.filter(f => f && typeof f === 'string');
          }
        }
      } else {
        // Handle features[] format (common in form data)
        const featuresKeys = Object.keys(req.body).filter(key => key.startsWith('features'));
        if (featuresKeys.length > 0) {
          req.body.features = featuresKeys
            .map(key => req.body[key])
            .filter(f => f && typeof f === 'string');
          // Remove the individual features[] keys
          featuresKeys.forEach(key => delete req.body[key]);
        }
      }

      // Parse existingImageUrls - handle array format like existingImageUrls[0], existingImageUrls[1]
      if (req.body.existingImageUrls) {
        if (typeof req.body.existingImageUrls === 'string') {
          try {
            req.body.existingImageUrls = JSON.parse(req.body.existingImageUrls);
          } catch (error) {
            console.error('Error parsing existingImageUrls:', error);
            req.body.existingImageUrls = undefined;
          }
        }
      } else {
        // Check for array format: existingImageUrls[0], existingImageUrls[1], etc.
        const existingImageKeys = Object.keys(req.body).filter(key => key.startsWith('existingImageUrls['));
        if (existingImageKeys.length > 0) {
          req.body.existingImageUrls = existingImageKeys
            .sort() // Sort to maintain order [0], [1], [2]...
            .map(key => req.body[key])
            .filter(url => url && typeof url === 'string');
          // Remove the individual keys
          existingImageKeys.forEach(key => delete req.body[key]);
        }
      }

      if (req.body.views) {
        req.body.views = Number(req.body.views);
      }

      // Get existing vehicle first to have access to current media
      const existingVehicle = await Car.findById(req.params.id);
      if (!existingVehicle) {
        return res.status(404).json({ message: "Car not found" });
      }

      // Clean up media-related fields from body (they should only come as files)
      // Remove any media, media[], or similar fields that might be string values
      Object.keys(req.body).forEach(key => {
        if (key.toLowerCase().includes('media') && typeof req.body[key] === 'string') {
          delete req.body[key];
        }
      });
      
      // Temporarily remove media from body for validation (we'll construct it properly later)
      delete req.body.media;

      await vehicaleSchema.validate(req.body, { abortEarly: false });

      // Don't restore originalMedia - we'll construct it from files instead

      // Extract files from req.files - handle various formats
      let files: Express.Multer.File[] = [];
      if (req.files) {
        if (Array.isArray(req.files)) {
          files = req.files;
        } else if (req.files.media) {
          // Handle case where files are in req.files.media
          files = Array.isArray(req.files.media) ? req.files.media : [req.files.media];
        } else {
          // Handle case where files might be under different keys (like 'media[]')
          const allFiles: Express.Multer.File[] = [];
          const filesObj = req.files as { [fieldname: string]: Express.Multer.File[] | Express.Multer.File };
          Object.keys(filesObj).forEach(key => {
            if (key.includes('media') || key.includes('file')) {
              const fileOrFiles = filesObj[key];
              if (Array.isArray(fileOrFiles)) {
                allFiles.push(...fileOrFiles);
              } else {
                allFiles.push(fileOrFiles);
              }
            }
          });
          files = allFiles;
        }
      }

      // Filter out any non-file objects (in case something got through)
      files = files.filter(file => file && (file.buffer !== undefined || (file as any).path));

      let newMedia: VehicleMedia[] = [];

    //  console.log('Files received:', files.length);
      // console.log('File details:', files.map(f => ({
      //   fieldname: f.fieldname,
      //   originalname: f.originalname,
      //   mimetype: f.mimetype,
      //   size: f.size,
      //   hasBuffer: !!f.buffer,
      //   hasPath: !!(f as any).path
      // })));
    //  console.log('Existing vehicle media:', existingVehicle.media?.length || 0);

      // Handle new file uploads
      if (files && files.length > 0) {
       // console.log('Processing new files for upload...');
        // Check if Cloudinary is configured by looking for path property
        const isCloudinaryUpload = files[0] && (files[0] as any).path;
        
        if (isCloudinaryUpload) {
          // With Cloudinary storage, files are already uploaded and URLs are available
          newMedia = files.map((file: Express.Multer.File) => {
            const url = (file as any).path; // Cloudinary provides the URL in the path property
            const type = file.mimetype.startsWith("video") ? "video" : "image";
          //  console.log('New media file (Cloudinary):', { url, type, originalname: file.originalname });
            return { type, url };
          });
        } else {
          // With memory storage, upload to Cloudinary manually
          try {
            newMedia = await Promise.all(
              files.map(async (file: Express.Multer.File) => {
                try {
                  const url = await uploadFileToGCS(file);
                  const type = file.mimetype.startsWith("video") ? "video" : "image";
                 // console.log('New media file (Memory->Cloudinary):', { url, type, originalname: file.originalname });
                  return { type, url };
                } catch (uploadError) {
                  console.error('Error uploading file:', uploadError);
                  throw new Error(`Failed to upload file ${file.originalname}: ${(uploadError as Error).message}`);
                }
              })
            );
          } catch (uploadError) {
            return res.status(500).json({ 
              message: "Failed to upload new images", 
              error: (uploadError as Error).message 
            });
          }
        }
       // console.log(`Successfully processed ${newMedia.length} new media files`);
      } else {
       // console.log('No new files provided in request');
      }

      // Handle existing images - check if existingImageUrls is provided
      let retainedMedia: VehicleMedia[] = [];
      let removedMedia: VehicleMedia[] = [];

      // Only process existingImageUrls if it's explicitly provided AND is a valid array
      if (req.body.existingImageUrls !== undefined && req.body.existingImageUrls !== null) {
        // If existingImageUrls is provided, use it to determine which images to keep
        let incomingUrls: string[] = [];
        
        if (Array.isArray(req.body.existingImageUrls)) {
          incomingUrls = req.body.existingImageUrls.map((m: string | { url: string }) => 
            typeof m === 'string' ? m : m.url
          );
        } else if (typeof req.body.existingImageUrls === 'string') {
          // Handle case where it might still be a single string
          incomingUrls = [req.body.existingImageUrls];
        }
        
        retainedMedia = (existingVehicle.media || []).filter(m => incomingUrls.includes(m.url));
        removedMedia = (existingVehicle.media || []).filter(m => !incomingUrls.includes(m.url));
      } else {
        // If no existingImageUrls provided, keep all existing media
        retainedMedia = existingVehicle.media || [];
      }

      // Delete removed media files from Cloudinary
      for (const item of removedMedia) {
        try {
          await deleteFileFromGCS(item.url);
        } catch (error) {
          console.error('Error deleting file from Cloudinary:', error);
          // Continue even if deletion fails
        }
      }
 
      // Combine retained and new media
      const updatedMedia = [...retainedMedia, ...newMedia];

      // Ensure we have at least some media (either retained or new)
      if (updatedMedia.length === 0) {
        return res.status(400).json({ 
          message: "At least one image is required. Cannot remove all media without adding new ones." 
        });
      }

      // console.log('Media summary:', {
      //   retained: retainedMedia.length,
      //   new: newMedia.length,
      //   total: updatedMedia.length,
      //   removed: removedMedia.length,
      //   updatedMediaUrls: updatedMedia.map(m => m.url)
      // });

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

      // Remove existingImageUrls from update data as it's not a schema field
      delete updatedData.existingImageUrls;

     // console.log('Final update data keys:', Object.keys(updatedData));
     // console.log('Final media count in update data:', updatedData.media?.length || 0);

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
    } catch (error) {
      console.error('Error updating vehicle:', error);
      if ((error as Error).name === "ValidationError") {
        const validationError = error as { inner?: Array<{ path: string; message: string }> };
        const errors = validationError.inner?.map((e: { path: string; message: string }) => ({
          field: e.path,
          message: e.message,
        })) || [];
        return res.status(400).json({ errors });
      }
      res.status(400).json({ message: (error as Error).message });
    }
  },

  async deleteVehicale(req: VehicleRequest, res: Response) {
    try {
      const vehicale = await Car.findByIdAndDelete(req.params.id);
      if (!vehicale) return res.status(404).json({ message: "Car not found" });
      res.status(200).json({ message: "Car deleted successfully" });
    } catch {
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default vehicaleController;
