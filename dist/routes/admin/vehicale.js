import { Router } from "express";
import vehicaleController from "../../controller/vehicaleController.js";
import upload from "../../middleware/upload.js";
const vehicaleRoute = Router();
vehicaleRoute.put("/public", vehicaleController.vehicalePublicChange);
vehicaleRoute.get("/get-vehicales", vehicaleController.getVehicales);
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
}, vehicaleController.updateVehicale);
vehicaleRoute.delete("/:id", vehicaleController.deleteVehicale);
export default vehicaleRoute;
//# sourceMappingURL=vehicale.js.map