import { Router } from 'express';
import carSellController from '../controller/carSellController.js';

const carSellRouter = Router();

// GET /api/catSell - Get all sold vehicles (Admin only)
carSellRouter.get(
  '/',
  carSellController.getSoldVehicles as (req: unknown, res: unknown) => void
);

export default carSellRouter;
