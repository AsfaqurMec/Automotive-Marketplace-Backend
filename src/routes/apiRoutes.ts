import express from 'express';
import authRouter from './auth.js';
import vehicaleRouter from './admin/vehicale.js';
import dealerRoute from './admin/dealer.js';
import leadsRoute from './admin/leads.js';
//import garageRoute from './admin/garage.js';
//import sparePartsRouter from './admin/spareparts.js';
import communityRoute from './community.js';
import usersRoute from './admin/users.js';
import chatRoute from './chat.js';
import messageRoute from './messageRoute.js';
import campaignRouter from './admin/campaign.js';
import subscriptionRouter from './admin/subscription.js';
import authenticateUser from '../middleware/authMiddleware.js';
import path from 'path';
import dealerRequestRouter from './admin/dealerRequest.js';
import paymentRouter from './payment.js';
import carSellRouter from './carSell.js';

const router = express.Router();

 const __variableOfChoice = path.resolve(); 
 const uploadsPath = path.join(__variableOfChoice, 'uploads');

router.use('/uploads', express.static(uploadsPath));
router.use('/auth', authRouter);
router.use('/vehicale', authenticateUser, vehicaleRouter);
router.use('/share', vehicaleRouter);
router.use('/dealer', dealerRoute);
router.use('/leads', leadsRoute);
//router.use('/garage', authenticateUser, garageRoute);
//router.use('/spare-parts', authenticateUser, sparePartsRouter);
router.use('/community-post', authenticateUser, communityRoute);
router.use('/users', authenticateUser, usersRoute);
router.use('/chats', chatRoute);
router.use('/messages', messageRoute);
router.use('/campaign', authenticateUser, campaignRouter);
router.use('/subscription', authenticateUser, subscriptionRouter);
router.use('/dealer-requests', authenticateUser, dealerRequestRouter);
router.use('/payment', paymentRouter);
router.use('/catSell', authenticateUser, carSellRouter);


export default router;


