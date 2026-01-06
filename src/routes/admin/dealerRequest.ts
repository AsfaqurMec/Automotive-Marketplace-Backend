import express from "express";
import DealerRequest from "../../models/DealerRequest.js";
import Dealer from "../../models/Dealer.js";
import * as yup from "yup";
import { sendDealerAccountActivationMail } from "../../services/transport.js";

const dealerRequestRouter = express.Router();

const updateRequestSchema = yup.object({
  status: yup
    .string()
    .oneOf(["pending", "approved", "rejected"])
    .required("Status is required"),
});

// GET all dealer requests
dealerRequestRouter.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const status = req.query.status as string | undefined;
    const search = req.query.search as string | undefined;

    const filter: Record<string, unknown> = {};
    
    if (status) {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { "data.fullName": { $regex: search, $options: "i" } },
        { "data.email": { $regex: search, $options: "i" } },
        { "data.companyName": { $regex: search, $options: "i" } },
      ];
    }

    const requests = await DealerRequest.find(filter)
      .populate("dealer", "fullName email companyName status")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await DealerRequest.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: requests,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit,
      },
    });
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      message: "Server error fetching dealer requests",
      error: (error as Error).message,
    });
  }
});

// GET single dealer request by ID
dealerRequestRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const request = await DealerRequest.findById(id).populate(
      "dealer",
      "fullName email companyName status phone address"
    );

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Dealer request not found",
      });
    }

    res.status(200).json({
      success: true,
      data: request,
    });
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      message: "Server error fetching dealer request",
      error: (error as Error).message,
    });
  }
});

// PUT update dealer request status
dealerRequestRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await updateRequestSchema.validate(req.body, { abortEarly: false });

    const { status } = req.body;

    const request = await DealerRequest.findById(id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Dealer request not found",
      });
    }

    // Get dealer ID before updating
    const dealerId = request.dealer;

    // Update the request status
    request.status = status;
    request.updatedAt = new Date();
    await request.save();

    // If status is approved, update dealer status to active
    if (status === "approved") {
      const dealer = await Dealer.findById(dealerId);
      
      if (dealer) {
        dealer.status = "active";
        await dealer.save();

        // Send activation email
        try {
          await sendDealerAccountActivationMail({
            to: dealer.email,
            fullName: dealer.fullName,
            link: `${process.env.FRONTEND_URL || process.env.WEBSITE_LINK}/signin`,
            lng: "en",
            subject: "Your dealer account has been activated", // Added required subject property
          });
        } catch (emailError) {
          console.error("Failed to send activation email:", emailError);
          // Don't fail the request if email fails
        }
      }
    }

    // If status is rejected, optionally update dealer status to inactive
    if (status === "rejected") {
      const dealer = await Dealer.findById(dealerId);
      if (dealer) {
        dealer.status = "inactive";
        await dealer.save();
      }
    }

    const updatedRequest = await DealerRequest.findById(id).populate(
      "dealer",
      "fullName email companyName status"
    );

    res.status(200).json({
      success: true,
      message: `Dealer request ${status} successfully`,
      data: updatedRequest,
    });
  } catch (error: unknown) {
    if ((error as { name?: string }).name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: (error as { errors?: unknown }).errors,
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error updating dealer request",
      error: (error as Error).message,
    });
  }
});

// DELETE dealer request
dealerRequestRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRequest = await DealerRequest.findByIdAndDelete(id);

    if (!deletedRequest) {
      return res.status(404).json({
        success: false,
        message: "Dealer request not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Dealer request deleted successfully",
    });
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      message: "Server error deleting dealer request",
      error: (error as Error).message,
    });
  }
});

export default dealerRequestRouter;

