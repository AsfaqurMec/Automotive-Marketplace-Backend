import express from "express";
import Dealer from "../../models/Dealer.js";
import Customer from '../../models/Customer.js';
import Car from '../../models/Car.js';
import Lead from '../../models/Lead.js';
import CarSell from '../../models/CarSell.js';

const dealerRoute = express.Router();
dealerRoute.get("/top", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 5;
      const sortBy = req.query.sortBy === "reviews" ? "numberOfReviews" : "rating";
  
      const topDealers = await Dealer.find({ isVerified: true, isBlocked: false })
        .sort({ [sortBy]: -1 })
        .limit(limit)
        .populate({
          path: "carsPosted",
          model: "Car",
        });
  
      res.status(200).json(topDealers);
      } catch {
     
    res.status(500).json({ message: "Server error fetching top dealers" });
  }
  });

// Dashboard summary route
 
dealerRoute.get('/dashboard/summary', async (req, res) => {
  try {
    const userId = req.query.userId as string | undefined;
    
    // Determine if user is admin or dealer
    let isAdmin = false;
    let dealerFilter: Record<string, unknown> = {};
    
    if (userId) {
      // Check if user is admin or dealer
      const user = 
        (await Customer.findById(userId).populate('role')) ||
        (await Dealer.findById(userId).populate('role'));
      
      if (user && user.role) {
        const userRole = user.role as unknown as { roleId?: string };
        if (userRole.roleId === 'admin' || userRole.roleId === 'superAdmin') {
          isAdmin = true;
        } else {
          // If dealer, filter by their ID
          dealerFilter = { postedBy: userId };
        }
      }
    }
    
    // Build base filters
    const carFilter = isAdmin ? {} : dealerFilter;
    const carSellFilter = isAdmin ? {} : { sellerId: userId };
    const leadFilter = isAdmin ? {} : { assignedTo: userId };
    
    // Get basic counts
    const totalDealer = isAdmin 
      ? await Dealer.countDocuments()
      : 0; // Dealers don't see total dealer count
    const totalUser = isAdmin 
      ? await Customer.countDocuments()
      : 0; // Dealers don't see total user count
    const totalSales = await Car.countDocuments({ ...carFilter, status: 'Sold' });
    const totalPending = await Lead.countDocuments({ ...leadFilter, googleCalendarSyncStatus: 'Pending' });
    
    // Get car brand counts
    const brandAggregation = await Car.aggregate([
      { $match: carFilter },
      // Normalize brand casing to avoid duplicates (e.g., Toyota vs TOYOTA)
      { $project: { brandNorm: { $toUpper: '$brand' } } },
      { $group: { _id: '$brandNorm', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    const carBrands: Record<string, number> = {};
    brandAggregation.forEach((item) => {
      carBrands[item._id] = item.count;
    });
    
    // Get car status counts
    const statusAggregation = await Car.aggregate([
      { $match: carFilter },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    const carStatus: Record<string, number> = {
      available: 0,
      pending: 0,
      sold: 0,
      discontinued: 0
    };
    statusAggregation.forEach((item) => {
      const status = item._id || 'Available';
      if (status === 'Available') carStatus.available = item.count;
      else if (status === 'Pending') carStatus.pending = item.count;
      else if (status === 'Sold') carStatus.sold = item.count;
      else if (status === 'Discontinued') carStatus.discontinued = item.count;
    });
    
    // Get total revenue from CarSell
    const revenueAggregation = await CarSell.aggregate([
      { $match: carSellFilter },
      { $group: { _id: null, totalRevenue: { $sum: '$amount' } } }
    ]);
    const totalRevenue = revenueAggregation.length > 0 ? revenueAggregation[0].totalRevenue : 0;
    
    // Get sales detail list from CarSell
    const salesDetailRaw = await CarSell.find(carSellFilter)
      .select('amount createdAt vehicleId')
      .populate('vehicleId', 'brand')
      .lean();

    const salesDetail = salesDetailRaw.map((item) => ({
      amount: item.amount,
      date: item.createdAt,
      brand: (item.vehicleId as { brand?: string } | null)?.brand || 'Unknown'
    }));
    
    res.json({
      totalDealer,
      totalUser,
      totalSales,
      totalPending,
      carBrands,
      carStatus,
      totalRevenue,
      salesDetail
    });
  } catch (error: unknown) {
    res.status(500).json({ error: (error as Error).message });
  }
});

dealerRoute.get('/:id', async (req, res) => {
  try {
    const dealer = await Dealer.findById(req.params.id).populate('carsPosted');
  //  console.log(dealer);
    if (!dealer) return res.status(404).json({ message: 'Dealer not found' });
    res.status(200).json(dealer);
  } catch (error: unknown) {
    res.status(500).json({ message: (error as Error).message });
  }
});

export default dealerRoute
 
