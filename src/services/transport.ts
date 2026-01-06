import nodemailer from "nodemailer";
import { config } from "dotenv";
import i18next from '../i18n.js';
import { EmailOptions } from '../types/common.js';


config();   
const WEBSITE_LINK=process.env.WEBSITE_LINK
const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
  connectionTimeout: 10000,
  greetingTimeout: 5000,
  socketTimeout: 10000,
});
const lng='eng'
const baseTemplate = (content: string): string => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Zoxxo Email</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #0049B7;
            color: black;
            text-align: center;
            padding: 20px;
        }
        .content {
            padding: 30px;
        }
        .button {
            display: inline-block;
            background-color: #ff0000;
            color: white !important;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            margin-top: 20px;
        }
        .button:hover {
            background-color: #cc0000;
        }
        .footer {
            background-color: #f8f8f8;
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="${WEBSITE_LINK}/uploads/logo.png" alt="NextDeal" style="width: 80px; height: 70px;">
            <h2 style="color:rgb(255, 255, 255)">NextDeal</h2>
        </div>
        <div class="content">
            ${content}
        </div>
     <div class="footer">
          <p>© NextDeal.io | TM and © ${new Date().getFullYear()} NextDeal Inc.</p>
          <p>
              <a href="${WEBSITE_LINK}/terms-of-service" style="color: #ff0000;">${i18next.t(
  "terms-of-service"
)}</a> |
              <a href="${WEBSITE_LINK}/privacy-policy" style="color: #ff0000;">${i18next.t(
  "privacy-policy"
)}</a>
          </p>
      </div>
    </div>
</body>
</html>

`;

export const sendHtmlMail = (options: EmailOptions): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    transport.sendMail(
      {
        from: process.env.SMTP_EMAIL,
        to: options.to,
        subject: options.subject,
        html: options.html,
      },
      (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      }
    );
  });
};



export const sendTextMail = (options: EmailOptions): Promise<unknown> =>
  transport.sendMail({
    from: process.env.SMTP_EMAIL,
    to: options.to,
    subject: options.subject,
    text: options.text,
  });

export const sendNewAccountMail = (
  options: EmailOptions
): void => {
  const content = `
    <h2>${i18next.t("welcome")}, ${options?.fullName}!</h2>
    <p>${i18next.t("welcome-and-thank-you-for-your-registration", { lng })}</p>
    <p>${i18next.t(
      "you-have-decided-for-our-free-plan-with-4-gb-of-storage-and-2-gb-transfer-size",
      { lng }
    )}</p>
    <p>${i18next.t("we-hope-to-offer-you-the-best-user-experience", { lng })}</p>
    <p>${i18next.t("we-look-forward-to-help-you-with-delivering-your-data", {
      lng,
    })}</p>
    <a href="${options?.link}" class="button">${i18next.t("login-to-your-account", {
    lng,
  })}</a>
    <p style="margin-top: 30px;">${i18next.t("goodbye-message")}</p>
  `;

  sendHtmlMail({
    ...options,
    subject: "Welcome to Zoxxo",
    html: baseTemplate(content),
  });
};


export const sendDealerAccountMail = async({ fullName, email, password, link, lng = 'en' }: EmailOptions): Promise<void> => {
  const content = `
    <h2>${i18next.t("welcome", { lng })}, ${fullName}!</h2>
    <p>${i18next.t("your-dealer-account-has-been-created", { lng })}</p>
    <p><strong>${i18next.t("email", { lng })}:</strong> ${email}</p>
    <p><strong>${i18next.t("password", { lng })}:</strong> ${password}</p>
    <p>${i18next.t("please-change-your-password-after-login", { lng })}</p>
    <a href="${link}" class="button">${i18next.t("login-to-your-account", { lng })}</a>
    <p style="margin-top: 30px;">${i18next.t("goodbye-message", { lng })}</p>
  `;

   if (email) {
     sendHtmlMail({
       to: email,
       subject: i18next.t("welcome-to-dealer-platform", { lng }),
       html: baseTemplate(content),
     });
   }
};

export const sendDealerApplicationReceivedMail = async ({
  to,
  fullName,
  subject,
}: EmailOptions): Promise<void> => {
  if (!to) {
    return;
  }

  const greetingName = fullName || 'Dealer';
  const reviewMessage = `
    <h2>Thank you, ${greetingName}!</h2>
    <p>Thank you for choosing NextDeal and submitting your dealer application.</p>
    <p>We have received your request along with the supporting documents. Our onboarding team will review everything shortly.</p>
    <p>Once the review is complete, we will reach out to you with the next steps.</p>
    <p>If you have any questions in the meantime, feel free to reply to this email.</p>
    <p>We look forward to partnering with you.</p>
  `;

  await sendHtmlMail({
    to,
    subject: subject || 'NextDeal Dealer Application Received',
    html: baseTemplate(reviewMessage),
  });
};



export const sendPublicEmail = (options: EmailOptions): Promise<unknown> =>
  sendHtmlMail({
    ...options,
    html: `
      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Zoxxo Email</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #f8f8f8;
            color: black;
            text-align: center;
            padding: 20px;
        }
        .content {
            padding: 30px;
        }
       .button {
    display: inline-block;
    background-color: #ff0000;
    color: white !important;
    text-decoration: none;
    padding: 10px 20px;
    border-radius: 5px;
    margin-top: 20px;
}
    .button:hover {
    background-color: #cc0000;
}
        .footer {
            background-color: #f8f8f8;
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #666;
        }
    </style>
