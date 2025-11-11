import express from "express";
import Dealer from "../../models/Dealer.js";
import Customer from "../../models/Customer.js";
import * as yup from "yup";
const UsersRoute = express.Router();
import bcrypt from "bcryptjs";
import {updateDealerSchema,createDealerSchema} from '../../validations/dealerValidation.js'
import generatePassword from '../../utils/passwordGenarate.js'
import {sendDealerAccountMail,sendNewCustomerMail} from '../../services/transport.js'
const createCustomerSchema = yup.object({
  fullName: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
});
UsersRoute.get("/customers", async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const search = req.query.search || '';
    const sortBy = req.query.sortBy === "reviews" ? "numberOfReviews" : "rating";

     const searchFilter = {
       isBlocked: false,
      ...(search && {
        $or: [
          { fullName: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { phone: { $regex: search, $options: "i" } },
        ]
      })
    };

 
    const customers = await Customer.find(searchFilter)
      .sort({ [sortBy]: -1 })
      .skip(skip)
      .limit(limit)
      .populate("role");

    const total = await Customer.countDocuments(searchFilter);

    res.status(200).json({
      success: true,
      data: customers,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit
      }
    });
  } catch {
   
    res.status(500).json({ success: false, message: "Server error fetching customers" });
  }
});
UsersRoute.get("/dealers", async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const search = req.query.search || '';
    const sortBy = req.query.sortBy === "reviews" ? "numberOfReviews" : "rating";

     const searchFilter = {
       isBlocked: false,
      ...(search && {
        $or: [
          { fullName: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { phone: { $regex: search, $options: "i" } },
        ]
      })
    };

 
    const customers = (
      await Dealer.find({
        ...searchFilter,
        role: { $ne: null }
      })
        .sort({ [sortBy]: -1 })
        .skip(skip)
        .limit(limit)
        .populate("role")
    ).filter(c => c.role !== null);
    
    

    const total = await Dealer.countDocuments(searchFilter);

    res.status(200).json({
      success: true,
      data: customers,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit
      }
    });
  } catch {
    
    res.status(500).json({ success: false, message: "Server error fetching customers" });
  }
});

const editUserSchema = yup.object().shape({
  fullName: yup.string().min(2).max(100).optional(),
  email: yup.string().email("Invalid email format").optional(),
  phone: yup.string().matches(/^\+?\d{10,15}$/, "Invalid phone number").optional(),
  password: yup.string().min(6).optional(),
  role: yup.mixed().optional(),
  isVerified: yup.boolean().optional(),
  isBlocked: yup.boolean().optional()
});

UsersRoute.put("/customer/:id", async (req, res) => {
  try {
    const { id } = req.params;

  
    await editUserSchema.validate(req.body, { abortEarly: false });

    const {
      fullName,
      email,
      phone,
      password,
      role,
      isVerified,
      isBlocked
    } = req.body;

    const user = await Customer.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (email && email !== user.email) {
      const emailExists = await Customer.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ success: false, message: "Email already in use" });
      }
    }

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    user.fullName = fullName ?? user.fullName;
    user.email = email ?? user.email;
    user.phone = phone ?? user.phone;
    user.role = role ?? user.role;
    user.isEmailVerified = typeof isVerified === 'boolean' ? isVerified : user.isEmailVerified;
    user.isBlocked = typeof isBlocked === 'boolean' ? isBlocked : user.isBlocked;

    await user.save();

    res.status(200).json({ success: true, message: "User updated successfully", user });
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.errors
      });
    }

   
    res.status(500).json({ success: false, message: "Server error while updating user" });
  }
});
UsersRoute.delete('/customer/:id', async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ success: false, message: 'ID is required' });
  }

  try {
    const deletedCustomer = await Customer.findOneAndDelete({ _id: id });

    if (!deletedCustomer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    return res.status(200).json({ success: true, message: 'Customer deleted successfully' });
  } catch {
   
    return res.status(500).json({ success: false, message: 'Server error during deletion' });
  }
});

UsersRoute.put('/dealer/:id', async (req, res) => {
  try {
 
    await updateDealerSchema.validate(req.body, { abortEarly: false });

    const dealerId = req.params.id;
    const {
      companyName,
      fullName,
      contactPerson,
      email,
      phone,
      licenseExpiry,
      isVerified,
      address,
    } = req.body;

    const updatedDealer = await Dealer.findByIdAndUpdate(
      dealerId,
      {
        companyName,
        fullName,
        contactPerson,
        email,
        phone,
        licenseExpiry,
        isVerified,
        address,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!updatedDealer) {
      return res.status(404).json({ error: 'Dealer not found' });
    }

    res.status(200).json(updatedDealer);
  } catch (err: unknown) { 
    console.log(err);
    if ((err as { name?: string }).name === 'ValidationError') {
      const errors = (err as { inner?: Array<{ path: string; message: string }> }).inner?.map((e: { path: string; message: string }) => ({ path: e.path, message: e.message })) || [];
      return res.status(400).json({ validationErrors: errors });
    }

    res.status(500).json({ error: 'Server error' });
  }
});

UsersRoute.delete('/dealer/:id', async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ success: false, message: 'ID is required' });
  }

  try {
    const deletedDealer = await Dealer.findOneAndDelete({ _id: id });

    if (!deletedDealer) {
      return res.status(404).json({ success: false, message: 'Dealer not found' });
    }

    return res.status(200).json({ success: true, message: 'Dealer deleted successfully' });
  } catch {
    return res.status(500).json({ success: false, message: 'Server error during deletion' });
  }
});
UsersRoute.post('/create-dealer', async (req, res) => {
  try {
    const validatedData = await createDealerSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    
    const rawPassword = generatePassword(12);
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

 
    const dealer = new Dealer({
      ...validatedData,
      password: hashedPassword,  
    });

    await dealer.save();
 
    await sendDealerAccountMail({
      fullName: validatedData.fullName,
      email: validatedData.email,
      password: rawPassword,
      link:`${process.env.WEBSITE_LINK}/signin`,
      lng: 'en', 
      to: validatedData.email,
      subject: 'Dealer Account Created',
    });

    res.status(201).json({
      success: true,
      message: 'Dealer created and email sent successfully.',
      dealer: {
        id: dealer._id,
        fullName: dealer.fullName,
        email: dealer.email,
      },
    });
  } catch (error: unknown) {
    if ((error as { name?: string }).name === 'ValidationError') {
      return res.status(400).json({ success: false, errors: (error as { errors?: unknown }).errors });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

UsersRoute.post('/create-customer', async (req, res) => {
  try {
    const validatedData = await createCustomerSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    const existingCustomer = await Customer.findOne({ email: validatedData.email });
    if (existingCustomer) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    const password = generatePassword();
    const hashedPassword = await bcrypt.hash(password, 10);

    const newCustomer = new Customer({
      ...validatedData,
      password: hashedPassword,
    });

    await newCustomer.save();

    await sendNewCustomerMail({
      fullName: validatedData.fullName,
      email: validatedData.email,
      password,
      link:`${process.env.WEBSITE_LINK}/signin`,
      lng:'eng',
      to: validatedData.email,
      subject: 'Customer Account Created',
    });

    res.status(201).json({ success: true, message: 'Customer created successfully' });
  } catch (error: unknown) {
    if ((error as { name?: string }).name === 'ValidationError') {
      return res.status(400).json({ success: false, errors: (error as { errors?: unknown }).errors });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
});
export default UsersRoute