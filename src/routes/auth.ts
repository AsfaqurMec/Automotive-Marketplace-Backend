import Customer from '../models/Customer.js';
import HttpException, {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
  resolveStatus,
} from '../services/HttpsException.js';
import {
  sendEmailVerifcationMail,
  sendNewAccountMail,
  sendPasswordResetMail,
} from '../services/transport.js';
import * as yup from 'yup';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import express from 'express';
import PasswordResetToken from '../models/PasswordResetToken.js'
import Dealer from '../models/Dealer.js';
import { AppError, getErrorStatus, getErrorMessage } from '../types/errors.js';
const { Router, } = express;
const {  TokenExpiredError } = jwt;
const authRouter = Router();
import DealerAIChat from '../models/DealerAIChat.js';
import upload from '../middleware/upload.js';
// Updated to use Cloudinary instead of Google Cloud Storage
import uploadFileToGCS from '../utils/googleCloud.js';

const cookieVariable='nextdeal-token'
 
function getAuthCookieConfig(extra = {}) {
  const isProd = process.env.NODE_ENV === 'production';

  return {
    httpOnly: true,
    secure: isProd, // Required for HTTPS
    sameSite: isProd ? 'None' : 'Lax', // 'None' for cross-domain cookies
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    ...extra,
  };
}
//@desc Check user authentication and return user data
//@route GET /api/auth
//@access Private
authRouter.get('/', async (req, res) => {
  
  try {
    const token = req.cookies[cookieVariable] || req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw UnauthorizedException(req.t('unauthorized'));
    }

     
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as { _id: string };
 
    
    const user =
      (await Customer.findById(decodedToken._id as string).populate('role')) ||
      (await Dealer.findById(decodedToken._id as string).populate('role'));
    if (!user) {
      throw UnauthorizedException(req.t('user-not-found'));
    }
    if (user?.isBlocked) {
    return  res.status(404).json({ message: req.t("account-block-by-admin"),authenticated:false});
  
  }
    
    res.json({ ...user.toObject(), password: undefined,authenticated:true });

  } catch (error: unknown) {
    if (error instanceof TokenExpiredError) {
    await  handleTokenExpiredError(req as express.Request, res as express.Response);
    return
    } else {
      const status = getErrorStatus(error as AppError);
     return res.status(status).json({ message: getErrorMessage(error as AppError) });
    }
  }
});

 
const handleTokenExpiredError = async(req: express.Request, res: express.Response) => {
   const cookieOptions = getAuthCookieConfig({
    maxAge: 0,
    expires: new Date(0),
  });
 
  if (process.env.NODE_ENV !== 'production') {
   return (res as express.Response).clearCookie(cookieVariable, { ...cookieOptions, domain: 'localhost' } as express.CookieOptions);
  }
  (res as express.Response).clearCookie(cookieVariable, cookieOptions as express.CookieOptions);
  (res as express.Response).status(401).json({ message: (req as { t: (key: string) => string }).t('login-session-expired') });

};

 
 
authRouter.post('/login', async (req, res) => {
  const loginSchema = yup.object({
    email: yup
      .string()
      .email(req.t('invalid-email'))
      .required(req.t('email-is-required')),
    password: yup
      .string()
      .min(8, req.t('password-should-be-at-least-8-characters-long'))
      .required(req.t('password-is-required')),
  });

  try {
 
    const data = await loginSchema.validateSync(req.body, {
      abortEarly: true,
      stripUnknown: true,
    });
    const user =  (await Dealer.findOne({ email: data.email }).populate('role')) ||
      (await Customer.findOne({ email: data.email }).populate('role'));
    if (!user) {
      throw UnauthorizedException(req.t('user-not-found'));
    }
    if (user?.isBlocked) {
     return  res.status(404).json({ message: req.t("account-removed-by-admin")});
  
  }
     
    if (!bcrypt.compareSync(data.password, user.password)) {
      throw UnauthorizedException(req.t('incorrect-password'));
    }
     
    const payload = {
      email: user.email,
      _id: user._id,
      language: (user as { language?: string }).language,
      isEmailVerified: user?.isEmailVerified
     };
    const token = jwt.sign(payload, process.env.JWT_SECRET || '', {
      expiresIn: '24h',
    });

    
    
    (res as express.Response).cookie(cookieVariable, token, getAuthCookieConfig() as express.CookieOptions);

     res.json({ ...user.toObject(), token });
 
     
 
  } catch (e: unknown) {
    
    res.status(getErrorStatus(e as AppError)).json({ message: getErrorMessage(e as AppError), errorCode: e instanceof HttpException ? (e as HttpException).errorCode : undefined });
  }
});

 

