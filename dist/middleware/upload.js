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
const allowedTypes = (process.env.ALLOWED_FILE_TYPES || 'image/jpeg,image/png,image/jpg,image/gif,image/webp').split(',');
// Check if Cloudinary is properly configured
const isCloudinaryConfigured = process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET;
let storage;
if (isCloudinaryConfigured) {
    // Cloudinary storage configuration
    storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder: 'nextdeal-uploads',
            allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
            transformation: [{ width: 1000, height: 1000, crop: 'limit' }],
        },
    });
}
else {
    // Fallback to memory storage if Cloudinary is not configured
    console.warn('Cloudinary not configured, using memory storage');
    storage = multer.memoryStorage();
}
const fileFilter = (req, file, cb) => {
    if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error('Invalid file type. Only JPG, JPEG and PNG are allowed.'));
    }
    cb(null, true);
};
const upload = multer({
    storage,
    limits: { fileSize: MAX_SIZE },
    fileFilter,
});
export default upload;
//# sourceMappingURL=upload.js.map