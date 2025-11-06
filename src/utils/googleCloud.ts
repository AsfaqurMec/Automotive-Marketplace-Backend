// COMMENTED OUT - OLD GOOGLE CLOUD STORAGE IMPLEMENTATION
// import { Storage } from '@google-cloud/storage';
// import path from 'path';
// import fs from 'fs';
// import { fileURLToPath } from 'url';
// import { FileUpload } from '../types/common.js';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const serviceAccountPath = path.join(__dirname, "../erudite-visitor-457210-v4-4c48977aea68.json");
// const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

// const storage = new Storage({ credentials: serviceAccount });
// const bucket = storage.bucket("community_storage45");

// const uploadFileToGCS = async (file: FileUpload): Promise<string> => {
//   return new Promise((resolve, reject) => {
//     const blob = bucket.file(`${Date.now()}-${file.originalname}`);
//     const blobStream = blob.createWriteStream({
//       resumable: false,
//       metadata: {
//         contentType: file.mimetype,
//       },
//     });

//     blobStream.on('error', reject);

//     blobStream.on('finish', () => {
//       const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
//       resolve(publicUrl);
//     });

//     blobStream.end(file.buffer);
//   });
// };

// const deleteFileFromGCS = async (fileUrl: string): Promise<void> => {
//   try {
//     // Extract the file name from the URL
//     const urlParts = fileUrl.split('/');
//     const fileName = urlParts[urlParts.length - 1];
    
//     // Delete the file from the bucket
//     await bucket.file(fileName).delete();
//   } catch {
//     // Don't throw error to prevent breaking the main flow
//   }
// };

// export { deleteFileFromGCS };
// export default uploadFileToGCS;

// NEW CLOUDINARY IMPLEMENTATION
// @ts-ignore - Cloudinary types not available
import { v2 as cloudinary } from 'cloudinary';
import { FileUpload } from '../types/common.js';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload file to Cloudinary
const uploadFileToCloudinary = async (file: FileUpload): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'nextdeal-uploads',
        resource_type: 'auto',
        transformation: [
          { width: 1000, height: 1000, crop: 'limit' }
        ]
      },
      (error: any, result: any) => {
        if (error) {
          reject(error);
        } else if (result) {
          resolve(result.secure_url);
        } else {
          reject(new Error('Upload failed - no result returned'));
        }
      }
    );

    uploadStream.end(file.buffer);
  });
};

// Delete file from Cloudinary
const deleteFileFromCloudinary = async (fileUrl: string): Promise<void> => {
  try {
    // Extract public ID from Cloudinary URL
    const urlParts = fileUrl.split('/');
    const fileName = urlParts[urlParts.length - 1];
    const publicId = fileName.split('.')[0]; // Remove file extension
    
    await cloudinary.uploader.destroy(`nextdeal-uploads/${publicId}`);
  } catch (error) {
    console.error('Error deleting file from Cloudinary:', error);
    // Don't throw error to prevent breaking the main flow
  }
};

// For backward compatibility, export with the same names
export { deleteFileFromCloudinary as deleteFileFromGCS };
export default uploadFileToCloudinary;
