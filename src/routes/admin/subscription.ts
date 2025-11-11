import express from "express";
import * as yup from "yup";
import Subscription from "../../models/Subscription.js";
import Dealer from "../../models/Dealer.js";

const subscriptionRouter = express.Router();

const updateSchema = yup.object({
  planName: yup.string().oneOf(["Basic", "Standard", "Premium"]),
  price: yup.number().min(0),
  durationDays: yup.number().min(1),
  description: yup.string(),
  status: yup.string().oneOf(["active", "inactive", "deprecated"]),
  notes: yup.string(),
  features: yup.object({
    carPostLimit: yup.number().min(0),
    leadAccess: yup.boolean(),
    featuredListing: yup.boolean(),
    supportLevel: yup.string().oneOf(["Standard", "Priority", "Premium"]),
    ads: yup.object({
      canCreate: yup.boolean(),
      canDelete: yup.boolean(),
      totalCreateLimit: yup.number().min(0),
      createDurationDays: yup.number().min(0),
    }),
  }),
});

subscriptionRouter.get("/", async (req, res) => {
  try {
    const subscriptions = await Subscription.find();
   
    res.json(subscriptions);
  } catch (error: unknown) {
    res.status(500).json({ message: (error as Error).message });
  }
});

subscriptionRouter.put("/:id", async (req, res) => {


  try {
    await updateSchema.validate(req.body, { abortEarly: false });
    const updated = await Subscription.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: "Subscription not found" });
    res.json(updated);
  } catch (error: unknown) {
    if ((error as { name?: string }).name === "ValidationError") {
      return res.status(400).json({ errors: (error as { errors?: unknown }).errors });
    }
    res.status(400).json({ message: (error as Error).message });
  }
});



subscriptionRouter.post("/add-subscription", async (req, res) => {
  try {
    const { userId, subscriptionId } = req.body;
    console.log(req.body);

    if (!userId || !subscriptionId) {
      return res.status(400).json({ message: "Missing userId or subscriptionId" });
    }

    const subscription = await Subscription.findById(subscriptionId);
    if (!subscription) {
      return res.status(404).json({ message: "Subscription package not found" });
    }

    const dealer = await Dealer.findById(userId);
    if (!dealer) {
      return res.status(404).json({ message: "Dealer not found" });
    }
   

    // Set renewDate to exactly 1 month (30 days) from now
    const oneMonthLater = new Date();
    oneMonthLater.setDate(oneMonthLater.getDate() + 30);

    // Check if dealer already has a subscription
    if (dealer.subscriptionId && dealer.renewDate) {
      // ✅ Update existing subscription
      dealer.subscriptionId = subscriptionId;
      dealer.renewDate = oneMonthLater;
      await dealer.save();
      return res.status(200).json({ message: "Subscription updated", dealer });
    } else {
      // ✅ Create new subscription
      dealer.subscriptionId = subscriptionId;
      dealer.renewDate = oneMonthLater;
      await dealer.save();
      return res.status(200).json({ message: "Subscription created", dealer });
    }

  } catch (error: unknown) {
    console.log(error);
    res.status(500).json({ message: (error as Error).message });
  }
});


 export default subscriptionRouter;