</head>
<body>
  <div class="container">
  <div class="header">
    <img src="${WEBSITE_LINK}/uploads/logo.png" alt="NextDeal" style="width: 80px; height: 70px;">
    <h2>NextDeal</h2>
  </div>

  <div class="content">
    <h2>Welcome to NextDeal Car Rentals</h2>
    <p>Thank you for choosing us!</p>
    <p>Explore a wide range of vehicles at unbeatable prices. Book your car easily and hit the road today!</p>
    <a href="${options.downloadLink}" class="button">Book Now</a>
    <p style="margin-top: 30px;">Drive safe and enjoy your ride!</p>
  </div>

  <div class="footer">
    <p>© NextDeal.io | TM and © ${new Date().getFullYear()} NextDeal Inc.</p>
    <p>
      <a href="${WEBSITE_LINK}/terms-of-service" style="color: #ff0000;">Terms of Service</a> |
      <a href="${WEBSITE_LINK}/privacy-policy" style="color: #ff0000;">Privacy Policy</a>
    </p>
  </div>
</div>
</body>
</html>
  `,
  });

export const sendNewUploadMail = (options: EmailOptions): void => {
  const content = `
    <h2>${i18next.t("buena-suerte-good-luck-my-friend", { lng })}</h2>
    <p>Hello ${options.fullName},</p>
    <p>${i18next.t("you-have-uploaded-a-new-file", {
      lng,
      filename: options.fileName,
    })}</p>
    <p>${i18next.t("you-can-share-it-right-now-with-others", { lng })}</p>
    <a href="${options.downloadLink}" class="button">${i18next.t("Download", {
    lng,
  })}</a>
    <p style="margin-top: 30px;">${i18next.t("goodbye-message")}</p>
  `;

  sendHtmlMail({
    ...options,
    subject: "New file upload",
    html: baseTemplate(content),
  });
};

export const sendEmailChangeMail = (options: EmailOptions): void => {
  const content = `
    <h2>${i18next.t("no-se-preocupe-dont-worry-my-friend", { lng })}</h2>
    <p>Hello ${options.fullName},</p>
    <p>${i18next.t("you-want-to-change-your-email-address-to", {
      lng,
      to: options.to,
    })}</p>
    <p>${i18next.t("i-can-help-you-with-that", { lng })} ${i18next.t(
    "just-click-on-the-following-link-or-button-and-you-will-be-able-to-change-your-email-address",
    { lng }
  )}</p>
    <p>${i18next.t("remember-you-cant-do-this-so-often-my-friend", { lng })}</p>
    <a href="${options.link}" class="button">Change your email</a>
    <p style="margin-top: 30px;">${i18next.t("goodbye-message", { lng })}</p>
  `;

  sendHtmlMail({
    ...options,
    subject: "Change your email",
    html: baseTemplate(content),
  });
};

 

export const sendPasswordResetMail = async (options: EmailOptions): Promise<void> => {
  const content = `
    <h2>${i18next.t("dont-worry-message", { lng })}</h2>
    <p>Hello ${options.fullName},</p>
    <p>${i18next.t("you-forgot-your-password-and-want-to-recover-now", {
      lng,
    })}</p>
    <p>${i18next.t("i-can-help-you-with-that", { lng })} ${i18next.t(
    "just-click-on-the-following-link-or-button-and-you-will-be-able-to-reset-your-password-write-it-down-somewhere-so-you-dont-forget-it-my-friend",
    { lng }
  )}</p>
    <a href="${options.link}" class="button">${i18next.t("change-your-password", {
    lng,
  })}</a>
    <p style="margin-top: 30px;">${i18next.t("goodbye-message")}</p>
  `;

  await sendHtmlMail({
    ...options,
    subject: "Reset your password",
    html: baseTemplate(content),
  });
};

export const sendEmailVerifcationMail = async (options: EmailOptions): Promise<void> => {
  const content = `
    <h2>${i18next.t("your-email-needs-verification", { lng })}</h2>
    <p>Hello ${options.fullName},</p>
    <p>${i18next.t("welcome-to-nextdeal", { lng })}</p>
    <p>${i18next.t(
      "please-verify-your-email-address-by-clicking-on-the-following-button",
      { lng }
    )}</p>
    <a href="${options.link}" class="button">${i18next.t("verify", { lng })}</a>
    <p style="margin-top: 30px;">${i18next.t("goodbye-message")}</p>
  `;

  await sendHtmlMail({
    ...options,
    subject: "Verify your email",
    html: baseTemplate(content),
  });
};

export const sendPaymentMethodVerifcationMail = (options: EmailOptions): void => {
  const content = `
    <h2>${i18next.t(
      "your-card-verification-needs-some-actions-that-couldnt-be-completed",
      { lng }
    )}</h2>
    <p>Hello ${options.fullName},</p>
    <p>${i18next.t("we-have-noticed-you-tried-to-register-your-payment-method", {
      lng,
    })}</p>
    <p>${i18next.t(
      "unfortunately-we-couldnt-verify-it-due-to-some-authentication-or-banking-step",
      { lng }
    )}</p>
    <p>${i18next.t(
      "please-verify-your-payment-method-by-paying-a-test-amount-of-1-usd-after-successful-verification-it-will-be-refunded-you-can-follow-the-following-link",
      { lng }
    )}</p>
    <a href="${options.link}" class="button">${i18next.t(
    "verify-your-payment-method",
    { lng }
  )}</a>
    <p style="margin-top: 30px;">${i18next.t("goodbye-message")}</p>
  `;

  sendHtmlMail({
    ...options,
    subject: "Verify your payment method",
    html: baseTemplate(content),
  });
};

export const sendEmailToUploader = (options: EmailOptions): void => {
  sendTextMail({
    to: options.to,
    subject: "Upload Response",
    text: options.content,
  });
};

export const sendEmailNotify = async (options: EmailOptions): Promise<void> => {
  const content = `
    <h2>${i18next.t("product-tips", { lng })}</h2>
    <p>Hello ${options.fullName},</p>
    <div>${options.content}</div>
    <p style="margin-top: 30px;">${i18next.t("goodbye-message")}</p>
  `;

 await sendHtmlMail({
    ...options,
    html: baseTemplate(content),
  });
};

export const sendCompanyNewsEmail = (options: EmailOptions): void => {
  const content = `
     <p>Hello ${options.fullName},</p>
    <div>${options.content}</div>
    <p style="margin-top: 30px;">${i18next.t("goodbye-message")}</p>
  `;

  sendHtmlMail({
    ...options,
    html: baseTemplate(content),
  });
};

// Lead assignment notification to dealer
export const sendLeadAssignmentMail = async (options: {
  to: string;
  dealerName?: string;
  lead: {
    fullName?: string;
    email?: string;
    phone?: string;
    source?: string;
    interestedIn?: string;
    budget?: string;
    createdAt?: Date | string;
    _id?: unknown;
  };
  link?: string;
  lng?: string;
}): Promise<void> => {
  const lngCode = options.lng || 'en';
  const detailsRows = [
    { label: 'Lead Name', value: options.lead.fullName },
    { label: 'Email', value: options.lead.email },
    { label: 'Phone', value: options.lead.phone },
    { label: 'Interested In', value: options.lead.interestedIn },
    { label: 'Budget', value: options.lead.budget },
    { label: 'Source', value: options.lead.source },
    { label: 'Created At', value: options.lead.createdAt ? new Date(options.lead.createdAt).toLocaleString() : undefined },
  ].filter(r => r.value);

  const rowsHtml = detailsRows
    .map(r => `<tr><td style="padding:8px 12px;background:#fafafa;font-weight:600;">${r.label}</td><td style="padding:8px 12px;">${String(r.value)}</td></tr>`) 
    .join('');

  const leadLink = options.link || `${WEBSITE_LINK}/admin/leads`;

  const content = `
    <h2>New Lead Assigned</h2>
    <p>Hello ${options.dealerName || 'Dealer'},</p>
    <p>You have been assigned a new lead. Here are the details:</p>
    <table style="width:100%;border-collapse:collapse;border:1px solid #eee;">${rowsHtml}</table>
    <a href="${leadLink}" class="button">View Lead</a>
    <p style="margin-top: 30px;">${i18next.t("goodbye-message", { lng: lngCode })}</p>
  `;

  await sendHtmlMail({
    to: options.to,
    subject: 'New lead assigned to you',
    html: baseTemplate(content),
  });
};
export const sendNewCustomerMail = async({ fullName, email, password, link, lng = 'en' }: EmailOptions): Promise<void> => {
  const html = baseTemplate(`
    <h2>${i18next.t('welcome-customer', { lng })}, ${fullName}!</h2>
    <p>${i18next.t('account-created-successfully', { lng })}</p>
    <p><strong>${i18next.t('login-email', { lng })}:</strong> ${email}</p>
    <p><strong>${i18next.t('password', { lng })}:</strong> ${password}</p>
    <p>${i18next.t('you-can-now-login', { lng })}</p>
    <a href="${link}" class="button">${i18next.t("login-to-your-account", { lng })}</a>
  `);

  if (email) {
    sendHtmlMail({
      to: email,
      subject: i18next.t('welcome-subject', { lng }),
      html,
    });
  }
};

export const sendDealerAccountActivationMail = async ({
  to,
  fullName,
  link,
  lng = 'en',
}: EmailOptions): Promise<void> => {
  if (!to) {
    return;
  }

  const greetingName = fullName || 'Dealer';
  const content = `
    <h2>Congratulations, ${greetingName}!</h2>
    <p>Great news! Your dealer account has been activated.</p>
    <p>Your application has been reviewed and approved by our team. You can now log in to your account and start using all the features available to dealers.</p>
    <p>We're excited to have you as part of the NextDeal community!</p>
    <a href="${link || `${WEBSITE_LINK}/signin`}" class="button">Login to Your Account</a>
    <p style="margin-top: 30px;">If you have any questions, feel free to reach out to our support team.</p>
    <p>${i18next.t("goodbye-message", { lng })}</p>
  `;

  await sendHtmlMail({
    to,
    subject: 'Your NextDeal Dealer Account Has Been Activated',
    html: baseTemplate(content),
  });
};

export default transport;