authRouter.post('/register', async (req, res) => {
  const registerSchema = yup.object({
    firstName: yup
      .string()
      .min(2, req.t('first-name-too-short'))
      .required(req.t('first-name-is-required')),
    lastName: yup
      .string()
      .min(2, req.t('last-name-too-short'))
      .required(req.t('last-name-is-required')),
    fullName: yup
      .string()
      .min(1, req.t('username-too-short-enter-at-least-1-character'))
      .required(req.t('username-is-required')),
    email: yup
      .string()
      .email(req.t('enter-a-valid-email'))
      .required(req.t('email-is-required')),
    password: yup
      .string()
      .min(8, req.t('password-too-short-enter-at-least-8-characters'))
      .required(req.t('password-is-required')),
  });
  

  try {
    const type=req.body?.type  
    let user
     const data = await registerSchema.validate(
      {
        ...req.body,
        fullName: `${req.body.firstName?.trim() || ''} ${req.body.lastName?.trim() || ''}`.trim(),
      },
      {
        abortEarly: true,
        stripUnknown: true,
      }
    );
    
    if(type =='customer'){
    const hashedPassword = await bcrypt.hash(data.password, 10);
   
     user = await Customer.create({
        ...data,
        password:hashedPassword
      
      });

  
    }else if(type=='dealer'){
    const hashedPassword = await bcrypt.hash(data.password, 10);
     user = await Dealer.create({
        ...data,
        password:hashedPassword
      
      });
    const newAiChat = new DealerAIChat({
        dealer: user._id,
       });
    await newAiChat.save();
      }else{
      return res.json({message:'Type is Required'})
    }

   
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET as string);

    
    try {
      await sendEmailVerifcationMail({
        link: `${process.env.BACKEND_URL}/auth/email-verification?token=${token}`,
        to: user.email,
        fullName: user.fullName,
        lng: req.i18n.language as string,
        subject: "Verify your email",
      });
    } catch {
      
      return res.status(201).json({ 
        message: req.t('user-registered-but-failed-to-send-verification-email'),
        user: { ...user.toObject(), password: undefined } 
      });
    }

 
     res.status(201).json({ 
      message: req.t('user-registered-successfully'),
      user: { ...user.toObject(), password: undefined } 
    });

  } catch (e: unknown) { 
   if ((e as { code?: number }).code === 11000) {
      res.status(400).json({ message: req.t('username-or-email-already-exists') });
    } else {
      res.status((e as { status?: number }).status || 400).json({ message: (e as Error).message });
    }
  }
});  
 
authRouter.get('/email-verification', async (req, res) => {
  try {
 
    const token = req.query.token?.toString();
    
    if (!token) {
      throw BadRequestException(req.t('missing-verification-token'));
    }

 
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as { _id: string };
    } catch {
      throw UnauthorizedException(req.t('invalid-or-expired-token'));
    }

      const user =
        (await Customer.findByIdAndUpdate(
          decodedToken._id,
          { $set: { isEmailVerified: true } },
          { new: true }
        )) || (await Dealer.findById(decodedToken._id,
          { $set: { isEmailVerified: true } },
          { new: true }));

      if (!user) {
        throw NotFoundException(req.t('user-not-found'));
      }

 
    await sendNewAccountMail({
      link: `${process.env.FRONTEND_URL}/signin`,
      to: user.email,
      fullName: user.fullName,
      lng: req.i18n.language,
      subject: "Welcome to NextDeal",
    });

 
    res.redirect(`${process.env.FRONTEND_URL}/signin?isEmailVerified=true`);

    } catch (error: unknown) {
  
    if (error instanceof HttpException) {
      res.status(error.status).json({ message: error.message });
    } else {
      res.status(500).json({ message: req.t('internal-server-error') });
    }
  }
});


