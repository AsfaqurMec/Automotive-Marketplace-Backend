import express from "express";
import Dealer from "../../models/Dealer.js";
import Customer from '../../models/Customer.js';
import Car from '../../models/Car.js';
import Lead from '../../models/Lead.js';
const dealerRoute = express.Router();
dealerRoute.get("/top", async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 5;
        const sortBy = req.query.sortBy === "reviews" ? "numberOfReviews" : "rating";
        const topDealers = await Dealer.find({ isVerified: true, isBlocked: false })
            .sort({ [sortBy]: -1 })
            .limit(limit)
            .populate({
            path: "carsPosted",
            model: "Car",
        });
        res.status(200).json(topDealers);
    }
    catch {
        res.status(500).json({ message: "Server error fetching top dealers" });
    }
});
// Dashboard summary route
dealerRoute.get('/dashboard/summary', async (req, res) => {
    try {
        const totalDealer = await Dealer.countDocuments();
        const totalUser = await Customer.countDocuments();
        const totalSales = await Car.countDocuments({ status: 'Sold' });
        const totalPending = await Lead.countDocuments({ googleCalendarSyncStatus: 'Pending' });
        res.json({
            totalDealer,
            totalUser,
            totalSales,
            totalPending
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
dealerRoute.get('/:id', async (req, res) => {
    try {
        const dealer = await Dealer.findById(req.params.id).populate('carsPosted');
        if (!dealer)
            return res.status(404).json({ message: 'Dealer not found' });
        res.status(200).json(dealer);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
export default dealerRoute;
//# sourceMappingURL=dealer.js.map