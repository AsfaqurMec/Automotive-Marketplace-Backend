import { FileUpload } from '../types/common.js';
declare const uploadFileToCloudinary: (file: FileUpload) => Promise<string>;
declare const deleteFileFromCloudinary: (fileUrl: string) => Promise<void>;
export { deleteFileFromCloudinary as deleteFileFromGCS };
export default uploadFileToCloudinary;