authRouter.post('/google-login', async (req, res) => {
  try {
    const authCode = req.body.token;  

    if (!authCode) {
      throw BadRequestException(req.t('invalid-auth-code-in-query'));
    }

    const client = new OAuth2Client({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      redirectUri:process.env.WEBSITE_LINK, 
    });

    const { tokens } = await client.getToken(authCode); 

    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token as string,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    let user = await Dealer.findOne({ email: payload?.email as string });

    if (!user) {
      
      user = await Dealer.create({
        email: payload?.email as string,
        fullName: payload?.name as string,
        password: payload?.email,
      });

      const newAiChat = new DealerAIChat({
        dealer: user._id,
       });
    await newAiChat.save();

      user = await Dealer.findById(user._id);
      sendNewAccountMail({
        link: `${process.env.WEBSITE_LINK}/signin`,
        to: user?.email as string,
        fullName: user?.fullName as string,
        lng: req.i18n?.language as string,
        subject: "Welcome to NextDeal",
      });
    }

    const jwtPayload = {
      email: user?.email as string,
      _id: user?._id as unknown as string,
      language: (user as { language?: string }).language as string,
      isEmailVerified: user?.isEmailVerified as boolean,
    };

    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET as string, {
      expiresIn: '24h',
    });

    const isProd = process.env.NODE_ENV === 'production';
    const cookieOptions = getAuthCookieConfig(
      isProd ? {} : { domain: 'localhost' }
    );

    (res as express.Response).cookie(cookieVariable, token, cookieOptions as express.CookieOptions);
    (res as express.Response).json({ ...user?.toObject() });

  } catch (e: unknown) {
    res.status(resolveStatus(e as HttpException)).json({
      message: req.t('error-occured-while-processing-google-login'),
      errorCode: e instanceof HttpException ? e.errorCode : undefined,
      error:e
    });
  }
});


authRouter.get('/logout', async (req, res) => {
  try {
 
    const cookieOptions = getAuthCookieConfig({
      maxAge: 0,
      expires: new Date(0),
    });

    (res as express.Response).clearCookie(cookieVariable, cookieOptions as express.CookieOptions);

   
    if (process.env.NODE_ENV !== 'production') {
      (res as express.Response).clearCookie(cookieVariable, {
        ...cookieOptions,
        domain: 'localhost',
      } as express.CookieOptions);
    }

   
    res.status(200).json({ message: req.t('logout-successful') });
  } catch {
    res.status(500).json({ message: req.t('internal-server-error') });
  }
});


 
authRouter.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

   
    yup
      .string()
      .email(req.t('invalid-email'))
      .required(req.t('email-is-required'))
      .validateSync(email);

      const user = ( await Dealer.findOne().where('email', email).lean())
     if (!user) throw NotFoundException(req.t('user-not-found'));

 
    const token = jwt.sign({ email, _id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });
      await PasswordResetToken.create({
        email,
        token,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000), 
      });

  
    try {
      await sendPasswordResetMail({
        to: email,
        fullName: user.fullName,
        link: `${process.env.WEBSITE_LINK}/password-reset?token=${token}`,
        lng: req.i18n.language as string,
        subject: "Reset your password",
      });
        } catch {
  
      return res.status(500).json({ message: req.t('email-could-not-be-sent') });
    }

    res.json({ message: req.t('reset-email-is-sent') });
  } catch (e: unknown) {
    res.status(resolveStatus(e as HttpException)).json({ message: getErrorMessage(e as AppError) });
  }
});

// password chaange section

authRouter.put('/change-password', async (req, res) => {
  try {
    const token =
      req.cookies[cookieVariable] || req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw UnauthorizedException(req.t('unauthorized'));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { _id: string };
    const userModel =
      (await Customer.findById(decoded._id)) ||
      (await Dealer.findById(decoded._id));

    if (!userModel) {
      throw UnauthorizedException(req.t('user-not-found'));
    }

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: req.t('missing-fields') });
    }

    const isMatch = await bcrypt.compare(currentPassword, userModel.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ message: req.t('invalid-current-password') });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    userModel.password = hashedPassword;
    await userModel.save();

    return res.status(200).json({ message: req.t('password-updated') });
  } catch (error: unknown) {
    if (error instanceof TokenExpiredError) {
      await handleTokenExpiredError(req as express.Request, res as express.Response);
    } else {
      const status = getErrorStatus(error as AppError);
      res.status(status).json({ message: getErrorMessage(error as AppError) });
    }
  }
});

