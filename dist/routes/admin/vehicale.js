import { Router } from "express";
import vehicaleController from "../../controller/vehicaleController.js";
import upload from "../../middleware/upload.js";
const vehicaleRoute = Router();
vehicaleRoute.put("/public", vehicaleController.vehicalePublicChange);
vehicaleRoute.get("/get-vehicales", vehicaleController.getVehicales);
vehicaleRoute.get("/get-public-vehicles", vehicaleController.getPublicVehicales);
vehicaleRoute.get("/get-dealer-vehicales", vehicaleController.getShareVehicales);
vehicaleRoute.get("/:id", vehicaleController.getVehicaleById);
vehicaleRoute.get("/:slug", vehicaleController.getVehicaleBySlug);
vehicaleRoute.post("/", (req, res, next) => {
    upload.array('media')(req, res, (err) => {
        if (err) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({
                    message: `File size exceeds the limit of ${process.env.MAX_FILE_SIZE_MB} MB.`,
                });
            }
            return res.status(400).json({ message: err.message });
        }
        next();
    });
}, vehicaleController.createVehicale);
vehicaleRoute.put("/:id", (req, res, next) => {
    // Debug logging before multer
    // console.log('Route: Before multer - Content-Type:', req.headers['content-type']);
    // console.log('Route: Before multer - Body keys:', Object.keys(req.body || {}));
    // Handle both 'media' and 'media[]' field names, and allow single or multiple files
    upload.any()(req, res, (err) => {
        if (err) {
            console.error('Route: Multer error:', err);
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({
                    message: `File size exceeds the limit of ${process.env.MAX_FILE_SIZE_MB} MB.`,
                });
            }
            return res.status(400).json({ message: err.message });
        }
        // Debug logging after multer
        // console.log('Route: After multer - Files received:', req.files);
        // console.log('Route: After multer - Files type:', typeof req.files);
        // console.log('Route: After multer - Files is array:', Array.isArray(req.files));
        if (req.files && !Array.isArray(req.files)) {
            //   console.log('Route: After multer - Files object keys:', Object.keys(req.files));
        }
        // Normalize files - extract all files regardless of field name
        if (req.files) {
            if (!Array.isArray(req.files)) {
                const filesArray = [];
                const filesObj = req.files;
                Object.keys(filesObj).forEach(key => {
                    //  console.log(`Route: Processing file key: ${key}`);
                    const fileOrFiles = filesObj[key];
                    if (Array.isArray(fileOrFiles)) {
                        filesArray.push(...fileOrFiles);
                    }
                    else {
                        filesArray.push(fileOrFiles);
                    }
                });
                req.files = filesArray;
                // console.log(`Route: Normalized to array with ${filesArray.length} files`);
            }
        }
        else {
            //  console.log('Route: No files received by multer');
        }
        next();
    });
}, vehicaleController.updateVehicale);
vehicaleRoute.delete("/:id", vehicaleController.deleteVehicale);
export default vehicaleRoute;
//# sourceMappingURL=vehicale.js.map