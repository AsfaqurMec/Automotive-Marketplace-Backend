import { Response } from 'express';
import { VehicleRequest, AuthenticatedVehicleRequest } from '../types/index.js';
declare const vehicaleController: {
    getVehicales(req: VehicleRequest, res: Response): Promise<void>;
    getShareVehicales(req: VehicleRequest, res: Response): Promise<void>;
    getVehicaleBySlug(req: VehicleRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    getVehicaleById(req: VehicleRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    createVehicale(req: AuthenticatedVehicleRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    vehicalePublicChange(req: AuthenticatedVehicleRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    updateVehicale(req: AuthenticatedVehicleRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    deleteVehicale(req: VehicleRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
};
export default vehicaleController;
