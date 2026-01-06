import { Router, Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';

const paymentRouter = Router();

/** ------------------ PAYMENT SUCCESS CALLBACK ------------------ **/
paymentRouter.post('/success', asyncHandler(async (req: Request, res: Response) => {
  const { tran_id, } = req.body;
  
  if (!tran_id) {
    return res.status(400).json({ success: false, message: 'Transaction ID is required' });
  }

  // TODO: Update donation status by tran_id
  // Example: await donationService.updateDonation(tran_id, { status: 'completed' });
  // Replace with your actual donation update logic
  
  // Get frontend URL from env or use default
  const frontendUrl = process.env.WEBSITE_LINK || 'http://localhost:3000';
  // Include tran_id as query parameter for frontend
  const encodedTranId = encodeURIComponent(tran_id);
  const redirectUrl = `${frontendUrl}/payment/success?tran_id=${encodedTranId}`;

  // Return HTML page that redirects to frontend (SSLCommerz sends POST, so redirect() won't work)
  return res.setHeader('Content-Type', 'text/html').send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Payment Success</title>
        <meta http-equiv="refresh" content="0;url=${redirectUrl}">
        <script>window.location.href = "${redirectUrl}";</script>
      </head>
      <body>
        <p>Payment successful! Redirecting...</p>
        <p>If you are not redirected, <a href="${redirectUrl}">click here</a>.</p>
      </body>
    </html>
  `);
}));

/** ------------------ PAYMENT FAIL CALLBACK ------------------ **/
paymentRouter.post('/fail', asyncHandler(async (req: Request, res: Response) => {
  const { tran_id } = req.body;

  // TODO: Update donation status
  // Example: await donationService.updateDonation(tran_id, { status: 'failed' });
  // Replace with your actual donation update logic

  // Get frontend URL from env or use default
  const frontendUrl = process.env.WEBSITE_LINK || 'http://localhost:3000';
  const redirectUrl = `${frontendUrl}/payment/fail`;

  // Return HTML page that redirects to frontend
  return res.setHeader('Content-Type', 'text/html').send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Payment Failed</title>
        <meta http-equiv="refresh" content="0;url=${redirectUrl}">
        <script>window.location.href = "${redirectUrl}";</script>
      </head>
      <body>
        <p>Payment failed! Redirecting...</p>
        <p>If you are not redirected, <a href="${redirectUrl}">click here</a>.</p>
      </body>
    </html>
  `);
}));

/** ------------------ PAYMENT CANCEL CALLBACK ------------------ **/
paymentRouter.post('/cancel', asyncHandler(async (req: Request, res: Response) => {
  const { tran_id } = req.body;

  // TODO: Update donation status
  // Example: await donationService.updateDonation(tran_id, { status: 'failed' });
  // Replace with your actual donation update logic

  // Get frontend URL from env or use default
  const frontendUrl = process.env.WEBSITE_LINK || 'http://localhost:3000';
  const redirectUrl = `${frontendUrl}/payment/unsuccessfull`;

  // Return HTML page that redirects to frontend
  return res.setHeader('Content-Type', 'text/html').send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Payment Cancelled</title>
        <meta http-equiv="refresh" content="0;url=${redirectUrl}">
        <script>window.location.href = "${redirectUrl}";</script>
      </head>
      <body>
        <p>Payment cancelled! Redirecting...</p>
        <p>If you are not redirected, <a href="${redirectUrl}">click here</a>.</p>
      </body>
    </html>
  `);
}));

export default paymentRouter;
