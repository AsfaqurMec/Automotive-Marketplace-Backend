// COMMENTED OUT - OLD MULTER UPLOAD CONFIGURATION
// import multer from 'multer';
// import { Request } from 'express';
// import dotenv from 'dotenv';
// dotenv.config();

// // Load env variables
// const MAX_SIZE = parseInt(process.env.MAX_FILE_SIZE_MB || '10') * 1024 * 1024;
// const allowedTypes = (process.env.ALLOWED_FILE_TYPES || 'image/jpeg,image/png,image/jpg').split(',');

// const storage = multer.memoryStorage();

// const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
//   if (!allowedTypes.includes(file.mimetype)) {
//     return cb(new Error('Invalid file type. Only JPG, JPEG and PNG are allowed.'));
//   }
//   cb(null, true);
// };

// const upload = multer({
//   storage,
//   limits: { fileSize: MAX_SIZE },
//   fileFilter,
// });

// export default upload;

// NEW CLOUDINARY UPLOAD CONFIGURATION
import multer from 'multer';
import { Request } from 'express';
import path from 'path';
import dotenv from 'dotenv';
// @ts-ignore - Cloudinary types not available
import { v2 as cloudinary } from 'cloudinary';
// @ts-ignore - multer-storage-cloudinary types not available
import { CloudinaryStorage } from 'multer-storage-cloudinary';

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Load env variables
const MAX_SIZE = parseInt(process.env.MAX_FILE_SIZE_MB || '10') * 1024 * 1024;
const allowedTypes = (process.env.ALLOWED_FILE_TYPES || 'image/jpeg,image/png,image/jpg,image/gif,image/webp,application/pdf').split(',');
const allowedExtensions = (process.env.ALLOWED_FILE_EXTENSIONS || '.jpg,.jpeg,.png,.gif,.webp,.pdf').split(',').map((ext) => ext.trim().toLowerCase());

// Check if Cloudinary is properly configured
const isCloudinaryConfigured = process.env.CLOUDINARY_CLOUD_NAME && 
                               process.env.CLOUDINARY_API_KEY && 
                               process.env.CLOUDINARY_API_SECRET;

let storage;

const resolveResourceType = (file: Express.Multer.File) => {
  const mimetype = file.mimetype;
  const extension = path.extname(file.originalname).toLowerCase();
  if (mimetype === 'application/pdf' || extension === '.pdf') {
    return { type: 'raw', format: 'pdf' };
  }
  return { type: 'image' };
};

if (isCloudinaryConfigured) {
  // Cloudinary storage configuration
  storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (_req: Request, file: Express.Multer.File) => {
      const { type, format } = resolveResourceType(file);
      const params: Record<string, unknown> = {
        folder: process.env.CLOUDINARY_FOLDER || 'nextdeal-uploads',
        resource_type: type,
        public_id: `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`,
      };

      if (type === 'raw') {
        params.format = format;
      } else {
        params.allowed_formats = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
        params.transformation = [{ width: 1000, height: 1000, crop: 'limit' }];
      }

      return params as any;
    },
  });
} else {
  // Fallback to memory storage if Cloudinary is not configured
  console.warn('Cloudinary not configured, using memory storage');
  storage = multer.memoryStorage();
}

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const mimetypeAllowed = allowedTypes.includes(file.mimetype);
  const extensionAllowed = allowedExtensions.includes(path.extname(file.originalname).toLowerCase());

  if (!mimetypeAllowed && !extensionAllowed) {
    return cb(new Error('Invalid file type. Only JPG, JPEG, PNG, GIF, WEBP, and PDF are allowed.'));
  }
  cb(null, true);
};

const upload = multer({
  storage,
  limits: { fileSize: MAX_SIZE },
  fileFilter,
});

export default upload;