// user name & image update


authRouter.put("/update-user",

     (req, res, next) => {
    upload.single("profileImage")(req, res, (err) => {
      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({
            message: `File size exceeds the limit of ${process.env.MAX_FILE_SIZE_MB} MB.`,
          });
        }
        return res.status(400).json({ message: err.message });
      }
      next();
    });
     },
      
  async (req, res) => {

  try {
    const token =
      req.cookies[cookieVariable] || req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw UnauthorizedException(req.t("unauthorized"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { _id: string };

    const userModel = (await Dealer.findById(decoded._id));

    if (!userModel) {
      throw UnauthorizedException(req.t("user-not-found"));
    }

    const { name } = req.body;
    // console.log(name,"name");
    // console.log(userModel,"userModel");
    if (name) userModel.fullName= name;

    if (req.file) {
      // Check if Cloudinary is configured by looking for path property
      const isCloudinaryUpload = (req.file as any).path;
      
      if (isCloudinaryUpload) {
        // With Cloudinary storage, file is already uploaded and URL is available
        const imageUrl = (req.file as any).path; // Cloudinary provides the URL in the path property
        userModel.profileImage = imageUrl;
      } else {
        // With memory storage, upload to Cloudinary manually
        const imageUrl = await uploadFileToGCS(req.file);
        userModel.profileImage = imageUrl;
      }
    }

    await userModel.save();
    // console.log(userModel,"userModel after save");
    res.status(200).json({
      message: req.t("profile-updated"),
      user: userModel,
    });
  } catch (error: unknown) {
    // console.log(error);
     
    const status = getErrorStatus(error as AppError);
    res.status(status).json({ message: getErrorMessage(error as AppError) });
  }
});


authRouter.post('/reset-password', async (req, res) => {
  
  
  try {
    const { newPassword, token } = req.body;

    if (!newPassword || newPassword.length < 8) {
      throw BadRequestException(req.t('new-password-should-be-at-least-8-characters-long'));
    }

    if (!token) {
      throw BadRequestException(req.t('invalid-request'));
    }

    let data;
    try {
      data = jwt.verify(token, process.env.JWT_SECRET as string) as { _id: string };
   
    } catch {
      return res.status(400).json({ message: req.t('token-invalid-or-used') });
    }

    const tokenEntry = await PasswordResetToken.findOne({ token });
 
    
    if (!tokenEntry || tokenEntry.used) {
      return res.status(400).json({ message: req.t('token-invalid-or-used') });
    }

    // Look up user in both collections
    const [, dealer] = await Promise.all([
      Customer.findById(data._id),
      Dealer.findById(data._id),
    ]);

  
    const userModel = dealer ? Dealer : null;

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    
    await userModel?.findByIdAndUpdate(data._id, {
      $set: { password: hashedPassword },
    });

    tokenEntry.used = true;
    await tokenEntry.save();

    res.json({ success: req.t('password-reset-successfully') });

  } catch (e: unknown) {
   
    res.status(resolveStatus(e as HttpException)).json({ message: req.t('password-reset-failed') });
  }
});


authRouter.post('/resend-email-verification-mail', async (req, res) => {
  try {
 
    const { email } = req.body;
    await yup
      .string()
      .email(req.t('invalid-email'))
      .required(req.t('email-is-required'))
      .validate(email);

 
    const user = await Customer.findOne({ email }).lean();
    if (!user) {
      throw NotFoundException(req.t('user-not-found'));
    }

   
    if (user.isEmailVerified) {
      return res.status(400).json({ message: req.t('email-already-verified') });
    }

 
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET as string, { expiresIn: '24h' });

 
    await sendEmailVerifcationMail({
      link: `${process.env.BACKEND_URL}/auth/email-verification?token=${token}`,
      to: user.email,
      fullName: user.fullName,
      lng: req.i18n.language as string,
      subject: "Verify your email",
    });
  
 
    res.json({ success: req.t('verification-email-resent') });

  } catch (error: unknown) {
    if (error instanceof yup.ValidationError) {
      res.status(400).json({ message: error.message });
    } else if (error instanceof HttpException) {
      res.status(error.status).json({ message: error.message });
    } else {
      res.status(500).json({ message: req.t('internal-server-error') });
    }
  }
  
});

export default authRouter;
