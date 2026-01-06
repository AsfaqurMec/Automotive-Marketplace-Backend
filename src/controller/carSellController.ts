import { Response } from 'express';
import mongoose from 'mongoose';
import CarSell from '../models/CarSell.js';
import Car from '../models/Car.js';
import Dealer from '../models/Dealer.js';
import Customer from '../models/Customer.js';
import { AuthenticatedRequest } from '../types/requests.js';

interface CarSellQueryParams {
  page?: string;
  limit?: string;
  search?: string;
}

interface CarSellRequest extends AuthenticatedRequest {
  query: CarSellQueryParams;
}

const carSellController = {
  async getSoldVehicles(req: CarSellRequest, res: Response) {
    try {
      // 1. Authorization Check
      if (!req.user || !req.user._id) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized: User not authenticated'
        });
      }

      // Fetch user from database and populate role
      const user = 
        (await Customer.findById(req.user._id).populate('role')) ||
        (await Dealer.findById(req.user._id).populate('role'));

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized: User not found'
        });
      }

      // Check if user is admin or superAdmin
      const userRole = user.role as unknown as { roleId?: string };
      if (!userRole || !userRole.roleId) {
        return res.status(403).json({
          success: false,
          message: 'Unauthorized: Admin access required'
        });
      }

      if (userRole.roleId !== 'admin' && userRole.roleId !== 'superAdmin') {
        return res.status(403).json({
          success: false,
          message: 'Unauthorized: Admin access required'
        });
      }

      // 2. Validate and parse query parameters
      const page = Math.max(1, parseInt(req.query.page || '1', 10));
      const limit = Math.min(100, Math.max(1, parseInt(req.query.limit || '10', 10)));
      const search = (req.query.search || '').trim();

      // 3. Build search query
      const searchQuery: Record<string, unknown> = {};
      if (search) {
        searchQuery.$or = [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { contact: { $regex: search, $options: 'i' } },
        ];
      }

      // 4. Calculate pagination
      const skip = (page - 1) * limit;

      // 5. Fetch data with population
      const [catSellData, total] = await Promise.all([
        CarSell.find(searchQuery)
          .populate({
            path: 'vehicleId',
            select: 'title brand model year price media',
            model: Car
          })
          .populate({
            path: 'sellerId',
            select: 'fullName email',
            model: Dealer
          })
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .lean(),
        CarSell.countDocuments(searchQuery)
      ]);

      // 6. Calculate pagination metadata
      const pages = Math.ceil(total / limit);

      // 7. Get unique dealerIDs (excluding empty strings) and fetch dealers
      const dealerIDs = [...new Set(
        catSellData
          .map(sale => sale.dealerID)
          .filter((id): id is string => typeof id === 'string' && id.trim() !== '')
      )];
      
      const dealersMap = new Map();
      if (dealerIDs.length > 0) {
        // Convert string IDs to ObjectIds for querying
        const dealerObjectIds = dealerIDs
          .filter(id => mongoose.Types.ObjectId.isValid(id))
          .map(id => new mongoose.Types.ObjectId(id));
        
        if (dealerObjectIds.length > 0) {
          const dealers = await Dealer.find({ _id: { $in: dealerObjectIds } })
            .select('fullName companyName email')
            .lean();
          dealers.forEach((dealer: { _id: unknown }) => {
            dealersMap.set(String(dealer._id), dealer);
          });
        }
      }

      // 8. Format response data
      const formattedData = catSellData.map((sale) => {
        const formatted: Record<string, unknown> = {
          _id: sale._id,
          amount: sale.amount,
          sellerId: (sale.sellerId as { _id?: unknown })?._id || sale.sellerId,
          dealerID: sale.dealerID || '',
          name: sale.name,
          email: sale.email,
          contact: sale.contact,
          createdAt: sale.createdAt,
        };

        // Add vehicle if exists
        if (sale.vehicleId && typeof sale.vehicleId === 'object' && '_id' in sale.vehicleId) {
          formatted.vehicleId = (sale.vehicleId as { _id: unknown })._id;
          formatted.vehicle = {
            _id: (sale.vehicleId as { _id: unknown })._id,
            title: (sale.vehicleId as { title?: string }).title,
            brand: (sale.vehicleId as { brand?: string }).brand,
            model: (sale.vehicleId as { model?: string }).model,
            year: (sale.vehicleId as { year?: number }).year,
            price: (sale.vehicleId as { price?: number }).price,
            media: (sale.vehicleId as { media?: unknown[] }).media || []
          };
        } else if (sale.vehicleId) {
          formatted.vehicleId = sale.vehicleId;
        }

        // Add seller if exists
        if (sale.sellerId && typeof sale.sellerId === 'object' && '_id' in sale.sellerId) {
          formatted.seller = {
            _id: (sale.sellerId as { _id: unknown })._id,
            fullName: (sale.sellerId as { fullName?: string }).fullName,
            email: (sale.sellerId as { email?: string }).email
          };
        }

        // Add dealer if dealerID exists and is not empty
        if (sale.dealerID && typeof sale.dealerID === 'string' && sale.dealerID.trim() !== '') {
          const dealer = dealersMap.get(sale.dealerID);
          if (dealer) {
            formatted.dealer = {
              _id: (dealer as { _id: unknown })._id,
              fullName: (dealer as { fullName?: string }).fullName,
              companyName: (dealer as { companyName?: string }).companyName,
              email: (dealer as { email?: string }).email
            };
          }
        }

        return formatted;
      });

      // 9. Return response
      res.status(200).json({
        success: true,
        message: 'Sold vehicles fetched successfully',
        data: {
          data: formattedData,
          pagination: {
            page,
            limit,
            pages,
            total
          }
        }
      });

    } catch (error) {
      console.error('Error fetching sold vehicles:', error);
      res.status(500).json({
        success: false,
        message: (error as Error).message || 'Internal server error'
      });
    }
  },
};

export default carSellController;
